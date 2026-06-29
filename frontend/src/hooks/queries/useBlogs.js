import { useQuery } from "@tanstack/react-query";
import blogService from "../../api/blogs";

export const useBlogs = () =>
  useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });
