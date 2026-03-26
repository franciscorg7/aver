import { useMovieDetails } from '@/features/movies/hooks/useMovieDetails'
import { useNavigate, useParams } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { HeroBanner } from '@/components/HeroBanner'
import { Synopsis } from '@/components/details/Synopsis'
import { Cast } from '@/components/details/Cast'
import { getBackdropUrl, getGenres, getReleaseYear } from '@/lib/media-details'
import { SimilarMediaSection } from '@/components/details/SimilarMediaSection'

export const MovieDetails = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useMovieDetails(id)
  const navigate = useNavigate()

  useDocumentTitle(data?.title ?? 'Movie Details')

  const handleMovieClick = (movieId: number) => {
    void navigate(`/movies/${movieId}`)
  }

  if (isLoading) return <div>Loading...</div>
  if (isError)
    return <div className="p-8 text-red-400">Could not load movie details.</div>
  if (!data) return null

  return (
    <div className="bg-navy-900 min-h-screen w-full">
      <HeroBanner
        title={data.title}
        rating={data.vote_average}
        genres={getGenres(data.genres)}
        year={getReleaseYear(data.release_date)}
        bgImage={getBackdropUrl(data.backdrop_path)}
        type="movie"
      />
      <div className="flex flex-col gap-24 px-12 py-8">
        <Synopsis overview={data.overview}></Synopsis>
        <Cast cast={data.cast} />
        <SimilarMediaSection
          media={data.similarMovies}
          title="Similar Movies"
          onMediaClick={handleMovieClick}
        />
      </div>
    </div>
  )
}
