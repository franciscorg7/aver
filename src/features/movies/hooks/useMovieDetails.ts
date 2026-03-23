import { useQuery } from '@tanstack/react-query'
import { getMovieDetails } from '../api/movies.api'

export const useMovieDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ['movie', 'details', id],
    queryFn: async () => {
      return getMovieDetails(id)
    },
  })
}
