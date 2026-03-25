import { useMovieDetails } from '@/features/movies/hooks/useMovieDetails'
import { useNavigate, useParams } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { MovieHeroBanner } from '@/features/movies/components/movie-details/MovieHeroBanner'
import { Synopsis } from '@/features/movies/components/movie-details/Synopsis'
import { Cast } from '@/features/movies/components/movie-details/Cast'
import { SimilarMovies } from '@/features/movies/components/movie-details/SimilarMovies'
import { getYearFromDate } from '@/lib/date-utils'
import type { Genre } from '@/features/movies/types/movie-details'

/**
 * Gets the year from the release date.
 *
 * @param dateString - the full string date
 * @returns only the release year or N/A if null
 */
const getReleaseYear = (dateString: string | null) => {
  const year = getYearFromDate(dateString)
  return year ? year.toString() : 'N/A'
}

/**
 * Safely returns an empty path if the backdrop path is null.
 *
 * @param path - the url path for the backdrop
 * @returns the original path or empty string
 */
const getBackdropUrl = (path: string | null) =>
  path ? `https://image.tmdb.org/t/p/original${path}` : ''

/**
 * Get the genre names from the genre objects.
 *
 * @param genres - the movie genres
 * @returns an array of genre names or an empty array if undefined
 */
const getGenres = (genres: Genre[] | undefined) => {
  return genres ? genres.map((genre) => genre.name) : []
}

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
      <MovieHeroBanner
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
        <SimilarMovies
          movies={data.similarMovies}
          onMovieClick={handleMovieClick}
        />
      </div>
    </div>
  )
}
