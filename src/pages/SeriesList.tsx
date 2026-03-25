import { Searchbar } from '@/components/Searchbar'
import { SeriesListView } from '@/features/series/components/SeriesListView'
import { useSeriesList } from '@/features/series/hooks/useSerieList'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { usePagination } from '@/hooks/usePagination'
import { APP_ROUTES } from '@/routes'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SeriesList = () => {
  useDocumentTitle('Series')

  const pagination = usePagination()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery)
  const { data, isLoading, isError } = useSeriesList({
    filter: 'POPULAR',
    page: pagination.page,
    query: debouncedSearchQuery,
  })

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 400)

    return () => window.clearTimeout(timeoutId)
  }, [searchQuery])

  const { resetPage } = pagination
  useEffect(() => {
    resetPage()
  }, [debouncedSearchQuery, resetPage])

  /**
   * Navigates to the series details page for the given series id.
   *
   * @param id - the focused series id
   */
  const handleSeriesClick = (id: string) => {
    void navigate(APP_ROUTES.SERIES_DETAILS.replace(':id', id))
  }

  return (
    <div className="bg-navy-900 flex min-h-screen flex-col gap-8 py-8 pt-24 md:px-24 xl:px-64">
      <Searchbar
        searchQuery={searchQuery}
        placeholder="Search for a series..."
        ariaLabel="Search series"
        onSearchChange={setSearchQuery}
      />
      <SeriesListView
        series={data?.results ?? []}
        totalPages={data?.total_pages ?? 0}
        isLoading={isLoading}
        hasError={isError}
        pagination={pagination}
        searchQuery={searchQuery}
        onSeriesClick={(id: string) => handleSeriesClick(id)}
      />
    </div>
  )
}
