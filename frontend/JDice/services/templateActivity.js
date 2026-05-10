import { getAuthLogin } from "./auth";

const TEMPLATE_ACTIVITY_KEY = "jdice.template.activity";
const MAX_SEND_HISTORY_ITEMS = 200;

const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
};

const normalizeKey = (value = "") => String(value).trim().toLowerCase();

const toTimestamp = (value) => {
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const toRecipientCount = (value) => {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : 0;
};

const safeReadActivity = () => {
  const storage = getStorage();

  if (!storage) {
    return {};
  }

  try {
    const rawValue = storage.getItem(TEMPLATE_ACTIVITY_KEY);
    return rawValue ? JSON.parse(rawValue) : {};
  } catch {
    return {};
  }
};

const safeWriteActivity = (value) => {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  storage.setItem(TEMPLATE_ACTIVITY_KEY, JSON.stringify(value));
};

const getActivityLogin = (login = getAuthLogin()) => normalizeKey(login);

export const isSameMonth = (value, referenceDate = new Date()) => {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return false;
  }

  return (
    parsedDate.getFullYear() === referenceDate.getFullYear() &&
    parsedDate.getMonth() === referenceDate.getMonth()
  );
};

export const getUserTemplateActivity = (login = getAuthLogin()) => {
  const normalizedLogin = getActivityLogin(login);

  if (!normalizedLogin) {
    return {
      sends: [],
      scheduled: [],
    };
  }

  const templateActivity = safeReadActivity();
  const userActivity = templateActivity[normalizedLogin] ?? {};

  return {
    sends: Array.isArray(userActivity.sends) ? userActivity.sends : [],
    scheduled: Array.isArray(userActivity.scheduled) ? userActivity.scheduled : [],
  };
};

export const recordTemplateSend = ({
  login = getAuthLogin(),
  name,
  version,
  category,
  recipientCount = 0,
  subject = "",
}) => {
  const normalizedLogin = getActivityLogin(login);
  const templateName = String(name ?? "").trim();

  if (!normalizedLogin || !templateName) {
    return null;
  }

  const templateActivity = safeReadActivity();
  const userActivity = templateActivity[normalizedLogin] ?? {
    sends: [],
    scheduled: [],
  };
  const nextEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: templateName,
    version: String(version ?? "").trim(),
    category: String(category ?? "").trim() || "Sem categoria",
    recipientCount: toRecipientCount(recipientCount),
    subject: String(subject ?? "").trim(),
    sentAt: new Date().toISOString(),
  };

  userActivity.sends = [nextEntry, ...userActivity.sends].slice(
    0,
    MAX_SEND_HISTORY_ITEMS,
  );

  templateActivity[normalizedLogin] = {
    ...userActivity,
    scheduled: Array.isArray(userActivity.scheduled)
      ? userActivity.scheduled
      : [],
  };

  safeWriteActivity(templateActivity);
  return nextEntry;
};

export const buildSendStatsByTemplate = (sendEntries = []) =>
  (Array.isArray(sendEntries) ? sendEntries : []).reduce((acc, entry) => {
    const templateKey = normalizeKey(entry?.name ?? "");

    if (!templateKey) {
      return acc;
    }

    const currentStats = acc[templateKey] ?? {
      sendCount: 0,
      recipientCount: 0,
      lastUsedAt: "",
      lastUsedVersion: "",
    };
    const entrySentAt = String(entry?.sentAt ?? "");
    const currentTimestamp = toTimestamp(currentStats.lastUsedAt);
    const nextTimestamp = toTimestamp(entrySentAt);

    acc[templateKey] = {
      sendCount: currentStats.sendCount + 1,
      recipientCount:
        currentStats.recipientCount + toRecipientCount(entry?.recipientCount),
      lastUsedAt:
        nextTimestamp >= currentTimestamp ? entrySentAt : currentStats.lastUsedAt,
      lastUsedVersion:
        nextTimestamp >= currentTimestamp
          ? String(entry?.version ?? "").trim()
          : currentStats.lastUsedVersion,
    };

    return acc;
  }, {});
