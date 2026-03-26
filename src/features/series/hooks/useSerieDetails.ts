import { useQuery } from '@tanstack/react-query'
import { getSeriesDetails } from '../api/series.api'

export const useSeriesDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ['series', 'details', id],
    queryFn: async () => {
      return getSeriesDetails(id)
    },
  })
}
