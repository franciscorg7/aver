import { useQuery } from '@tanstack/react-query'
import { getMovieDetails } from '../api/movies.api'
import type { MovieDetailsWithExtras } from '../types/movie-details'

export const useMovieDetails = (id: string | undefined) => {
  return useQuery<MovieDetailsWithExtras>({
    queryKey: ['movie', 'details', id],
    queryFn: async () => {
      return getMovieDetails(id)
    },
  })
}
