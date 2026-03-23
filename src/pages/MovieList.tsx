import { MovieListView } from '@/features/movies/components/MovieListView'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { APP_ROUTES } from '@/routes'
import { useNavigate } from 'react-router-dom'

export const MovieList = () => {
  useDocumentTitle('Home')

  const navigate = useNavigate()

  const handleMovieClick = (id: string) => {
    navigate(APP_ROUTES.MOVIE_DETAILS.replace(':id', id))
  }

  return (
    <div className="bg-navy-900 min-h-screen py-8 md:px-24 xl:px-64">
      <MovieListView onMovieClick={(id: string) => handleMovieClick(id)} />
    </div>
  )
}
