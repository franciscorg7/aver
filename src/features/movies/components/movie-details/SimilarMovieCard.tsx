import type { SimilarMovie } from '../../types/movie-details'

type SimilarMovieCardProps = {
  movie: SimilarMovie
  year: number | null
  onClick?: () => void
}

const getPosterUrl = (path: string | null) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : ''

/**
 * Gets only the year from a full release date string.
 *
 * @param year - the release year
 * @returns the year as a string or 'N/A' if null
 */
const getReleaseYear = (year: number | null) => {
  return year ? year.toString() : 'N/A'
}

export const SimilarMovieCard = ({
  movie,
  year,
  onClick,
}: SimilarMovieCardProps) => {
  return (
    <div
      key={movie.id}
      className="group min-w-0 flex-none cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-4 flex h-56 w-40 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_22px_55px_rgba(0,0,0,0.25)]">
        {movie.poster_path ? (
          <img
            src={getPosterUrl(movie.poster_path)}
            alt={movie.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm font-semibold text-white/60">
            {movie.title}
          </div>
        )}
      </div>
      <h3 className="max-w-40 truncate text-lg font-semibold tracking-tight text-white">
        {movie.title}
      </h3>
      <p className="text-sm text-white/45">{getReleaseYear(year)}</p>
    </div>
  )
}
