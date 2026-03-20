import { useQuery } from "@tanstack/react-query";
import { getMoviesByFilter, type MovieListFilter } from "../api/movies.api";

type UseMovieListProps = {
  filter?: MovieListFilter;
  page?: number;
};

export const useMovieList = ({
  filter = "popular",
  page = 1,
}: UseMovieListProps = {}) => {
  return useQuery({
    queryKey: ["movies", filter, page],
    queryFn: async () => {
      return getMoviesByFilter(filter, page);
    },
  });
};
