import type { Movie } from '@/features/movies/types/movies'

type FeatureCardProps = {
  movie: Movie
  onMovieClick?: (id: string) => void
  className: string
  getPosterUrl: (path: string | null, loadHD?: boolean) => string
}

export const FeatureCard = ({
  movie,
  onMovieClick,
  className,
  getPosterUrl,
}: FeatureCardProps) => {
  return (
    <button
      type="button"
      onClick={() => onMovieClick?.(movie.id.toString())}
      className={`${className} min-h-96 cursor-pointer shadow-[0_24px_60px_rgba(0,0,0,0.35)]`}
      style={{
        backgroundImage: `url(${getPosterUrl(movie.poster_path, true)})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      {/*  Overlay effect */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-black/5" />
      <div className="text-md absolute top-4 right-4 rounded-full bg-black/85 px-3 py-1 font-semibold text-yellow-400">
        {movie.vote_average.toFixed(1)}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="text-2xl font-semibold text-white">{movie.title}</h3>
      </div>
    </button>
  )
}
