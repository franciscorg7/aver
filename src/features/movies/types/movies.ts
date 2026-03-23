export interface Movie {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  original_language: string
  genre_ids: number[]
  video: boolean
  adult: boolean
}

export type MovieListFilters =
  | 'popular'
  | 'top_rated'
  | 'now_playing'
  | 'upcoming'
  | 'trending'
