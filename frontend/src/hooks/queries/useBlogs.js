import { useQuery } from "@tanstack/react-query";
import blogService from "../../api/blogs";
export const useBlogs = () => {
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  return {
    blogs: result.data,
    isPending: result.isPending,
    isError: result.isError,
  };
};
