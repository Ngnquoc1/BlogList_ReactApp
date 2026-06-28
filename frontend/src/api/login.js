import apiClient from "./apiClient";
const login = async (credentials) => {
  const { data } = await apiClient.post("/login", credentials);
  return data;
};

export default { login };
