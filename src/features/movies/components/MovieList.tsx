import type { Movie } from "../types/movie.types";
import { MovieCard } from "./MovieCard";

type MovieListProps = {
  movies: Movie[];
  onMovieClick: (id: string) => void;
};

export const MovieList = ({ movies, onMovieClick }: MovieListProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {movies?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  );
};
