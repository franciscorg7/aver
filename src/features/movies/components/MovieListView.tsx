import { Paginator } from '@/components/Paginator'
import { ListLoadingScreen } from '@/components/ListLoadingScreen'
import { useMovieList } from '../hooks/useMovieList'
import { MovieCard } from './MovieCard'
import { usePagination } from '@/context/Pagination'
import { useEffect } from 'react'

type MovieListProps = {
  onMovieClick: (id: string) => void
}

export const MovieListView = ({ onMovieClick }: MovieListProps) => {
  const { page, hasPrev, hasNext, hasEllipsis, setPage, setTotalPages } =
    usePagination()

  const { data, isLoading, isError } = useMovieList({
    filter: 'POPULAR',
    page,
  })

  useEffect(() => {
    setPage(1)
  }, [setPage])

  useEffect(() => {
    if (!data || !data?.total_pages) return
    setTotalPages(data.total_pages)
  }, [data, setTotalPages])

  if (isLoading) return <ListLoadingScreen label="movies" />
  if (isError || !data)
    return <div className="p-8 text-red-400">Erro ao carregar filmes.</div>

  return (
    <>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
        {data?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
        ))}
      </div>
      <Paginator
        page={page}
        totalPages={data?.total_pages ?? 0}
        hasPrev={hasPrev}
        hasNext={hasNext}
        hasEllipsis={hasEllipsis}
        setPage={(page) => setPage(page)}
      ></Paginator>
    </>
  )
}
