import apiClient from "./apiClient";
const login = async (credentials) => {
  const { data } = await apiClient.post("/login", credentials);
  return data;
};
const logout = async () => {
  await apiClient.post("/auth/logout");
};
export default { login, logout };
