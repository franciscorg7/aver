import { useState, type PropsWithChildren } from 'react'
import {
  createGuestSession,
  createRequestToken,
  createUserSession,
  deleteUserSession,
  getAccountDetails,
} from '@/features/auth/api/auth.api'

import type { AuthSession } from '@/features/auth/types/auth'
import { APP_ROUTES } from '@/routes'
import { AuthContext, type AuthContextValue } from './auth-context'

const AUTH_STORAGE_KEY = 'aver-auth-session'

/**
 * Reads the stored auth session from localStorage.
 * If the stored data is invalid, it clears it and returns null.
 *
 * @returns the auth session
 */
const readStoredSession = () => {
  const storedSession = localStorage.getItem(AUTH_STORAGE_KEY)

  if (!storedSession) return null

  try {
    return JSON.parse(storedSession) as AuthSession
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

const getAPIApprovalUrl = (requestToken: string) => {
  const callbackUrl = `${window.location.origin}${APP_ROUTES.AUTH_CALLBACK}`

  return `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${encodeURIComponent(callbackUrl)}`
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authSession, setAuthSession] = useState<AuthSession | null>(
    readStoredSession
  )

  const persistSession = (session: AuthSession | null) => {
    setAuthSession(session)

    if (!session) {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      return
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
  }

  const loginAsGuest = async () => {
    const guestSession = await createGuestSession()

    persistSession({
      mode: 'guest',
      guestSessionId: guestSession.guest_session_id,
      expiresAt: guestSession.expires_at,
    })
  }

  const loginWithAPI = async () => {
    const requestToken = await createRequestToken()
    window.location.assign(getAPIApprovalUrl(requestToken.request_token))
  }

  const completeAPILogin = async (requestToken: string) => {
    const userSession = await createUserSession(requestToken)
    const account = await getAccountDetails(userSession.session_id)

    persistSession({
      mode: 'user',
      sessionId: userSession.session_id,
      account: {
        id: account.id,
        username: account.username,
        name: account.name,
      },
    })
  }

  const logout = async () => {
    if (authSession?.mode === 'user' && authSession.sessionId) {
      try {
        await deleteUserSession(authSession.sessionId)
      } catch {
        // Keep logout resilient even if TMDB session revocation fails.
      }
    }

    persistSession(null)
  }

  const value: AuthContextValue = {
    authSession,
    isAuthenticated: Boolean(authSession),
    isGuest: authSession?.mode === 'guest',
    isUser: authSession?.mode === 'user',
    isLoading: false,
    loginAsGuest,
    loginWithAPI,
    completeAPILogin,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
