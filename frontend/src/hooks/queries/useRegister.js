import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "../../api/users";
import { notify } from "../../lib/notify";
import handleError from "../../utils/handleError";

export const useRegister = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: userService.register,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] }); // trang Users hiện user mới
      notify.success("Account created");
    },
    onError: (err) => notify.error(handleError(err)),
  });
};
