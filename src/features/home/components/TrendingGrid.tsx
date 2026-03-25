import { FeatureCard } from './FeatureCard'
import { OthersCard } from './OthersCard'
import type { Movie } from '@/features/movies/types/movies'

type TrendingGridProps = {
  featuredMovie: Movie
  gridMovies: Movie[]
  onMovieClick?: (id: string) => void
  getPosterUrl: (path: string | null, loadHD?: boolean) => string
}

const cardBaseClassName =
  'group relative overflow-hidden rounded-2xl bg-slate-900 text-left shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition hover:-translate-y-1'

export const TrendingGrid = ({
  featuredMovie,
  gridMovies,
  onMovieClick,
  getPosterUrl,
}: TrendingGridProps) => {
  return (
    <div className={`grid gap-4 lg:grid-cols-[1.4fr_1fr]`}>
      <FeatureCard
        movie={featuredMovie}
        className={cardBaseClassName}
        onMovieClick={onMovieClick}
        getPosterUrl={getPosterUrl}
      ></FeatureCard>

      <div className="grid gap-4 sm:grid-cols-2">
        {gridMovies.map((movie) => (
          <OthersCard
            key={movie.id}
            movie={movie}
            className={cardBaseClassName}
            onMovieClick={onMovieClick}
            getPosterUrl={getPosterUrl}
          />
        ))}
      </div>
    </div>
  )
}
