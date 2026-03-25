import type { MovieCastMember } from '../../types/movie-details'
import { CastRow } from './CastRow'
import { CastHeader } from './CastHeader'

type CastProps = {
  cast?: MovieCastMember[]
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
