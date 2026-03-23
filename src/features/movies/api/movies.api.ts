import { api } from '../../../api/tmdb'

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
    console.log(id)
    if (!id) throw new Error('[MoviesAPI] No movie id was provided.')
    const { data } = await api.get(MOVIES_ENDPOINTS.DETAILS(id))
    if (!data)
      throw new Error(
        '[MoviesAPI] Unexpected API response structure for movie details.'
      )
    return data
  } catch (error) {
    console.error('[MoviesAPI] Failed to fetch movie details:', error)
    throw new Error('[MoviesAPI] Failed to fetch movie details')
  }
}
