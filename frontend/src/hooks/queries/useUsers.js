import { useQuery } from "@tanstack/react-query";
import userService from "../../api/users";
export const useUsers = () => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });
  return {
    users: result.data,
    isPending: result.isPending,
    isError: result.isError,
  };
};
