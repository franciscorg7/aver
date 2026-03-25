const skeletonItems = Array.from({ length: 12 })

export const ListLoadingScreen = () => {
  return (
    <div className="flex min-h-[70vh] flex-col">
      <div className="grid flex-1 grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
        {skeletonItems.map((_, index) => (
          <div key={index} className="space-y-3">
            <div className="aspect-2/3 animate-pulse rounded-lg border border-slate-700/50 bg-slate-800/90" />
            <div className="h-3 w-3/4 animate-pulse rounded-full bg-slate-700/70" />
            <div className="h-2 w-1/4 animate-pulse rounded-full bg-slate-700/50" />
          </div>
        ))}
      </div>
    </div>
  )
}
