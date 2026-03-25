import { api } from '@/api/tmdb'
import type { Movie } from '../types/movies'

export const MOVIE_LIST_ENDPOINTS = {
  NOW_PLAYING: '/movie/popular',
  POPULAR: '/movie/top_rated',
  TOP_RATED: '/movie/now_playing',
  UPCOMING: '/movie/upcoming',
} as const

export type MovieListFilter =
  | 'NOW_PLAYING'
  | 'POPULAR'
  | 'TOP_RATED'
  | 'UPCOMING'

export interface TMDBMovieListResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface MovieSearchParams {
  page?: number
  query: string
}

export const getMoviesByFilter = async (
  filter: MovieListFilter,
  page: number
): Promise<TMDBMovieListResponse<Movie>> => {
  const endpoint =
    MOVIE_LIST_ENDPOINTS[
      filter.toUpperCase() as keyof typeof MOVIE_LIST_ENDPOINTS
    ]

  try {
    const { data } = await api.get(endpoint, {
      params: { page },
    })

    if (!data || !Array.isArray(data.results)) {
      throw new Error(
        `[MoviesAPI] Unexpected API response structure for ${filter} movies.`
      )
    }

    return data
  } catch (error) {
    console.error(`[MoviesAPI] Failed to fetch ${filter} movies:`, error)
    throw new Error(`[MoviesAPI] Failed to fetch ${filter} movies`)
  }
}

export const searchMovies = async ({
  page = 1,
  query,
}: MovieSearchParams): Promise<TMDBMovieListResponse<Movie>> => {
  try {
    const { data } = await api.get('/search/movie', {
      params: { page, query },
    })

    if (!data || !Array.isArray(data.results))
      throw new Error(
        '[MoviesAPI] Unexpected API response structure for movie search.'
      )

    return data
  } catch (error) {
    console.error('[MoviesAPI] Failed to search movies:', error)
    throw new Error('[MoviesAPI] Failed to search movies')
  }
}
