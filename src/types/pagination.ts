export type Pagination = {
  page: number
  totalPages: number
  hasPrev: boolean
  hasNext: boolean
  hasEllipsis: boolean
  goToPage: (page: number) => void
  resetPage: () => void
  setTotalPages: (totalPages: number) => void
}
