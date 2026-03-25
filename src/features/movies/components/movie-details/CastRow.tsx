import type { MovieCastMember } from '../../types/movie-details'
import { CastCard } from './CastCard'

type CastRowProps = {
  cast: MovieCastMember[]
}

export const CastRow = ({ cast }: CastRowProps) => {
  return (
    <div className="flex gap-5 overflow-x-auto pb-3">
      {cast.map((member) => (
        <CastCard key={member.id} member={member} />
      ))}
    </div>
  )
}
