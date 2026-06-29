import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
});

apiClient.interceptors.request.use((config) => {
  const stored = window.localStorage.getItem("loggedBlogAppUser");
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.localStorage.removeItem("loggedBlogAppUser");
      if (window.location.pathname !== "/login") {
        window.location.assign("/login"); // token hết hạn → đăng xuất
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
