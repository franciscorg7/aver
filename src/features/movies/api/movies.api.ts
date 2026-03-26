import { api } from '../../../api/tmdb'
import type { MovieDetailsWithExtras } from '../types/movie-details'
import { buildCast, buildSimilarMedia } from '@/lib/media-details'

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

    const cast = buildCast(credits?.cast)
    const similarMovies = buildSimilarMedia(similar?.results)

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
