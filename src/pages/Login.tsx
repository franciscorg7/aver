import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { APP_ROUTES } from '@/routes'
import { AuthActionCard } from '@/features/auth/components/auth-action/AuthActionCard'
import { AuthInfoCard } from '@/features/auth/components/auth-info/AuthInfoCard'

export const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { loginAsGuest, loginWithAPI } = useAuth()

  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname ?? APP_ROUTES.MY_LIST

  const handleGuestLogin = async () => {
    await loginAsGuest()
    void navigate(from, { replace: true })
  }

  const handleAPILogin = async () => {
    await loginWithAPI()
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.22),transparent_30%),linear-gradient(180deg,#020617_0%,#0f172a_55%,#020617_100%)] px-6 py-42 text-slate-50">
      <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <AuthActionCard
          loginWithAPI={handleAPILogin}
          loginAsGuest={handleGuestLogin}
        />
        <AuthInfoCard />
      </div>
    </main>
  )
}
