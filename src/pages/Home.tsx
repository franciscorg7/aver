import { MovieList } from "../features/movies/components/MovieList";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/routes";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { ListFilter } from "@/components/ListFilter";
import { SerieList } from "@/features/series/components/SerieList";

export const Home = () => {
  useDocumentTitle("Home");

  const navigate = useNavigate();

  const handleMovieClick = (id: string) => {
    navigate(APP_ROUTES.MOVIE_DETAILS.replace(":id", id));
  };

  return (
    <div className="min-h-screen py-8 xl:px-64 md:px-24 bg-navy-900">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter text-white">AVER</h1>
      </header>
      <ListFilter
        currentFilter="movies"
        filters={["movies", "series"]}
        content={[
          <MovieList onMovieClick={(id: string) => handleMovieClick(id)} />,
          <SerieList onSerieClick={(id: string) => handleMovieClick(id)} />,
        ]}
        onFilterChange={(filter) => console.log(filter)}
      />
    </div>
  );
};
