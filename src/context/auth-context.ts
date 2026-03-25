import type { AuthSession } from '@/features/auth/types/auth'
import { createContext } from 'react'

export interface AuthContextValue {
  authSession: AuthSession | null
  isAuthenticated: boolean
  isGuest: boolean
  isUser: boolean
  isLoading: boolean
  loginAsGuest: () => Promise<void>
  loginWithAPI: () => Promise<void>
  completeAPILogin: (requestToken: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
