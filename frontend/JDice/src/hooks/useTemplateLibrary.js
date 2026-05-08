import { useCallback, useEffect, useState } from "react";
import { api } from "../../services/api";
import { getAuthLogin } from "../../services/auth";

const TEMPLATE_LIBRARY_KEY = "jdice.template.library";

const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
};

const normalizeKey = (value = "") => value.trim().toLowerCase();

const compareLabels = (left, right, descending = false) => {
  const normalizedLeft = String(left ?? "");
  const normalizedRight = String(right ?? "");
  const result = normalizedLeft.localeCompare(normalizedRight, "pt-BR", {
    numeric: true,
    sensitivity: "base",
  });

  return descending ? result * -1 : result;
};

const safeReadLibrary = () => {
  const storage = getStorage();

  if (!storage) {
    return {};
  }

  try {
    const rawValue = storage.getItem(TEMPLATE_LIBRARY_KEY);
    return rawValue ? JSON.parse(rawValue) : {};
  } catch {
    return {};
  }
};

const safeWriteLibrary = (value) => {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  storage.setItem(TEMPLATE_LIBRARY_KEY, JSON.stringify(value));
};

const sanitizeTags = (tags = []) =>
  Array.isArray(tags)
    ? tags.map((tag) => String(tag).trim()).filter(Boolean)
    : [];

const getNodeChildren = (node) =>
  Array.isArray(node?.children) ? node.children : [];

const isDirectoryNode = (node) => Boolean(node?.directory ?? node?.isDirectory);

const formatDateTime = (value) => {
  if (!value) {
    return "";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

const getTemplateLogin = (login = getAuthLogin()) => normalizeKey(login);

export const getUserTemplateMetadata = (login = getAuthLogin()) => {
  const normalizedLogin = getTemplateLogin(login);

  if (!normalizedLogin) {
    return {};
  }

  const templateLibrary = safeReadLibrary();
  return templateLibrary[normalizedLogin]?.templates ?? {};
};

export const saveUserTemplateMetadata = ({
  login = getAuthLogin(),
  name,
  version,
  category,
  tags = [],
}) => {
  const normalizedLogin = getTemplateLogin(login);
  const normalizedName = String(name ?? "").trim();

  if (!normalizedLogin || !normalizedName) {
    return;
  }

  const templateLibrary = safeReadLibrary();
  const userLibrary = templateLibrary[normalizedLogin] ?? { templates: {} };
  const templateKey = normalizeKey(normalizedName);
  const currentTemplate = userLibrary.templates?.[templateKey] ?? {};
  const currentVersions = currentTemplate.versions ?? {};
  const sanitizedTags = sanitizeTags(tags);
  const savedAt = new Date().toISOString();

  userLibrary.templates = {
    ...userLibrary.templates,
    [templateKey]: {
      name: normalizedName,
      category:
        String(category ?? "").trim() ||
        currentTemplate.category ||
        "Sem categoria",
      tags: sanitizedTags.length > 0 ? sanitizedTags : currentTemplate.tags ?? [],
      updatedAt: savedAt,
      versions: {
        ...currentVersions,
        ...(version
          ? {
              [String(version).trim()]: {
                savedAt,
              },
            }
          : {}),
      },
    },
  };

  templateLibrary[normalizedLogin] = userLibrary;
  safeWriteLibrary(templateLibrary);
};

export const normalizeTemplateTree = (
  root,
  templateMetadata = getUserTemplateMetadata(),
) => {
  const templates = getNodeChildren(root)
    .filter(isDirectoryNode)
    .map((templateNode) => {
      const metadata =
        templateMetadata[normalizeKey(templateNode?.name ?? "")] ?? {};
      const metadataVersions = metadata.versions ?? {};
      const versions = getNodeChildren(templateNode)
        .filter(isDirectoryNode)
        .sort((left, right) => compareLabels(left?.name, right?.name, true))
        .map((versionNode) => {
          const versionChildren = getNodeChildren(versionNode);
          const hasTemplateFile = versionChildren.some(
            (child) =>
              !isDirectoryNode(child) &&
              String(child?.name ?? "").toLowerCase() === "template.html",
          );
          const savedAt = metadataVersions[versionNode?.name]?.savedAt ?? "";

          return {
            id: versionNode?.path ?? versionNode?.name,
            ver: versionNode?.name ?? "",
            name: versionNode?.name ?? "",
            path: versionNode?.path ?? "",
            desc: `Arquivos: ${versionChildren.length}`,
            date: formatDateTime(savedAt),
            status: hasTemplateFile ? "Ativa" : "Inativa",
            icon: "📄",
            fileCount: versionChildren.length,
            savedAt,
          };
        });

      const currentVersion = versions[0]?.name ?? "";
      const lastEdited = versions.find((version) => version.date)?.date;

      return {
        id: templateNode?.path ?? templateNode?.name,
        path: templateNode?.path ?? "",
        name: templateNode?.name ?? "",
        icon: "📄",
        file: versions.map((version) => version.name).join(", "),
        category: metadata.category || "Sem categoria",
        tags: sanitizeTags(metadata.tags),
        versions: versions.map((version) => version.name),
        tagStyle: versions.map(() => "grey"),
        current: currentVersion,
        lastEdit: lastEdited || formatDateTime(metadata.updatedAt),
        sends: "",
        subVersions: versions,
      };
    })
    .sort((left, right) => compareLabels(left.name, right.name));

  return templates;
};

export const useTemplateLibrary = ({ onError } = {}) => {
  const [templates, setTemplates] = useState([]);
  const [rawTree, setRawTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTemplates = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/api/templates/list");
      const templateMetadata = getUserTemplateMetadata();

      setRawTree(response.data);
      setTemplates(normalizeTemplateTree(response.data, templateMetadata));
    } catch (err) {
      const nextError =
        err.response?.data?.message ||
        err.message ||
        "Nao foi possivel carregar os modelos.";

      setError(nextError);
      setRawTree(null);
      setTemplates([]);

      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  return {
    templates,
    rawTree,
    loading,
    error,
    reloadTemplates: loadTemplates,
  };
};
