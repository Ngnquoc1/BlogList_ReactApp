import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../../api/blogs";
import { notify } from "../../lib/notify";
import handleError from "../../utils/handleError";

export const useDeleteComment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, commentId }) => blogService.deleteComment(id, commentId),
    onMutate: async ({ id, commentId }) => {
      await qc.cancelQueries({ queryKey: ["blogs", id] });
      const prev = qc.getQueryData(["blogs", id]);
      qc.setQueryData(["blogs", id], (o) =>
        o
          ? { ...o, comments: o.comments.filter((c) => c._id !== commentId) }
          : o,
      );
      return { prev, id };
    },
    onError: (err, _vars, ctx) => {
      if (ctx) qc.setQueryData(["blogs", ctx.id], ctx.prev);
      notify.error(handleError(err));
    },
    onSettled: (_d, _e, { id }) =>
      qc.invalidateQueries({ queryKey: ["blogs", id] }),
  });
};
