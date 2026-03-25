import type { LucideIcon } from 'lucide-react'

export type NavTab = 'home' | 'movies' | 'series' | 'my-list' | 'none'

export interface NavItem {
  value: NavTab
  label: string
  route?: string
  icon: LucideIcon
}
