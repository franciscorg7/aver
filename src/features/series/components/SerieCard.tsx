import type { Serie } from '../types/series'

type SerieCardProps = {
  serie: Serie
  onClick: (id: string) => void
}

export const SerieCard = ({ serie, onClick }: SerieCardProps) => {
  return (
    <div
      key={serie.id}
      className="group cursor-pointer"
      onClick={() => onClick(serie.id?.toString())}
    >
      <div className="bg-navy-800 relative aspect-2/3 overflow-hidden rounded-lg border border-slate-700/50 transition-all group-hover:border-sky-500">
        <img
          src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
          alt={serie.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-2 truncate text-xs font-medium text-slate-50">
        {serie.name}
      </h3>
      <p className="text-[10px] text-slate-400">
        {serie.first_air_date.split('-')[0]}
      </p>
    </div>
  )
}
