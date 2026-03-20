import { api } from "../../../api/tmdb";
import type { SerieDetails } from "../types/serie-details";
import type { Serie, SeriesListFilter } from "../types/series";

export const SERIES_ENDPOINTS = {
  AIRING_TODAY: "/tv/airing_today",
  ON_THE_AIR: "/tv/on_the_air",
  TOP_RATED: "/tv/top_rated",
  POPULAR: "/tv/popular",
  SEARCH: "/search/tv",
  DETAILS: (id: number | string) => `/tv/${id}`,
  CREDITS: (id: number | string) => `/tv/${id}/credits`,
  SIMILAR: (id: number | string) => `/tv/${id}/similar`,
} as const;

const SERIES_LIST_ENDPOINTS: Record<SeriesListFilter, string> = {
  airing_today: SERIES_ENDPOINTS.AIRING_TODAY,
  on_the_air: SERIES_ENDPOINTS.ON_THE_AIR,
  popular: SERIES_ENDPOINTS.POPULAR,
  top_rated: SERIES_ENDPOINTS.TOP_RATED,
};

export interface TMDBPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface SeriesSearchParams {
  page?: number;
  query: string;
}

export const getSeriesByFilter = async (
  filter: SeriesListFilter,
  page: number,
): Promise<TMDBPaginatedResponse<Serie>> => {
  const endpoint = SERIES_LIST_ENDPOINTS[filter];

  try {
    const { data } = await api.get(endpoint, {
      params: { page },
    });

    if (!data || !Array.isArray(data.results)) {
      throw new Error(
        `[SeriesAPI] Unexpected API response structure for ${filter} series.`,
      );
    }

    return data;
  } catch (error) {
    console.error(`[SeriesAPI] Failed to fetch ${filter} series:`, error);
    throw new Error(`[SeriesAPI] Failed to fetch ${filter} series`);
  }
};

export const searchSeries = async ({
  page = 1,
  query,
}: SeriesSearchParams): Promise<TMDBPaginatedResponse<Serie>> => {
  try {
    const { data } = await api.get(SERIES_ENDPOINTS.SEARCH, {
      params: { page, query },
    });

    if (!data || !Array.isArray(data.results)) {
      throw new Error(
        "[SeriesAPI] Unexpected API response structure for series search.",
      );
    }

    return data;
  } catch (error) {
    console.error("[SeriesAPI] Failed to search series:", error);
    throw new Error("[SeriesAPI] Failed to search series");
  }
};

export const getSeriesDetails = async (
  id: string | undefined,
): Promise<SerieDetails> => {
  try {
    if (!id) throw new Error("[SeriesAPI] No series id was provided.");

    const { data } = await api.get(SERIES_ENDPOINTS.DETAILS(id));

    if (!data) {
      throw new Error(
        "[SeriesAPI] Unexpected API response structure for series details.",
      );
    }

    return data;
  } catch (error) {
    console.error("[SeriesAPI] Failed to fetch series details:", error);
    throw new Error("[SeriesAPI] Failed to fetch series details");
  }
};

export const getSeriesCredits = async (id: string | undefined) => {
  try {
    if (!id) throw new Error("[SeriesAPI] No series id was provided.");

    const { data } = await api.get(SERIES_ENDPOINTS.CREDITS(id));

    if (!data) {
      throw new Error(
        "[SeriesAPI] Unexpected API response structure for series credits.",
      );
    }

    return data;
  } catch (error) {
    console.error("[SeriesAPI] Failed to fetch series credits:", error);
    throw new Error("[SeriesAPI] Failed to fetch series credits");
  }
};

export const getSimilarSeries = async (
  id: string | undefined,
  page = 1,
): Promise<TMDBPaginatedResponse<Serie>> => {
  try {
    if (!id) throw new Error("[SeriesAPI] No series id was provided.");

    const { data } = await api.get(SERIES_ENDPOINTS.SIMILAR(id), {
      params: { page },
    });

    if (!data || !Array.isArray(data.results)) {
      throw new Error(
        "[SeriesAPI] Unexpected API response structure for similar series.",
      );
    }

    return data;
  } catch (error) {
    console.error("[SeriesAPI] Failed to fetch similar series:", error);
    throw new Error("[SeriesAPI] Failed to fetch similar series");
  }
};

export type { SeriesListFilter } from "../types/series";
