import { useEffect } from 'react'

import { ListLoadingScreen } from '@/components/ListLoadingScreen'
import { Paginator } from '@/components/Paginator'
import type { Series } from '../types/series'
import type { Pagination } from '@/types/pagination'
import { SeriesNoResults } from './SeriesNoResults'
import { SeriesResults } from './SeriesResults'

type SeriesListViewProps = {
  series?: Series[]
  totalPages?: number
  isLoading?: boolean
  hasError?: boolean
  pagination: Pagination
  searchQuery: string
  onSeriesClick: (id: string) => void
}

export const SeriesListView = ({
  series,
  totalPages,
  isLoading,
  hasError,
  pagination,
  searchQuery,
  onSeriesClick,
}: SeriesListViewProps) => {
  const { page, hasPrev, hasNext, hasEllipsis, goToPage, setTotalPages } =
    pagination

  useEffect(() => {
    setTotalPages(totalPages || 1)
  }, [totalPages, setTotalPages])

  const noResults = !series || series.length === 0 || hasError
  if (isLoading) return <ListLoadingScreen />

  return (
    <>
      {noResults ? (
        <SeriesNoResults searchQuery={searchQuery} />
      ) : (
        <SeriesResults series={series} onSeriesClick={onSeriesClick} />
      )}

      <Paginator
        page={page}
        totalPages={totalPages ?? 0}
        hasPrev={hasPrev}
        hasNext={hasNext}
        hasEllipsis={hasEllipsis}
        setPage={goToPage}
      />
    </>
  )
}
