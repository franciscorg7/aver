import type { NavTab } from '@/types/navigation'
import type { LucideIcon } from 'lucide-react'
import { createElement } from 'react'

type LogoProps = {
  selectedTab?: NavTab
  currentTabIcon: LucideIcon
  navigateHome: () => void
}

export const Logo = ({
  selectedTab,
  currentTabIcon,
  navigateHome,
}: LogoProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/15 text-yellow-300">
        <span
          key={selectedTab}
          className="animate-nav-icon-swap inline-flex items-center justify-center"
        >
          {createElement(currentTabIcon, { className: 'h-5 w-5' })}
        </span>
      </div>
      <h1
        className="cursor-pointer text-3xl font-bold tracking-tighter text-white"
        onClick={navigateHome}
      >
        AVER
      </h1>
    </div>
  )
}
