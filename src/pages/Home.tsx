import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { NowPlaying } from '@/features/home/components/Trending'
import { useMovieList } from '@/features/movies/hooks/useMovieList'
import { APP_ROUTES } from '@/routes'
import { FeatureBanner } from '@/features/home/components/FeatureBanner'

export const Home = () => {
  useDocumentTitle('Home')

  const navigate = useNavigate()

  const { data, isLoading, error } = useMovieList({
    filter: 'NOW_PLAYING',
    page: 1,
  })

  const handleMovieClick = (id: string) => {
    void navigate(APP_ROUTES.MOVIE_DETAILS.replace(':id', id.toString()))
  }

  const {
    id,
    title,
    overview: description,
    poster_path: bgImage,
    vote_average: rating,
  } = data?.results?.[0] || {}

  return (
    <div className="bg-navy-900 min-h-screen w-full">
      {id && (
        <FeatureBanner
          title={title}
          description={description}
          bgImage={bgImage ?? ''}
          rating={rating}
          type="movie"
          onViewDetails={() => handleMovieClick(id.toString())}
        />
      )}
      {!isLoading && !error && data?.results?.length ? (
        <NowPlaying
          title="Trending Now"
          movies={data.results.slice(1, 6)}
          onMovieClick={handleMovieClick}
        />
      ) : null}
    </div>
  )
}
