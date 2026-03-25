import type { SimilarMovie } from '../../types/movie-details'
import { SimilarMovieRow } from './SimilarMovieRow'
import { SectionTitle } from '@/components/SectionTitle'

type SimilarMoviesProps = {
  movies?: SimilarMovie[]
  onMovieClick?: (movieId: number) => void
}

export const SimilarMovies = ({
  movies = [],
  onMovieClick,
}: SimilarMoviesProps) => {
  const visibleMovies = movies.slice(0, 6)

  /**
   * Calls the onMovieClick callback when a movie card is clicked.
   *
   * @param movieId - the movie identifier
   */
  const handleMovieClick = (movieId: number) => {
    onMovieClick?.(movieId)
  }

  return (
    <section className="space-y-6">
      <SectionTitle title="Similar Movies" />
      <SimilarMovieRow movies={visibleMovies} onMovieClick={handleMovieClick} />
    </section>
  )
}
