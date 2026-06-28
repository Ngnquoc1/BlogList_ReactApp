import { useQuery } from "@tanstack/react-query";
import userService from "../../api/users";
export const useUsers = (id) => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      const users = userService.getAll();
      return users.find((u) => u.id === id);
    },
  });
  return {
    users: result.data,
    isPending: result.isPending,
    isError: result.isError,
  };
};
