import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../../api/blogs";
import { notify } from "../../lib/notify";
import handleError from "../../utils/handleError";

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blog) => blogService.remove(blog.id),
    onSuccess: (_data, blog) => {
      queryClient.setQueryData(["blogs"], (old) =>
        old?.filter((b) => b.id !== blog.id),
      );
      queryClient.removeQueries({ queryKey: ["blogs", blog.id] });
      notify.success(`${blog.title} removed`);
    },
    onError: (err) => notify.error(handleError(err)),
  });
};
