import { Link, Navigate, useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { APP_ROUTES } from '@/routes'

export const MyList = () => {
  const location = useLocation()
  const { authSession, isAuthenticated, isGuest, isUser } = useAuth()

  if (!isAuthenticated) {
    return (
      <Navigate
        to={APP_ROUTES.LOGIN}
        replace
        state={{ from: { pathname: location.pathname } }}
      />
    )
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_rgba(2,6,23,0.92)_0%,_rgba(15,23,42,0.96)_100%)] px-6 py-28 text-slate-50">
      <section className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl lg:p-10">
        <span className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-semibold tracking-[0.24em] text-yellow-200 uppercase">
          {isUser ? 'TMDB account' : 'Guest session'}
        </span>

        <h1 className="font-title mt-5 text-4xl font-semibold tracking-tight text-white">
          {isUser
            ? `Welcome back, ${authSession?.account?.name || authSession?.account?.username}.`
            : 'Guest mode is active.'}
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          {isGuest
            ? 'Guest sessions are useful for trying the app quickly, but TMDB keeps their permissions limited. Upgrade to a full TMDB login when you want synced watchlists, favourites and a persistent profile.'
            : 'Your TMDB session is connected. This page is ready for watchlists, favourites, ratings and other account-based features.'}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {!isUser && (
            <Button
              asChild
              className="text-navy-900 rounded-full bg-yellow-500"
            >
              <Link to={APP_ROUTES.LOGIN}>Upgrade to TMDB login</Link>
            </Button>
          )}
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10"
          >
            <Link to={APP_ROUTES.MOVIE_LIST}>Browse movies</Link>
          </Button>
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-black/20 p-5 text-sm text-slate-400">
          Next step: connect this authenticated session to TMDB account
          endpoints for favourites, watchlists and ratings.
        </div>
      </section>
    </main>
  )
}
