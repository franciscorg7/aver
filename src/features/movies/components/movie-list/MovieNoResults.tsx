type MovieNoResultsProps = {
  searchQuery: string
}

export const MovieNoResults = ({ searchQuery }: MovieNoResultsProps) => {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
      {searchQuery.trim()
        ? `No movies found for "${searchQuery}".`
        : 'No movies available right now.'}
    </div>
  )
}
