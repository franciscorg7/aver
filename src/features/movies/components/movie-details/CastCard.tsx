import type { MovieCastMember } from '../../types/movie-details'

type CastCardProps = {
  member: MovieCastMember
}

const getProfileUrl = (path: string | null) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : ''

export const CastCard = ({ member }: CastCardProps) => {
  return (
    <div key={member.id} className="group min-w-0 flex-none cursor-pointer">
      <div className="mb-3 flex h-32 w-24 items-end overflow-hidden rounded-2xl bg-[#d7b28c] shadow-[0_18px_40px_rgba(0,0,0,0.2)]">
        {member.profile_path ? (
          <img
            src={getProfileUrl(member.profile_path)}
            alt={member.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs font-semibold text-slate-900/70 uppercase">
            {member.name}
          </div>
        )}
      </div>
      <h3 className="max-w-24 truncate text-sm font-semibold text-white">
        {member.name}
      </h3>
      <p className="max-w-24 truncate text-[11px] tracking-[0.14em] text-white/45 uppercase">
        {member.character}
      </p>
    </div>
  )
}
