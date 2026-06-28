import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../../api/blogs";
import { notify } from "../../lib/notify";
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.create,

    onSuccess: (newBlog) => {
      queryClient.setQueryData(["blogs"], (oldBlogs) => {
        return oldBlogs ? oldBlogs.concat(newBlog) : [newBlog];
      });

      notify.success(
        `A new blog '${newBlog.title}' by ${newBlog.author} added`,
      );
    },
  });
};
