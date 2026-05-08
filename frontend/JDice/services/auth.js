const AUTH_TOKEN_KEY = "jdice.auth.token";
const AUTH_LOGIN_KEY = "jdice.auth.login";

const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
};

const decodeBase64Url = (value) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");

  return atob(padded);
};

const toTitleCase = (value) =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1).toLowerCase())
    .join(" ");

export const getAuthToken = () => getStorage()?.getItem(AUTH_TOKEN_KEY) ?? "";

export const parseAuthToken = (token = getAuthToken()) => {
  if (!token) {
    return null;
  }

  try {
    const parts = token.split(".");

    if (parts.length < 2) {
      return null;
    }

    return JSON.parse(decodeBase64Url(parts[1]));
  } catch {
    return null;
  }
};

export const getAuthLogin = () => {
  const storage = getStorage();
  const storedLogin = storage?.getItem(AUTH_LOGIN_KEY);

  if (storedLogin) {
    return storedLogin;
  }

  const tokenPayload = parseAuthToken();
  const tokenLogin = tokenPayload?.sub;

  if (tokenLogin && storage) {
    storage.setItem(AUTH_LOGIN_KEY, tokenLogin);
  }

  return tokenLogin ?? "";
};

export const saveAuthSession = (token, login) => {
  const storage = getStorage();

  if (!storage || !token) {
    return;
  }

  storage.setItem(AUTH_TOKEN_KEY, token);

  const tokenPayload = parseAuthToken(token);
  const normalizedLogin = login?.trim() || tokenPayload?.sub || "";

  if (normalizedLogin) {
    storage.setItem(AUTH_LOGIN_KEY, normalizedLogin);
  }
};

export const clearAuthSession = () => {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  storage.removeItem(AUTH_TOKEN_KEY);
  storage.removeItem(AUTH_LOGIN_KEY);
};

export const isTokenExpired = (token = getAuthToken()) => {
  const payload = parseAuthToken(token);
  const expiration = payload?.exp;

  if (!expiration) {
    return true;
  }

  return expiration * 1000 <= Date.now();
};

export const hasActiveSession = () => {
  const token = getAuthToken();

  if (!token) {
    return false;
  }

  if (isTokenExpired(token)) {
    clearAuthSession();
    return false;
  }

  return true;
};

export const getAuthUserProfile = () => {
  const login = getAuthLogin();

  if (!login) {
    return null;
  }

  const baseName = login.split("@")[0] ?? login;
  const readableName = toTitleCase(baseName.replace(/[._-]+/g, " "));
  const initials = readableName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return {
    login,
    displayName: readableName || login,
    subtitle: login,
    initials: initials || "JD",
  };
};
