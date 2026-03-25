import { useState } from 'react'
import type { Series } from '../types/series'

type SeriesCardProps = {
  series: Series
  onClick: (id: string) => void
}

export const SeriesCard = ({ series, onClick }: SeriesCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div
      key={series.id}
      className="group cursor-pointer"
      onClick={() => onClick(series.id?.toString())}
    >
      <div className="bg-navy-800 relative aspect-2/3 overflow-hidden rounded-lg border border-slate-700/50 transition-all group-hover:border-sky-500">
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-slate-800" />
        )}
        <img
          src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
          alt={series.name}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
            isLoaded
              ? 'blur-0 scale-100 opacity-100'
              : 'scale-105 opacity-0 blur-xs'
          }`}
        />
      </div>
      <h3 className="mt-2 truncate text-xs font-medium text-slate-50">
        {series.name}
      </h3>
      <p className="text-[10px] text-slate-400">
        {series.first_air_date.split('-')[0]}
      </p>
    </div>
  )
}
