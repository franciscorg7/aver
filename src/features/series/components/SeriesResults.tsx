import type { Serie } from '../types/series'
import { SeriesCard } from './SeriesCard'

type SeriesResultsProps = {
  series: Serie[]
  onSeriesClick: (id: string) => void
}

export const SeriesResults = ({
  series,
  onSeriesClick,
}: SeriesResultsProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
      {series.map((serie) => (
        <SeriesCard key={serie.id} serie={serie} onClick={onSeriesClick} />
      ))}
    </div>
  )
}
