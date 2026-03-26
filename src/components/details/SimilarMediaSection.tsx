import type { SimilarMedia } from '@/types/media-details'
import { SectionTitle } from '@/components/SectionTitle'
import { SimilarMediaRow } from './SimilarMediaRow'

type SimilarMediaSectionProps = {
  media?: SimilarMedia[]
  title: string
  onMediaClick?: (mediaId: number) => void
}

export const SimilarMediaSection = ({
  media = [],
  title,
  onMediaClick,
}: SimilarMediaSectionProps) => {
  const visibleMedia = media.slice(0, 6)

  /**
   * Calls the onMediaClick callback when a media card is clicked.
   *
   * @param mediaId - the media identifier
   */
  const handleMediaClick = (mediaId: number) => {
    onMediaClick?.(mediaId)
  }

  return (
    <section className="space-y-6">
      <SectionTitle title={title} />
      <SimilarMediaRow media={visibleMedia} onMediaClick={handleMediaClick} />
    </section>
  )
}
