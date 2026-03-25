import type { Movie } from '../../types/movies'
import { MovieCard } from './MovieCard'

type MovieResultsProps = {
  movies: Movie[]
  onMovieClick: (id: string) => void
}

export const MovieResults = ({ movies, onMovieClick }: MovieResultsProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  )
}
