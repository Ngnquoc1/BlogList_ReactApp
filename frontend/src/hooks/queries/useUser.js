import { useQuery } from "@tanstack/react-query";
import userService from "../../api/users";

export const useUser = (id) =>
  useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    select: (users) => users.find((u) => u.id === id),
    enabled: !!id,
  });
