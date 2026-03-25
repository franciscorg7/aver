import { api } from '../../../api/tmdb'
import type {
  MovieCastMember,
  MovieDetailsWithExtras,
  SimilarMovie,
} from '../types/movie-details'
import type { Movie } from '../types/movies'

export const MOVIES_ENDPOINTS = {
  POPULAR: '/movie/popular',
  TOP_RATED: '/movie/top_rated',
  NOW_PLAYING: '/movie/now_playing',
  UPCOMING: '/movie/upcoming',
  TRENDING: '/trending/movie/day',
  SEARCH: '/search/movie',
  DETAILS: (id: number | string) => `/movie/${id}`,
  CREDITS: (id: number | string) => `/movie/${id}/credits`,
  SIMILAR: (id: number | string) => `/movie/${id}/similar`,
} as const

/**
 * Builds a list of cast members for a movie, limiting to the first 10 members.
 *
 * @param cast - the list of movie cast members
 * @returns the first 10 cast members or an empty array if none is available
 */
const buildMovieCast = (
  cast: MovieCastMember[] | undefined
): MovieCastMember[] => {
  return Array.isArray(cast)
    ? cast.slice(0, 10).map((member: MovieCastMember) => ({
        id: member.id,
        name: member.name,
        character: member.character,
        profile_path: member.profile_path,
      }))
    : []
}

/**
 * Builds a list of similar movies, limiting to the first 8 results.
 *
 * @param movies - the similar movies
 * @returns the first 8 similar movies or an empty array if none is available
 */
const buildSimilarMovies = (movies: Movie[] | undefined): SimilarMovie[] => {
  return Array.isArray(movies)
    ? movies.slice(0, 8).map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
      }))
    : []
}

export const getMovieDetails = async (id: string | undefined) => {
  try {
    if (!id) throw new Error('[MoviesAPI] No movie id was provided.')

    const [detailsResponse, creditsResponse, similarResponse] =
      await Promise.all([
        api.get(MOVIES_ENDPOINTS.DETAILS(id)),
        api.get(MOVIES_ENDPOINTS.CREDITS(id)),
        api.get(MOVIES_ENDPOINTS.SIMILAR(id)),
      ])

    const details = detailsResponse.data
    const credits = creditsResponse.data
    const similar = similarResponse.data

    if (!details)
      throw new Error(
        '[MoviesAPI] Unexpected API response structure for movie details.'
      )

    const cast = buildMovieCast(credits?.cast)
    const similarMovies = buildSimilarMovies(similar?.results)

    return {
      ...details,
      cast,
      similarMovies,
    } satisfies MovieDetailsWithExtras
  } catch (error) {
    console.error('[MoviesAPI] Failed to fetch movie details:', error)
    throw new Error('[MoviesAPI] Failed to fetch movie details')
  }
}
