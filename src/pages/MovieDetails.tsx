import { useMovieDetails } from "@/features/movies/hooks/useMovieDetails";
import type { Genre } from "@/features/movies/types/movie-details.types";
import { useParams } from "react-router-dom";

export const MovieDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useMovieDetails(id);

  console.log(data, isLoading, isError);

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div className="p-8 text-red-400">Could not load movie details.</div>
    );

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 24 }}>
      {data.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
          alt={data.title}
          style={{ width: "100%", borderRadius: 8, marginBottom: 20 }}
        />
      )}

      <h1 style={{ margin: "16px 0 4px" }}>{data.title}</h1>
      {data.tagline && (
        <div style={{ color: "#888", fontStyle: "italic", marginBottom: 12 }}>
          {data.tagline}
        </div>
      )}

      <div style={{ marginBottom: 8 }}>
        <strong>Release:</strong> {data.release_date}
        {" · "}
        <strong>Rating:</strong> {data.vote_average?.toFixed(1) ?? "-"} / 10
        {" · "}
        <strong>Votes:</strong> {data.vote_count}
      </div>

      {data.genres.length ? (
        <div style={{ marginBottom: 8, color: "#666", fontSize: 14 }}>
          {(data.genres as Genre[]).map((g) => g.name).join(", ")}
        </div>
      ) : null}

      <p style={{ margin: "16px 0" }}>{data.overview}</p>

      <div style={{ fontSize: 13, color: "#888" }}>
        <div>
          <strong>Original Title:</strong> {data.original_title}
        </div>
        <div>
          <strong>Original Language:</strong>{" "}
          {data.original_language?.toUpperCase()}
        </div>
        {data.runtime && (
          <div>
            <strong>Runtime:</strong> ~{data.runtime} min
          </div>
        )}
        <div>
          <strong>Status:</strong> {data.status}
        </div>
        {data.budget > 0 && (
          <div>
            <strong>Budget:</strong> ${data.budget.toLocaleString()}
          </div>
        )}
        {data.revenue > 0 && (
          <div>
            <strong>Revenue:</strong> ${data.revenue.toLocaleString()}
          </div>
        )}
        {data.homepage && (
          <div>
            <a href={data.homepage} target="_blank" rel="noopener noreferrer">
              Official Site
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
