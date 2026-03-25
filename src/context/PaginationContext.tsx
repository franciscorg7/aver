import { useCallback, useMemo, useState, type PropsWithChildren } from 'react'
import {
  PaginationContext,
  type PaginationContextValue,
} from './pagination-context'

const MIN_PAGE = 1

/**
 * Make sure the given page number is between 1 and the total number of pages.
 *
 * @param page - the current page
 * @param totalPages - the total amount of pages
 * @returns the max between 1 and totalPages, ensuring the page number is always valid
 */
const clampPage = (page: number, totalPages: number) =>
  Math.max(MIN_PAGE, Math.min(page, totalPages))

export const PaginationProvider = ({ children }: PropsWithChildren) => {
  const [page, setPage] = useState(MIN_PAGE)
  const [totalPages, setTotalPagesState] = useState(MIN_PAGE)

  /**
   * Navigates to the given page number, ensuring it's within the valid range.
   *
   * @param nextPage - the page number to navigate to
   */
  const goToPage = useCallback(
    (nextPage: number) => {
      setPage(clampPage(nextPage, totalPages))
    },
    [totalPages]
  )

  /**
   * Sets the current page back to the first page.
   */
  const resetPage = useCallback(() => {
    setPage(MIN_PAGE)
  }, [])

  /**
   * Sets the total number of pages and ensures the current page is still valid.
   *
   * @param total - the total number of pages
   */
  const setTotalPages = useCallback((total: number) => {
    const normalizedTotalPages = Math.max(MIN_PAGE, total)

    setTotalPagesState(normalizedTotalPages)
    setPage((currentPage) => clampPage(currentPage, normalizedTotalPages))
  }, [])

  const value = useMemo<PaginationContextValue>(
    () => ({
      page,
      totalPages,
      hasPrev: page > MIN_PAGE,
      hasNext: page < totalPages,
      hasEllipsis: page + 1 < totalPages,
      goToPage,
      resetPage,
      setTotalPages,
    }),
    [goToPage, page, resetPage, setTotalPages, totalPages]
  )

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  )
}
