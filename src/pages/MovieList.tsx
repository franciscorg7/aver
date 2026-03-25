import { Searchbar } from '@/components/Searchbar'
import { usePagination } from '@/context/Pagination'
import { MovieListView } from '@/features/movies/components/movie-list/MovieListView'
import { useMovieList } from '@/features/movies/hooks/useMovieList'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { APP_ROUTES } from '@/routes'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const MovieList = () => {
  useDocumentTitle('Movies')

  const pagination = usePagination()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery)
  const { data, isLoading, isError } = useMovieList({
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

  const { setPage } = pagination
  useEffect(() => {
    setPage(1)
  }, [debouncedSearchQuery, setPage])

  const handleMovieClick = (id: string) => {
    navigate(APP_ROUTES.MOVIE_DETAILS.replace(':id', id))
  }

  return (
    <div className="bg-navy-900 flex min-h-screen flex-col gap-8 py-8 pt-24 md:px-24 xl:px-64">
      <Searchbar
        searchQuery={searchQuery}
        placeholder="Search for a movie..."
        ariaLabel="Search movies"
        onSearchChange={setSearchQuery}
      />
      <MovieListView
        movies={data?.results ?? []}
        totalPages={data?.total_pages ?? 0}
        isLoading={isLoading}
        hasError={isError}
        pagination={pagination}
        searchQuery={searchQuery}
        onMovieClick={(id: string) => handleMovieClick(id)}
      />
    </div>
  )
}
