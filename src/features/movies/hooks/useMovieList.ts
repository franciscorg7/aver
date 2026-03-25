import { useQuery } from '@tanstack/react-query'
import {
  getMoviesByFilter,
  searchMovies,
  type MovieListFilter,
} from '../api/movie-lists.api'

type UseMovieListProps = {
  filter?: MovieListFilter
  page?: number
  query?: string
}

export const useMovieList = ({
  filter = 'POPULAR',
  page = 1,
  query = '',
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
