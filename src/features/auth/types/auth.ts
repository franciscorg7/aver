export type AuthMode = 'guest' | 'user'

export interface GuestSessionResponse {
  success: boolean
  guest_session_id: string
  expires_at: string
}

export interface RequestTokenResponse {
  success: boolean
  expires_at: string
  request_token: string
}

export interface UserSessionResponse {
  success: boolean
  session_id: string
}

export interface AccountDetails {
  id: number
  username: string
  name: string
  avatar: {
    gravatar: {
      hash: string
    }
    tmdb: {
      avatar_path: string | null
    }
  }
}

export interface AuthSession {
  mode: AuthMode
  expiresAt?: string
  guestSessionId?: string
  sessionId?: string
  account?: Pick<AccountDetails, 'id' | 'username' | 'name'>
}
