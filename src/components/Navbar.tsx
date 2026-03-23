import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { APP_ROUTES } from '@/routes'

type NavTab = 'home' | 'movies' | 'tv-shows' | 'my-list'

const navItems: Array<{
  value: NavTab
  label: string
  route?: string
}> = [
  { value: 'home', label: 'Home', route: APP_ROUTES.HOME },
  { value: 'movies', label: 'Movies', route: APP_ROUTES.MOVIE_LIST },
  { value: 'tv-shows', label: 'TV Shows', route: APP_ROUTES.TV_SHOWS_LIST },
  { value: 'my-list', label: 'My List', route: APP_ROUTES.MY_LIST },
]

export const Navbar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [selectedTab, setSelectedTab] = useState<NavTab>('home')

  const activeTab: NavTab = pathname.startsWith('/movies/')
    ? 'movies'
    : selectedTab

  const handleTabChange = (value: string) => {
    const nextTab = value as NavTab
    setSelectedTab(nextTab)

    const matchedItem = navItems.find((item) => item.value === nextTab)
    if (matchedItem?.route) {
      console.log(`Navigating to ${matchedItem.route}`)
      navigate(matchedItem.route)
    }
  }

  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-linear-to-b from-black/80 via-black/40 to-transparent px-8 py-4 backdrop-blur-md">
      <h1 className="text-3xl font-bold tracking-tighter text-white">AVER</h1>
      <Tabs value={activeTab} onValueChange={handleTabChange}>
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
      <div>account</div>
    </nav>
  )
}
