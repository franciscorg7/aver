import { HeroBanner } from '@/components/HeroBanner'
import { Cast } from '@/components/details/Cast'
import { SimilarMediaSection } from '@/components/details/SimilarMediaSection'
import { Synopsis } from '@/components/details/Synopsis'
import { useSeriesDetails } from '@/features/series/hooks/useSerieDetails'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { getBackdropUrl, getGenres, getReleaseYear } from '@/lib/media-details'
import { useNavigate, useParams } from 'react-router'

export const SeriesDetails = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useSeriesDetails(id)
  const navigate = useNavigate()

  useDocumentTitle(data?.name ?? 'Series Details')

  const handleSeriesClick = (seriesId: number) => {
    void navigate(`/series/${seriesId}`)
  }

  if (isLoading) return <div>Loading...</div>
  if (isError)
    return (
      <div className="p-8 text-red-400">Could not load series details.</div>
    )
  if (!data) return null
  return (
    <div className="bg-navy-900 min-h-screen w-full">
      <HeroBanner
        title={data.name}
        rating={data.vote_average}
        genres={getGenres(data.genres)}
        year={getReleaseYear(data.first_air_date)}
        bgImage={getBackdropUrl(data.backdrop_path)}
        type="series"
      />
      <div className="flex flex-col gap-24 px-12 py-8">
        <Synopsis overview={data.overview}></Synopsis>
        <Cast cast={data.cast} />
        <SimilarMediaSection
          media={data.similarSeries}
          title="Similar Series"
          onMediaClick={handleSeriesClick}
        />
      </div>
    </div>
  )
}
