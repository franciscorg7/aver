type ListLoadingScreenProps = {
  label: string
}

const skeletonItems = Array.from({ length: 12 })

export const ListLoadingScreen = ({ label }: ListLoadingScreenProps) => {
  return (
    <div className="flex min-h-[70vh] flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div className="h-4 w-24 animate-pulse rounded-full bg-slate-700/70" />
        <div className="h-4 w-16 animate-pulse rounded-full bg-slate-700/50" />
      </div>

      <div className="grid flex-1 grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
        {skeletonItems.map((_, index) => (
          <div key={index} className="space-y-3">
            <div className="aspect-[2/3] animate-pulse rounded-lg border border-slate-700/50 bg-slate-800/90" />
            <div className="h-3 w-3/4 animate-pulse rounded-full bg-slate-700/70" />
            <div className="h-2 w-1/4 animate-pulse rounded-full bg-slate-700/50" />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="rounded-full border border-slate-700/60 bg-slate-800/60 px-4 py-2 text-xs tracking-[0.3em] text-slate-400 uppercase">
          Loading {label}
        </div>
      </div>
    </div>
  )
}
