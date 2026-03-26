import type { CastMember, Genre, SimilarMedia } from '@/types/media-details'
import { getYearFromDate } from './date-utils'
import type { Movie } from '@/features/movies/types/movies'
import type { Series } from '@/features/series/types/series'

/**
 * Gets the year from the release date.
 *
 * @param dateString - the full string date
 * @returns only the release year or N/A if null
 */
const getReleaseYear = (dateString: string | null) => {
  const year = getYearFromDate(dateString)
  return year ? year.toString() : 'N/A'
}

/**
 * Safely returns an empty path if the backdrop path is null.
 *
 * @param path - the url path for the backdrop
 * @returns the original path or empty string
 */
const getBackdropUrl = (path: string | null) =>
  path ? `https://image.tmdb.org/t/p/original${path}` : ''

/**
 * Get the genre names from the genre objects.
 *
 * @param genres - the movie genres
 * @returns an array of genre names or an empty array if undefined
 */
const getGenres = (genres: Genre[] | undefined) => {
  return genres ? genres.map((genre) => genre.name) : []
}

/**
 * Builds a list of cast members for a media item, limiting to the first 10 members.
 *
 * @param cast - the list of cast members
 * @returns the first 10 cast members or an empty array if none is available
 */
const buildCast = (cast: CastMember[] | undefined): CastMember[] => {
  return Array.isArray(cast)
    ? cast.slice(0, 10).map((member: CastMember) => ({
        id: member.id,
        name: member.name,
        character: member.character,
        profile_path: member.profile_path,
      }))
    : []
}

/**
 * Builds a list of similar media items, limiting to the first 8 results.
 *
 * @param media - the similar media items
 * @returns the first 8 similar media items or an empty array if none is available
 */
const buildSimilarMedia = (
  media: Movie[] | Series[] | undefined
): SimilarMedia[] => {
  return Array.isArray(media)
    ? media.slice(0, 8).map((m: Movie | Series) => ({
        id: m.id,
        title: 'title' in m ? m.title : m.name,
        poster_path: m.poster_path,
        release_date: 'release_date' in m ? m.release_date : m.first_air_date,
      }))
    : []
}

export {
  getReleaseYear,
  getBackdropUrl,
  getGenres,
  buildCast,
  buildSimilarMedia,
}
