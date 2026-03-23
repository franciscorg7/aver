import { useQuery } from '@tanstack/react-query'
import { getSeriesByFilter, type SeriesListFilter } from '../api/series.api'

type UseSerieListProps = {
  filter?: SeriesListFilter
  page?: number
}

export const useSerieList = ({
  filter = 'popular',
  page = 1,
}: UseSerieListProps = {}) => {
  return useQuery({
    queryKey: ['series', filter, page],
    queryFn: async () => {
      return getSeriesByFilter(filter, page)
    },
  })
}
