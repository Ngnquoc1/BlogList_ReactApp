import { create } from "zustand";

export const useUiStore = create((set) => ({
  // search dùng chung cho danh sách blog, giữ khi điều hướng (reset khi reload)
  blogSearch: "",
  setBlogSearch: (blogSearch) => set({ blogSearch }),
  clearBlogSearch: () => set({ blogSearch: "" }),
}));
