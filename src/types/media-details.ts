export interface SimilarMedia {
  id: number
  title: string
  poster_path: string | null
  release_date: string
}

export interface Genre {
  id: number
  name: string
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
}
