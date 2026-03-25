import { Paginator } from '@/components/Paginator'
import { ListLoadingScreen } from '@/components/ListLoadingScreen'
import { useEffect } from 'react'
import type { Pagination } from '@/types/pagination'
import type { Movie } from '../../types/movies'
import { MovieNoResults } from './MovieNoResults'
import { MovieResults } from './MovieResults'

type MovieListProps = {
  movies?: Movie[]
  totalPages?: number
  isLoading?: boolean
  hasError?: boolean
  pagination: Pagination
  searchQuery: string
  onMovieClick: (id: string) => void
}

export const MovieListView = ({
  movies,
  totalPages,
  isLoading,
  hasError,
  pagination,
  searchQuery,
  onMovieClick,
}: MovieListProps) => {
  const { page, hasPrev, hasNext, hasEllipsis, goToPage, setTotalPages } =
    pagination

  useEffect(() => {
    setTotalPages(totalPages || 1)
  }, [totalPages, setTotalPages])

  const noResults = !movies || movies.length === 0 || hasError
  if (isLoading) return <ListLoadingScreen />

  return (
    <>
      {noResults ? (
        <MovieNoResults searchQuery={searchQuery} />
      ) : (
        <MovieResults movies={movies} onMovieClick={onMovieClick} />
      )}
      <Paginator
        page={page}
        totalPages={totalPages ?? 0}
        hasPrev={hasPrev}
        hasNext={hasNext}
        hasEllipsis={hasEllipsis}
        setPage={goToPage}
      ></Paginator>
    </>
  )
}
