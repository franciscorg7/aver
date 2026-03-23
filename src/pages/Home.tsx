import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { HeroBanner } from '@/features/home/components/HeroBanner'
import { useMovieList } from '@/features/movies/hooks/useMovieList'

export const Home = () => {
  useDocumentTitle('Home')

  const navigate = useNavigate()

  const { data, isLoading, error } = useMovieList({
    filter: 'NOW_PLAYING',
    page: 1,
  })

  const {
    title,
    overview: description,
    poster_path: bgImage,
    vote_average: rating,
  } = data?.results?.[1] || {}

  return (
    <div className="bg-navy-900 min-h-screen w-full">
      <HeroBanner
        title={title}
        description={description}
        bgImage={bgImage ?? ''}
        rating={rating}
        type="movie"
      />
    </div>
  )
}
