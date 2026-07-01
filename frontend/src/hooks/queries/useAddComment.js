import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../../api/blogs";
import { notify } from "../../lib/notify";
import handleError from "../../utils/handleError";
import { useAuth } from "../../context/AuthContext";

export const useAddComment = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ id, comment }) => blogService.comment(id, comment),

    onMutate: async ({ id, comment }) => {
      const optimistic = {
        _id: `temp-${Date.now()}`,
        text: comment,
        user: { id: user.id, name: user.name },
        createdAt: new Date().toISOString(),
      };

      await queryClient.cancelQueries({ queryKey: ["blogs", id] });
      const prevDetail = queryClient.getQueryData(["blogs", id]);
      queryClient.setQueryData(["blogs", id], (o) =>
        o ? { ...o, comments: [...(o.comments || []), optimistic] } : o,
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
