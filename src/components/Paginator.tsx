import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type PaginatorProps = {
  page: number
  totalPages: number
  hasPrev: boolean
  hasNext: boolean
  hasEllipsis: boolean
  setPage: (page: number) => void
}

export const Paginator = ({
  page,
  totalPages,
  hasPrev,
  hasNext,
  hasEllipsis,
  setPage,
}: PaginatorProps) => {
  const handlePrevPage = (page: number) => {
    setPage(Math.max(1, page - 1))
  }

  const handleNextPage = (page: number) => {
    setPage(Math.min(totalPages, page + 1))
  }

  const [prev, cur, next] = [page - 1, page, page + 1]

  return (
    <Pagination>
      <PaginationContent>
        {hasPrev && (
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => handlePrevPage(page)} />
          </PaginationItem>
        )}

        {[prev, cur, next].map(
          (page) =>
            page > 0 &&
            page <= totalPages && (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === cur}
                  onClick={() => page !== cur && setPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
        )}

        {hasEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {hasNext && (
          <PaginationItem>
            <PaginationNext href="#" onClick={() => handleNextPage(page)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
