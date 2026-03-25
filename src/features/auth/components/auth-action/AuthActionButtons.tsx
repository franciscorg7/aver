import { Button } from '@/components/ui/button'
import { ArrowRight, UserRound } from 'lucide-react'

type AuthActionButtonsProps = {
  loginWithAPI: () => void
  loginAsGuest: () => void
}

export const AuthActionButtons = ({
  loginWithAPI,
  loginAsGuest,
}: AuthActionButtonsProps) => {
  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
      <Button
        onClick={loginWithAPI}
        className="text-navy-900 h-12 rounded-full bg-yellow-500 px-6 text-sm font-semibold hover:bg-yellow-400"
      >
        Continue with TMDB
        <ArrowRight />
      </Button>
      <Button
        variant="outline"
        onClick={loginAsGuest}
        className="h-12 rounded-full border-white/15 bg-white/5 px-6 text-sm font-semibold text-white hover:bg-white/10"
      >
        Continue as guest
        <UserRound />
      </Button>
    </div>
  )
}
