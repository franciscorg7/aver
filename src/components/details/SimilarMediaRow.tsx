import type { SimilarMedia } from '@/types/media-details'
import { getYearFromDate } from '@/lib/date-utils'
import { SimilarMediaCard } from './SimilarMediaCard'

type SimilarMediaRowProps = {
  media: SimilarMedia[]
  onMediaClick?: (mediaId: number) => void
}

export const SimilarMediaRow = ({
  media,
  onMediaClick,
}: SimilarMediaRowProps) => {
  const visibleMedia = media.slice(0, 6)

  const handleMediaClick = (mediaId: number) => {
    onMediaClick?.(mediaId)
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-3">
      {visibleMedia.map((mediaItem) => {
        const year = getYearFromDate(mediaItem.release_date)
        return (
          <SimilarMediaCard
            key={mediaItem.id}
            media={mediaItem}
            year={year}
            onClick={() => handleMediaClick(mediaItem.id)}
          />
        )
      })}
    </div>
  )
}
