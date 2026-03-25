import { createContext } from 'react'

export interface PaginationContextValue {
  page: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
  hasEllipsis: boolean
  goToPage: (page: number) => void
  resetPage: () => void
  setTotalPages: (total: number) => void
}

export const PaginationContext = createContext<PaginationContextValue | null>(
  null
)
