import { AuthMode } from './AuthMode'
import { ClockFading, UserCircle } from 'lucide-react'

export const AuthInfoContent = () => {
  return (
    <div className="mt-6 space-y-5 text-sm leading-6 text-slate-300">
      <AuthMode
        title="TMDB account"
        description="Personalize your experience. You can sync favorites, track your watchlists and manage your ratings permanently."
        icon={<UserCircle />}
      />
      <AuthMode
        title="Guest session"
        description="Quick and anonymous. Lets you try the app instantly and rate movies without needing a profile."
        icon={<ClockFading />}
      />
    </div>
  )
}
