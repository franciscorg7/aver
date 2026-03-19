import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type PaginationContextType = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (total: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
  hasEllipsis: boolean;
};

const PaginationContext = createContext<PaginationContextType | undefined>(
  undefined,
);

export const PaginationProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const hasPrev = useMemo(() => page > 1, [page, totalPages]);
  const hasNext = useMemo(() => page + 1 <= totalPages, [page, totalPages]);
  const hasEllipsis = useMemo(() => page + 1 < totalPages, [page, totalPages]);

  return (
    <PaginationContext.Provider
      value={{
        page,
        setPage,
        totalPages,
        setTotalPages,
        hasNext,
        hasPrev,
        hasEllipsis,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};
