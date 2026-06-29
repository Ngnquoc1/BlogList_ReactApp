import { useQuery } from "@tanstack/react-query";
import blogService from "../../api/blogs";

export const useBlog = (id) =>
  useQuery({
    queryKey: ["blogs", id],
    queryFn: () => blogService.getById(id),
    enabled: !!id,
  });
