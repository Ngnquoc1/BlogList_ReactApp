import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

let refreshing = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const noRetry =
      original?.url?.includes("/auth/") || original?.url?.includes("/login");

    if (error.response?.status === 401 && !original?._retry && !noRetry) {
      original._retry = true;
      try {
        refreshing = refreshing || apiClient.post("/auth/refresh");
        await refreshing;
        refreshing = null;
        return apiClient(original); // thử lại request cũ với access token mới
      } catch (e) {
        refreshing = null;
        window.localStorage.removeItem("loggedBlogAppUser");
        if (window.location.pathname !== "/login")
          window.location.assign("/login");
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
