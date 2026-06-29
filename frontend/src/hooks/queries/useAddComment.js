import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../../api/blogs";
import { notify } from "../../lib/notify";
import handleError from "../../utils/handleError";

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, comment }) => blogService.comment(id, comment),
    onMutate: async ({ id, comment }) => {
      await queryClient.cancelQueries({ queryKey: ["blogs", id] });
      const prevDetail = queryClient.getQueryData(["blogs", id]);
      queryClient.setQueryData(["blogs", id], (o) =>
        o ? { ...o, comments: [...(o.comments || []), comment] } : o,
      );
      return { prevDetail, id };
    },
    onError: (err, _vars, ctx) => {
      if (ctx) queryClient.setQueryData(["blogs", ctx.id], ctx.prevDetail);
      notify.error(handleError(err));
    },
    onSettled: (_data, _err, { id }) =>
      queryClient.invalidateQueries({ queryKey: ["blogs", id] }),
  });
};
