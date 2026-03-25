import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { APP_ROUTES } from '@/routes'

export const AuthCallback = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { completeAPILogin } = useAuth()
  const requestToken = searchParams.get('request_token')
  const isDenied = searchParams.get('denied') === 'true'
  const initialError = isDenied
    ? 'TMDB access was denied. You can try again or use guest mode.'
    : !requestToken
      ? 'TMDB did not return a request token to finish authentication.'
      : null
  const [error, setError] = useState<string | null>(initialError)

  useEffect(() => {
    if (!requestToken || initialError) {
      return
    }

    const completeLogin = async () => {
      try {
        await completeAPILogin(requestToken)
        void navigate(APP_ROUTES.MY_LIST, { replace: true })
      } catch {
        setError(
          'Your TMDB session could not be created. Please try signing in again.'
        )
      }
    }

    void completeLogin()
  }, [completeAPILogin, initialError, navigate, requestToken])

  if (error) {
    return (
      <main className="bg-navy-900 flex min-h-screen items-center justify-center px-6 py-24 text-slate-50">
        <div className="w-full max-w-lg rounded-4xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
          <h1 className="font-title text-3xl font-semibold text-white">
            Authentication failed
          </h1>
          <p className="mt-4 text-slate-300">{error}</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button
              asChild
              className="text-navy-900 rounded-full bg-yellow-500"
            >
              <Link to={APP_ROUTES.LOGIN}>Try again</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10"
            >
              <Link to={APP_ROUTES.HOME}>Go home</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-navy-900 flex min-h-screen items-center justify-center px-6 py-24 text-slate-50">
      <div className="w-full max-w-lg rounded-4xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
        <h1 className="font-title text-3xl font-semibold text-white">
          Finalizing your TMDB session
        </h1>
        <p className="mt-4 text-slate-300">
          We're exchanging your approved request token for a session.
        </p>
      </div>
    </main>
  )
}
