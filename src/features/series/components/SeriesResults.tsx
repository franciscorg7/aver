import type { Series } from '../types/series'
import { SeriesCard } from './SeriesCard'

type SeriesResultsProps = {
  series: Series[]
  onSeriesClick: (id: string) => void
}

export const SeriesResults = ({
  series,
  onSeriesClick,
}: SeriesResultsProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
      {series.map((series) => (
        <SeriesCard key={series.id} series={series} onClick={onSeriesClick} />
      ))}
    </div>
  )
}
