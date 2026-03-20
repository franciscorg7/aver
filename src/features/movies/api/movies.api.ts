import { api } from "../../../api/tmdb";
import type { Movie } from "../types/movies";

export const MOVIES_ENDPOINTS = {
  POPULAR: "/movie/popular",
  TOP_RATED: "/movie/top_rated",
  NOW_PLAYING: "/movie/now_playing",
  UPCOMING: "/movie/upcoming",
  TRENDING: "/trending/movie/day",
  SEARCH: "/search/movie",
  DETAILS: (id: number | string) => `/movie/${id}`,
  CREDITS: (id: number | string) => `/movie/${id}/credits`,
  SIMILAR: (id: number | string) => `/movie/${id}/similar`,
} as const;

export type MovieListFilter =
  | "popular"
  | "top_rated"
  | "now_playing"
  | "upcoming"
  | "trending";

const MOVIE_LIST_ENDPOINTS: Record<MovieListFilter, string> = {
  popular: MOVIES_ENDPOINTS.POPULAR,
  top_rated: MOVIES_ENDPOINTS.TOP_RATED,
  now_playing: MOVIES_ENDPOINTS.NOW_PLAYING,
  upcoming: MOVIES_ENDPOINTS.UPCOMING,
  trending: MOVIES_ENDPOINTS.TRENDING,
};

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export const getMoviesByFilter = async (
  filter: MovieListFilter,
  page: number,
): Promise<TMDBResponse<Movie>> => {
  const endpoint = MOVIE_LIST_ENDPOINTS[filter];

  try {
    const { data } = await api.get(endpoint, {
      params: { page },
    });

    if (!data || !Array.isArray(data.results)) {
      throw new Error(
        `[MoviesAPI] Unexpected API response structure for ${filter} movies.`,
      );
    }

    return data;
  } catch (error) {
    console.error(`[MoviesAPI] Failed to fetch ${filter} movies:`, error);
    throw new Error(`[MoviesAPI] Failed to fetch ${filter} movies`);
  }
};

export const getMovieDetails = async (id: string | undefined) => {
  try {
    console.log(id);
    if (!id) throw new Error("[MoviesAPI] No movie id was provided.");
    const { data } = await api.get(MOVIES_ENDPOINTS.DETAILS(id));
    if (!data)
      throw new Error(
        "[MoviesAPI] Unexpected API response structure for movie details.",
      );
    return data;
  } catch (error) {
    console.error("[MoviesAPI] Failed to fetch movie details:", error);
    throw new Error("[MoviesAPI] Failed to fetch movie details");
  }
};
