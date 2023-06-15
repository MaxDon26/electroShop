const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const ROLE = "role";
const ORDER = "order";
export function setTokens({
  refreshToken,
  accessToken,
  userId,
  role,
  expiresIn = 3600,
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(USERID_KEY, userId);
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
  localStorage.setItem(ROLE, role);
}
export function addOrder(order) {
  localStorage.setItem(ORDER, JSON.stringify(order));
}
export function getOrder() {
  return JSON.parse(localStorage.getItem(ORDER));
}
export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}
export function removeAuthData() {
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
  localStorage.removeItem(ROLE);
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}
export function getUserRole() {
  return localStorage.getItem(ROLE);
}
export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}
const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
  getUserRole,
  addOrder,
  getOrder,
};
export default localStorageService;
