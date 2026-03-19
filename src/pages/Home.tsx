import { Paginator } from "../components/Paginator";
import { MovieList } from "../features/movies/components/MovieList";
import { usePopularMovies } from "../features/movies/hooks/usePopularMovies";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/routes";
import { usePagination } from "@/context/Pagination";
import { useEffect } from "react";

export const Home = () => {
  const { page, hasPrev, hasNext, hasEllipsis, setPage, setTotalPages } =
    usePagination();
  const { data, isLoading, isError } = usePopularMovies(page);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data || !data?.total_pages) return;
    setTotalPages(data.total_pages);
  }, [data?.total_pages, setTotalPages]);

  if (isLoading)
    return <div className="p-8 text-slate-400">A carregar filmes...</div>;
  if (isError || !data)
    return <div className="p-8 text-red-400">Erro ao carregar filmes.</div>;

  const handleMovieClick = (id: string) => {
    navigate(APP_ROUTES.MOVIE_DETAILS.replace(":id", id));
  };

  return (
    <div className="min-h-screen p-8 bg-navy-900">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter text-white">AVER</h1>
      </header>
      <MovieList
        movies={data?.results ?? []}
        onMovieClick={(id: string) => handleMovieClick(id)}
      />
      <Paginator
        page={page}
        totalPages={data?.total_pages ?? 0}
        hasPrev={hasPrev}
        hasNext={hasNext}
        hasEllipsis={hasEllipsis}
        setPage={(page) => setPage(page)}
      ></Paginator>
    </div>
  );
};
