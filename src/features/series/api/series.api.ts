import { api } from '../../../api/tmdb'
import type { SeriesDetails } from '../types/serie-details'
import type { Series, SeriesListFilter } from '../types/series'

export const SERIES_ENDPOINTS = {
  AIRING_TODAY: '/tv/airing_today',
  ON_THE_AIR: '/tv/on_the_air',
  TOP_RATED: '/tv/top_rated',
  POPULAR: '/tv/popular',
  SEARCH: '/search/tv',
  DETAILS: (id: number | string) => `/tv/${id}`,
  CREDITS: (id: number | string) => `/tv/${id}/credits`,
  SIMILAR: (id: number | string) => `/tv/${id}/similar`,
} as const

export interface TMDBPaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface SeriesSearchParams {
  page?: number
  query: string
}

export const getSeriesByFilter = async (
  filter: SeriesListFilter,
  page: number
): Promise<TMDBPaginatedResponse<Series>> => {
  const endpoint = SERIES_ENDPOINTS[filter]

  try {
    const { data } = await api.get(endpoint, {
      params: { page },
    })

    if (!data || !Array.isArray(data.results)) {
      throw new Error(
        `[SerieAPI] Unexpected API response structure for ${filter} series.`
      )
    }

    return data
  } catch (error) {
    console.error(`[SerieAPI] Failed to fetch ${filter} series:`, error)
    throw new Error(`[SerieAPI] Failed to fetch ${filter} series`)
  }
}

export const searchSeries = async ({
  page = 1,
  query,
}: SeriesSearchParams): Promise<TMDBPaginatedResponse<Series>> => {
  try {
    const { data } = await api.get(SERIES_ENDPOINTS.SEARCH, {
      params: { page, query },
    })

    if (!data || !Array.isArray(data.results)) {
      throw new Error(
        '[SeriesAPI] Unexpected API response structure for series search.'
      )
    }

    return data
  } catch (error) {
    console.error('[SeriesAPI] Failed to search series:', error)
    throw new Error('[SeriesAPI] Failed to search series')
  }
}

export const getSeriesDetails = async (
  id: string | undefined
): Promise<SeriesDetails> => {
  try {
    if (!id) throw new Error('[SeriesAPI] No series id was provided.')

    const { data } = await api.get(SERIES_ENDPOINTS.DETAILS(id))

    if (!data) {
      throw new Error(
        '[SeriesAPI] Unexpected API response structure for series details.'
      )
    }

    return data
  } catch (error) {
    console.error('[SeriesAPI] Failed to fetch series details:', error)
    throw new Error('[SeriesAPI] Failed to fetch series details')
  }
}

export const getSeriesCredits = async (id: string | undefined) => {
  try {
    if (!id) throw new Error('[SeriesAPI] No series id was provided.')

    const { data } = await api.get(SERIES_ENDPOINTS.CREDITS(id))

    if (!data) {
      throw new Error(
        '[SeriesAPI] Unexpected API response structure for series credits.'
      )
    }

    return data
  } catch (error) {
    console.error('[SeriesAPI] Failed to fetch series credits:', error)
    throw new Error('[SeriesAPI] Failed to fetch series credits')
  }
}

export const getSimilarSeries = async (
  id: string | undefined,
  page = 1
): Promise<TMDBPaginatedResponse<Series>> => {
  try {
    if (!id) throw new Error('[SeriesAPI] No series id was provided.')

    const { data } = await api.get(SERIES_ENDPOINTS.SIMILAR(id), {
      params: { page },
    })

    if (!data || !Array.isArray(data.results)) {
      throw new Error(
        '[SeriesAPI] Unexpected API response structure for similar series.'
      )
    }

    return data
  } catch (error) {
    console.error('[SeriesAPI] Failed to fetch similar series:', error)
    throw new Error('[SeriesAPI] Failed to fetch similar series')
  }
}

export type { SeriesListFilter } from '../types/series'
