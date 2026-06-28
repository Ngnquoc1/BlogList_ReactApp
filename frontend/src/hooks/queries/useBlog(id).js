import { useQuery } from "@tanstack/react-query";
import blogService from "../../api/blogs";

export const useBlog = (id) => {
  const result = useQuery({
    queryKey: ["blogs", id],
    queryFn: () => blogService.getById(id),
  });
  return {
    blog: result.data,
    isPending: result.isPending,
    isError: result.isError,
  };
};
