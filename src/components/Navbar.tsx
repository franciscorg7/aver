import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Bookmark,
  Clapperboard,
  Home,
  LogOut,
  Tv,
  UserRound,
} from 'lucide-react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { APP_ROUTES } from '@/routes'

type NavTab = 'home' | 'movies' | 'series' | 'my-list' | 'none'

const navItems: Array<{
  value: NavTab
  label: string
  route?: string
  icon?: React.ReactNode
}> = [
  {
    value: 'home',
    label: 'Home',
    icon: <Home />,
    route: APP_ROUTES.HOME,
  },
  {
    value: 'movies',
    label: 'Movies',
    icon: <Clapperboard />,
    route: APP_ROUTES.MOVIE_LIST,
  },
  {
    value: 'series',
    label: 'Series',
    icon: <Tv />,
    route: APP_ROUTES.SERIES_LIST,
  },
  {
    value: 'my-list',
    label: 'My List',
    icon: <Bookmark />,
    route: APP_ROUTES.MY_LIST,
  },
]

/**
 * Gets the active tab based on the current document pathname.
 *
 * @param pathname - document pathname
 * @returns the current active tab
 */
const getActiveTab = (pathname: string): NavTab | undefined => {
  if (pathname === '/') return 'home'
  if (pathname.startsWith('/movies')) return 'movies'
  if (pathname.startsWith('/series')) return 'series'
  if (pathname.startsWith('/my-list')) return 'my-list'
  return 'none'
}

export const Navbar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { authSession, isAuthenticated, isGuest, logout } = useAuth()

  const selectedTab = getActiveTab(pathname)

  /**
   * Handle tab changes by updating the selected tab state
   * and navigating to the corresponding route.
   *
   * @param value - the value of the selected tab.
   */
  const handleTabChange = (value: string) => {
    const nextTab = value as NavTab

    const matchedItem = navItems.find((item) => item.value === nextTab)
    if (!matchedItem?.route) return
    void navigate(matchedItem.route)
  }

  /**
   * Handle clicking the logo to navigate home.
   */
  const navigateHome = () => {
    void navigate(APP_ROUTES.HOME)
  }

  const getCurrentTabIcon = () => {
    const currentItem = navItems.find((item) => item.value === selectedTab)
    return currentItem?.icon || <Clapperboard />
  }

  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-linear-to-b from-black/80 via-black/40 to-transparent px-8 py-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/15 text-yellow-300">
          {getCurrentTabIcon()}
        </div>
        <h1
          className="cursor-pointer text-3xl font-bold tracking-tighter text-white"
          onClick={navigateHome}
        >
          AVER
        </h1>
      </div>

      <Tabs value={selectedTab} onValueChange={handleTabChange}>
        <TabsList className="h-auto rounded-full border border-white/10 bg-black/20 p-1 shadow-none backdrop-blur-xl">
          {navItems.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium text-white/70 shadow-none transition data-[state=active]:bg-white/12 data-[state=active]:text-white data-[state=active]:shadow-none"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="flex items-center gap-3">
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
    </nav>
  )
}
