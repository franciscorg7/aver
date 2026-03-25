import { useQuery } from '@tanstack/react-query'
import {
  getSeriesByFilter,
  searchSeries,
  type SeriesListFilter,
} from '../api/series.api'

type UseSeriesListProps = {
  query?: string
  filter?: SeriesListFilter
  page?: number
}

export const useSeriesList = ({
  query = '',
  filter = 'POPULAR',
  page = 1,
}: UseSeriesListProps = {}) => {
  const normalizedQuery = query.trim()

  return useQuery({
    queryKey: ['series', filter, page, normalizedQuery],
    queryFn: async () => {
      return normalizedQuery
        ? searchSeries({ page, query: normalizedQuery })
        : getSeriesByFilter(filter, page)
    },
  })
}
