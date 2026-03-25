export type Pagination = {
  page: number
  hasPrev: boolean
  hasNext: boolean
  hasEllipsis: boolean
  setPage: (page: number) => void
  setTotalPages: (totalPages: number) => void
}
