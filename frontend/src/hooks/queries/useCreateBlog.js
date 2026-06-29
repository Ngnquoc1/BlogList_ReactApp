import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../../api/blogs";
import { notify } from "../../lib/notify";
import handleError from "../../utils/handleError";

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.setQueryData(["blogs"], (old) =>
        old ? old.concat(newBlog) : [newBlog],
      );
      notify.success(
        `A new blog '${newBlog.title}' by ${newBlog.author} added`,
      );
    },
    onError: (err) => notify.error(handleError(err)),
  });
};
