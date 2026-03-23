import { useQuery } from '@tanstack/react-query'
import { getMoviesByFilter, type MovieListFilter } from '../api/movie-lists.api'

type UseMovieListProps = {
  filter?: MovieListFilter
  page?: number
}

export const useMovieList = ({
  filter = 'POPULAR',
  page = 1,
}: UseMovieListProps) => {
  return useQuery({
    queryKey: ['movies', filter, page],
    queryFn: async () => {
      return getMoviesByFilter(filter, page)
    },
  })
}
