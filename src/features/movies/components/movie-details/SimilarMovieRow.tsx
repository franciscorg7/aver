import { SimilarMovieCard } from './SimilarMovieCard'
import type { SimilarMovie } from '../../types/movie-details'
import { getYearFromDate } from '@/lib/date-utils'

type SimilarMovieRowProps = {
  movies: SimilarMovie[]
  onMovieClick?: (movieId: number) => void
}

export const SimilarMovieRow = ({
  movies,
  onMovieClick,
}: SimilarMovieRowProps) => {
  const visibleMovies = movies.slice(0, 6)

  const handleMovieClick = (movieId: number) => {
    onMovieClick?.(movieId)
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-3">
      {visibleMovies.map((movie) => {
        const year = getYearFromDate(movie.release_date)
        return (
          <SimilarMovieCard
            key={movie.id}
            movie={movie}
            year={year}
            onClick={() => handleMovieClick(movie.id)}
          />
        )
      })}
    </div>
  )
}
