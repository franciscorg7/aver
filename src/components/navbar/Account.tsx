import { LogOut, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { APP_ROUTES } from '@/routes'
import type { AuthSession } from '@/features/auth/types/auth'

type AccountProps = {
  isAuthenticated: boolean
  isGuest: boolean
  authSession: AuthSession | null
  isHidden: boolean
  logout: () => void
}

export const Account = ({
  isAuthenticated,
  isGuest,
  authSession,
  isHidden = false,
  logout,
}: AccountProps) => {
  return (
    <div
      className={`flex items-center gap-3 ${isHidden ? 'pointer-events-none opacity-0' : ''}`}
    >
      {isAuthenticated ? (
        <>
          <Link
            to={APP_ROUTES.MY_LIST}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10"
          >
            <UserRound className="h-4 w-4" />
            {isGuest
              ? 'Guest'
              : authSession?.account?.name || authSession?.account?.username}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            className="rounded-full text-white/80 hover:bg-white/10 hover:text-white"
            aria-label="Log out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <Button
          asChild
          className="text-navy-900 rounded-full bg-yellow-500 px-5 text-sm font-semibold hover:bg-yellow-400"
        >
          <Link to={APP_ROUTES.LOGIN}>Sign in</Link>
        </Button>
      )}
    </div>
  )
}
