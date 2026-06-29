import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import loginService from "../../api/login";
import { notify } from "../../lib/notify";
import handleError from "../../utils/handleError";

export const useLogin = () => {
  const { login } = useAuth();
  return useMutation({
    mutationFn: loginService.login,
    onSuccess: (user) => {
      login(user);
      notify.success("Logged in");
    },
    onError: (err) => notify.error(`Login failed: ${handleError(err)}`),
  });
};
