import type { CastMember } from '@/types/media-details'
import { CastHeader } from './CastHeader'
import { CastRow } from './CastRow'

type CastProps = {
  cast?: CastMember[]
}

export const Cast = ({ cast = [] }: CastProps) => {
  const visibleCast = cast.slice(0, 5)

  const handleViewAllClick = () => {}

  return (
    <section className="w-fit space-y-6">
      <CastHeader onViewAllClick={handleViewAllClick}></CastHeader>
      <CastRow cast={visibleCast} />
    </section>
  )
}
