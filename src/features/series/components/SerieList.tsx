import { usePagination } from "@/context/Pagination";
import { useSerieList } from "../hooks/useSerieList";
import { SerieCard } from "./SerieCard";
import { useEffect } from "react";
import { Paginator } from "@/components/Paginator";

type SerieListProps = {
  onSerieClick: (id: string) => void;
};

export const SerieList = ({ onSerieClick }: SerieListProps) => {
  const { page, hasPrev, hasNext, hasEllipsis, setPage, setTotalPages } =
    usePagination();

  const { data, isLoading, isError } = useSerieList({
    filter: "popular",
    page,
  });

  useEffect(() => {
    setPage(1);
  }, [setPage]);

  useEffect(() => {
    if (!data || !data?.total_pages) return;
    setTotalPages(data.total_pages);
  }, [data, setTotalPages]);

  if (isLoading)
    return <div className="p-8 text-slate-400">A carregar séries...</div>;
  if (isError || !data)
    return <div className="p-8 text-red-400">Erro ao carregar séries.</div>;

  return (
    <>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
        {data?.results?.map((serie) => (
          <SerieCard key={serie.id} serie={serie} onClick={onSerieClick} />
        ))}
      </div>
      <Paginator
        page={page}
        totalPages={data?.total_pages ?? 0}
        hasPrev={hasPrev}
        hasNext={hasNext}
        hasEllipsis={hasEllipsis}
        setPage={(page) => setPage(page)}
      ></Paginator>
    </>
  );
};
