import { useQueryClient, useMutation } from "@tanstack/react-query";
import blogService from "../../api/blogs";
import { notify } from "../../lib/notify";
import handleError from "../../utils/handleError";

export const useLikeBlog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (blog) =>
      blogService.update(blog.id, { ...blog, likes: blog.likes + 1 }),

    onMutate: async (blog) => {
      await qc.cancelQueries({ queryKey: ["blogs"] });
      const prevDetail = qc.getQueryData(["blogs", blog.id]);
      const prevList = qc.getQueryData(["blogs"]);
      qc.setQueryData(
        ["blogs", blog.id],
        (o) => o && { ...o, likes: o.likes + 1 },
      );
      qc.setQueryData(["blogs"], (o) =>
        o?.map((b) => (b.id === blog.id ? { ...b, likes: b.likes + 1 } : b)),
      );
      return { prevDetail, prevList };
    },

    onError: (err, blog, ctx) => {
      qc.setQueryData(["blogs", blog.id], ctx?.prevDetail);
      qc.setQueryData(["blogs"], ctx?.prevList);
      notify.error(handleError(err));
    },

    onSettled: () => qc.invalidateQueries({ queryKey: ["blogs"] }),
  });
};
