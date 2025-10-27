export const storeAccessToken = (token) => {
  sessionStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};

export const deleteAccessToken = () => {
  sessionStorage.removeItem("accessToken");
};

export const storeRefreshToken = (token) => {
  localStorage.setItem("refreshToken", token);
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const deleteRefreshToken = () => {
  localStorage.removeItem("refreshToken");
};

export const storeToken = (token, type) => {
  if (type == "access") storeAccessToken(token);
  if (type == "refresh") storeRefreshToken(token);
};

export const getChatMessage = () => {
  return sessionStorage.getItem("electra_chat");
};

export const storeChatMessage = (messages) => {
  sessionStorage.setItem("electra_chat", JSON.stringify(messages));
};

export const removeChatMessage = () => {
  sessionStorage.removeItem("electra_chat");
};
