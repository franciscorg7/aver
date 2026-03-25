import { useQuery } from '@tanstack/react-query'
import {
  getMoviesByFilter,
  searchMovies,
  type MovieListFilter,
} from '../api/movie-lists.api'

type UseMovieListProps = {
  query?: string
  filter?: MovieListFilter
  page?: number
}

export const useMovieList = ({
  query = '',
  filter = 'POPULAR',
  page = 1,
}: UseMovieListProps) => {
  const normalizedQuery = query.trim()

  return useQuery({
    queryKey: ['movies', filter, page, normalizedQuery],
    queryFn: async () => {
      return normalizedQuery
        ? searchMovies({ page, query: normalizedQuery })
        : getMoviesByFilter(filter, page)
    },
  })
}
