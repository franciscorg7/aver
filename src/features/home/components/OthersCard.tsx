import type { Movie } from '@/features/movies/types/movies'

type OthersCardProps = {
  movie: Movie
  className?: string
  onMovieClick?: (movieId: string) => void
  getPosterUrl: (path: string | null, loadHD?: boolean) => string
}

export const OthersCard = ({
  movie,
  className,
  onMovieClick,
  getPosterUrl,
}: OthersCardProps) => {
  return (
    <button
      key={movie.id}
      type="button"
      onClick={() => onMovieClick?.(movie.id.toString())}
      className={`${className} min-h-60 cursor-pointer`}
      style={{
        backgroundImage: `url(${getPosterUrl(movie.poster_path)})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      {/*  Overlay effect */}
      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-black/0" />
      <div className="absolute top-3 right-3 rounded-full bg-black/85 px-2.5 py-1 text-xs font-semibold text-yellow-400">
        {movie.vote_average.toFixed(1)}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-white">
          {movie.title}
        </h3>
      </div>
    </button>
  )
}
