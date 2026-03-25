import { useQuery } from '@tanstack/react-query'
import {
  getSerieByFilter,
  searchSerie,
  type SerieListFilter,
} from '../api/series.api'

type UseSeriesListProps = {
  query?: string
  filter?: SerieListFilter
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
        ? searchSerie({ page, query: normalizedQuery })
        : getSerieByFilter(filter, page)
    },
  })
}
