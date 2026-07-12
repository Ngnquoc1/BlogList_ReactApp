import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import loginService from "../../api/login";
import { notify } from "../../lib/notify";

export const useLogout = () => {
  const { logout } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: loginService.logout, // POST /api/auth/logout — revoke refresh token
    onSettled: () => {
      logout(); // remove profile + localStorage in client
      qc.clear(); // remove cache React Query
      notify.success("Logged out");
    },
  });
};
