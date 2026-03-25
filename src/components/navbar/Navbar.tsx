import { useLocation, useNavigate } from 'react-router-dom'
import {
  Bookmark,
  Clapperboard,
  Home,
  type LucideIcon,
  Tv,
  User,
} from 'lucide-react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/hooks/useAuth'
import { APP_ROUTES } from '@/routes'
import type { NavItem, NavTab } from '@/types/navigation'
import { Logo } from './Logo'
import { Account } from './Account'

const navItems: NavItem[] = [
  {
    value: 'home',
    label: 'Home',
    icon: Home,
    route: APP_ROUTES.HOME,
  },
  {
    value: 'movies',
    label: 'Movies',
    icon: Clapperboard,
    route: APP_ROUTES.MOVIE_LIST,
  },
  {
    value: 'series',
    label: 'Series',
    icon: Tv,
    route: APP_ROUTES.SERIES_LIST,
  },
  {
    value: 'my-list',
    label: 'My List',
    icon: Bookmark,
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

  /**
   * Maps the current pathname to the corresponding tab icon.
   * Defaults to the Clapperboard icon if no match is found.
   *
   * @returns the current tab icon
   */
  const getCurrentTabIcon = (): LucideIcon => {
    const currentItem = navItems.find((item) => item.value === selectedTab)
    if (!currentItem && pathname.startsWith(APP_ROUTES.LOGIN)) return User
    return currentItem?.icon ?? Clapperboard
  }

  const selectedTab = getActiveTab(pathname)
  const currentTabIcon = getCurrentTabIcon()

  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-linear-to-b from-black/80 via-black/40 to-transparent px-8 py-4 backdrop-blur-md">
      <Logo
        selectedTab={selectedTab}
        currentTabIcon={currentTabIcon}
        navigateHome={navigateHome}
      />
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
      <Account
        isAuthenticated={isAuthenticated}
        isGuest={isGuest}
        authSession={authSession}
        logout={logout}
        isHidden={pathname.startsWith(APP_ROUTES.LOGIN)}
      />
    </nav>
  )
}
