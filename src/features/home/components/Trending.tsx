import type { Movie } from '@/features/movies/types/movies'
import { SectionTitle } from '../../../components/SectionTitle'
import { TrendingGrid } from './TrendingGrid'

type NowPlayingProps = {
  title?: string
  movies: Movie[]
  onMovieClick?: (id: string) => void
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const HD_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'

const getPosterUrl = (path: string | null, loadHD: boolean = false) =>
  path ? `${loadHD ? HD_IMAGE_BASE_URL : IMAGE_BASE_URL}${path}` : ''

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
      <SectionTitle title={title}></SectionTitle>
      <TrendingGrid
        featuredMovie={featuredMovie}
        gridMovies={gridMovies}
        onMovieClick={onMovieClick}
        getPosterUrl={getPosterUrl}
      ></TrendingGrid>
    </section>
  )
}
