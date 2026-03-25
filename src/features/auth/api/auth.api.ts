import { api } from '@/api/tmdb'

import type {
  AccountDetails,
  GuestSessionResponse,
  RequestTokenResponse,
  UserSessionResponse,
} from '../types/auth'

export const createGuestSession = async () => {
  const { data } = await api.get<GuestSessionResponse>(
    '/authentication/guest_session/new'
  )

  return data
}

export const createRequestToken = async () => {
  const { data } = await api.get<RequestTokenResponse>(
    '/authentication/token/new'
  )

  return data
}

export const createUserSession = async (requestToken: string) => {
  const { data } = await api.post<UserSessionResponse>(
    '/authentication/session/new',
    {
      request_token: requestToken,
    }
  )

  return data
}

export const deleteUserSession = async (sessionId: string) => {
  const { data } = await api.delete<{ success: boolean }>(
    '/authentication/session',
    {
      data: {
        session_id: sessionId,
      },
    }
  )

  return data
}

export const getAccountDetails = async (sessionId: string) => {
  const { data } = await api.get<AccountDetails>('/account', {
    params: {
      session_id: sessionId,
    },
  })

  return data
}
