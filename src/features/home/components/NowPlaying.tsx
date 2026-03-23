import type { Movie } from '@/features/movies/types/movies'

type NowPlayingProps = {
  title?: string
  movies: Movie[]
  onMovieClick?: (id: string) => void
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const HD_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'

const getPosterUrl = (path: string | null, loadHD: boolean = false) =>
  path ? `${loadHD ? HD_IMAGE_BASE_URL : IMAGE_BASE_URL}${path}` : ''

const cardBaseClassName =
  'group relative overflow-hidden rounded-2xl bg-slate-900 text-left shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition hover:-translate-y-1'

export const NowPlaying = ({
  title = 'Trending Now',
  movies,
  onMovieClick,
}: NowPlayingProps) => {
  const [featuredMovie, ...otherMovies] = movies
  const gridMovies = otherMovies.slice(0, 4)

  if (!featuredMovie) return null
  return (
    <section className="px-4 py-10 md:px-8 xl:px-12">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-px w-10 bg-yellow-500/70" />
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          {title}
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <button
          type="button"
          onClick={() => onMovieClick?.(featuredMovie.id.toString())}
          className={`${cardBaseClassName} min-h-96 cursor-pointer shadow-[0_24px_60px_rgba(0,0,0,0.35)]`}
          style={{
            backgroundImage: `url(${getPosterUrl(featuredMovie.poster_path, true)})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          {/*  Overlay effect */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-black/5" />
          <div className="text-md absolute top-4 right-4 rounded-full bg-black/85 px-3 py-1 font-semibold text-yellow-400">
            {featuredMovie.vote_average.toFixed(1)}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6">
            <h3 className="text-2xl font-semibold text-white">
              {featuredMovie.title}
            </h3>
          </div>
        </button>

        <div className="grid gap-4 sm:grid-cols-2">
          {gridMovies.map((movie) => (
            <button
              key={movie.id}
              type="button"
              onClick={() => onMovieClick?.(movie.id.toString())}
              className={`${cardBaseClassName} min-h-60 cursor-pointer`}
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
          ))}
        </div>
      </div>
    </section>
  )
}
