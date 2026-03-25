import { Clapperboard } from 'lucide-react'

export const AuthInfoHeader = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/15 text-yellow-300">
        <Clapperboard className="h-8 w-8" />
      </div>
      <h2 className="font-title text-2xl font-semibold text-white">
        What each mode can do
      </h2>
    </div>
  )
}
