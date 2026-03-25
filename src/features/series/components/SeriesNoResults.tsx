type SeriesNoResultsProps = {
  searchQuery: string
}

export const SeriesNoResults = ({ searchQuery }: SeriesNoResultsProps) => {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
      {searchQuery.trim()
        ? `No series found for "${searchQuery}".`
        : 'No series available right now.'}
    </div>
  )
}
