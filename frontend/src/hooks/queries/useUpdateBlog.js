import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../../api/blogs";
import { notify } from "../../lib/notify";
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.update,

    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blogs"], (oldBlogs) => {
        return oldBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b));
      });

      notify.success(`${updatedBlog.title} updated successfully`);
    },
  });
};
