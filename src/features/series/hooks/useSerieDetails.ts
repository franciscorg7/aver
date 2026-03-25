import { useQuery } from '@tanstack/react-query'
import { getSerieDetails } from '../api/series.api'

export const useSeriesDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ['series', 'details', id],
    queryFn: async () => {
      return getSerieDetails(id)
    },
  })
}
