import { api } from "../../../api/tmdb";
import type { Movie } from "../types/movie.types";

export const MOVIES_ENDPOINTS = {
  POPULAR: "/movie/popular",
  TRENDING: "/trending/movie/day",
  SEARCH: "/search/movie",
  DETAILS: (id: number | string) => `/movie/${id}`,
  CREDITS: (id: number | string) => `/movie/${id}/credits`,
  SIMILAR: (id: number | string) => `/movie/${id}/similar`,
} as const;

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export const getPopularMovies = async (
  page: number,
): Promise<TMDBResponse<Movie>> => {
  try {
    const { data } = await api.get(MOVIES_ENDPOINTS.POPULAR, {
      params: { page },
    });
    if (!data || !Array.isArray(data.results))
      throw new Error(
        "[MoviesAPI] Unexpected API response structure for popular movies.",
      );
    return data;
  } catch (error) {
    console.error("[MoviesAPI] Failed to fetch popular movies:", error);
    throw new Error("[MoviesAPI] Failed to fetch popular movies");
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
