import { useQueryClient, useMutation } from "@tanstack/react-query";
import blogService from "../../api/blogs";
import { notify } from "../../lib/notify";
import handleError from "../../utils/handleError";
import { useAuth } from "../../context/AuthContext";
export const useLikeBlog = () => {
  const qc = useQueryClient();
  const { user } = useAuth();

  const toggle = (blog) => {
    const liked = blog.likedBy?.includes(user.id);
    const likedBy = liked
      ? blog.likedBy.filter((id) => id !== user.id)
      : [...(blog.likedBy || []), user.id];
    return { ...blog, likedBy, likes: likedBy.length };
  };

  return useMutation({
    mutationFn: (blog) => blogService.like(blog.id),

    onMutate: async (blog) => {
      await qc.cancelQueries({ queryKey: ["blogs"] });
      const prevDetail = qc.getQueryData(["blogs", blog.id]);
      const prevList = qc.getQueryData(["blogs"]);
      qc.setQueryData(["blogs", blog.id], (oBlog) => oBlog && toggle(oBlog));
      qc.setQueryData(["blogs"], (oBlogs) =>
        oBlogs?.map((oBlog) => (oBlog.id === blog.id ? toggle(oBlog) : oBlog)),
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
