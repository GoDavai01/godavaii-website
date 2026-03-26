// Chat auth + rate limiting helpers (localStorage-based)

const JWT_KEY = "godavaii_jwt";
const REFRESH_KEY = "godavaii_refresh_token";
const QUERY_KEY = "godavaii_query_count";

export const ANON_LIMIT = 2;
export const AUTH_LIMIT = 5;

function isBrowser() {
  return typeof window !== "undefined";
}

export function getJWT() {
  if (!isBrowser()) return null;
  return localStorage.getItem(JWT_KEY) || null;
}

export function setJWT(token, refreshToken) {
  if (!isBrowser()) return;
  if (token) localStorage.setItem(JWT_KEY, token);
  if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
}

export function clearJWT() {
  if (!isBrowser()) return;
  localStorage.removeItem(JWT_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

export function checkLoggedIn() {
  const jwt = getJWT();
  if (!jwt) return false;
  try {
    const payload = JSON.parse(atob(jwt.split(".")[1]));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      clearJWT(); // expired
      return false;
    }
    return true;
  } catch {
    return !!jwt; // if can't decode, assume valid
  }
}

export function getQueryCount() {
  if (!isBrowser()) return 0;
  try {
    const stored = JSON.parse(localStorage.getItem(QUERY_KEY) || "{}");
    const today = new Date().toISOString().split("T")[0];
    if (stored.date !== today) return 0;
    return stored.count || 0;
  } catch {
    return 0;
  }
}

export function incrementQueryCount() {
  if (!isBrowser()) return 0;
  const today = new Date().toISOString().split("T")[0];
  const current = getQueryCount();
  const newCount = current + 1;
  localStorage.setItem(QUERY_KEY, JSON.stringify({ count: newCount, date: today }));
  return newCount;
}

export function canQuery(loggedIn) {
  const count = getQueryCount();
  const limit = loggedIn ? AUTH_LIMIT : ANON_LIMIT;
  return count < limit;
}

export function getRemainingQueries(loggedIn) {
  const count = getQueryCount();
  const limit = loggedIn ? AUTH_LIMIT : ANON_LIMIT;
  return Math.max(0, limit - count);
}
