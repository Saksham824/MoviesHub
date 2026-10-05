import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_KEY = "22de56f0";
const FALLBACK_POSTER = "https://via.placeholder.com/600x900?text=No+Image";

function DetailItem({ label, value }) {
  if (!value || value === "N/A") return null;

  return (
    <div className="rounded-xl border border-white/8 bg-white/3 px-4 py-3">
      <dt className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm leading-6 text-slate-200">{value}</dd>
    </div>
  );
}

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovie = async () => {
      setLoading(true);
      setError("");
      setMovie(null);

      try {
        const response = await axios.get("https://www.omdbapi.com/", {
          params: { i: id, apikey: API_KEY, plot: "full" },
          signal: controller.signal,
        });

        if (response.data.Response !== "True") {
          setError(response.data.Error || "This title could not be found.");
          return;
        }

        setMovie(response.data);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError("We couldn’t load this title. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchMovie();
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <main
        aria-label="Loading movie details"
        className="min-h-[70vh] bg-slate-950 px-5 py-12 sm:px-8"
      >
        <div className="mx-auto grid max-w-6xl animate-pulse gap-8 rounded-4xl border border-white/10 bg-white/3 p-6 sm:p-10 md:grid-cols-[280px_1fr]">
          <div className="mx-auto aspect-2/3 w-full max-w-70 rounded-2xl bg-slate-800" />
          <div className="space-y-5 py-4">
            <div className="h-4 w-32 rounded bg-slate-800" />
            <div className="h-10 w-3/4 rounded bg-slate-800" />
            <div className="h-24 rounded bg-slate-800" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="h-20 rounded-xl bg-slate-800" />
              <div className="h-20 rounded-xl bg-slate-800" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-950 px-5 py-16">
        <div
          role="alert"
          className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/3 p-8 text-center shadow-2xl shadow-black/20"
        >
          <span
            aria-hidden="true"
            className="mx-auto grid size-14 place-items-center rounded-2xl border border-rose-300/15 bg-rose-300/6 text-2xl text-rose-200"
          >
            !
          </span>
          <h1 className="mt-5 text-2xl font-bold text-white">
            Title unavailable
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {error || "This title could not be found."}
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-pink-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300"
          >
            <span aria-hidden="true">←</span>
            Back to discovery
          </Link>
        </div>
      </main>
    );
  }

  const poster =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER;
  const genres =
    movie.Genre && movie.Genre !== "N/A"
      ? movie.Genre.split(",").map((genre) => genre.trim())
      : [];

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-128 overflow-hidden"
      >
        <img
          src={poster}
          alt=""
          className="h-full w-full scale-110 object-cover opacity-20 blur-3xl"
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300"
        >
          <span aria-hidden="true">←</span>
          Back to discovery
        </Link>

        <article className="overflow-hidden rounded-4xl border border-white/10 bg-slate-900/60 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="grid md:grid-cols-[minmax(250px,0.72fr)_1.6fr]">
            <div className="relative p-5 sm:p-8 md:p-10">
              <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-slate-800 shadow-2xl shadow-black/40">
                <img
                  src={poster}
                  alt={`${movie.Title} poster`}
                  className="aspect-2/3 w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 pt-2 sm:p-9 md:p-12">
              <div className="flex flex-wrap items-center gap-2">
                {movie.Type && movie.Type !== "N/A" && (
                  <span className="rounded-full border border-pink-300/20 bg-pink-300/8 px-3 py-1 text-xs font-semibold capitalize text-pink-200">
                    {movie.Type}
                  </span>
                )}
                {movie.Rated && movie.Rated !== "N/A" && (
                  <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs font-medium text-slate-300">
                    Rated {movie.Rated}
                  </span>
                )}
                {movie.Year && movie.Year !== "N/A" && (
                  <span className="text-sm text-slate-400">{movie.Year}</span>
                )}
              </div>

              <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {movie.Title}
              </h1>

              {genres.length > 0 && (
                <ul aria-label="Genres" className="mt-5 flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <li
                      key={genre}
                      className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-medium text-slate-300"
                    >
                      {genre}
                    </li>
                  ))}
                </ul>
              )}

              {movie.Plot && movie.Plot !== "N/A" && (
                <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                  {movie.Plot}
                </p>
              )}

              <div className="mt-7 flex flex-wrap gap-3">
                {movie.imdbRating && movie.imdbRating !== "N/A" && (
                  <div className="inline-flex items-center gap-2 rounded-xl border border-amber-300/15 bg-amber-300/6 px-4 py-3">
                    <span aria-hidden="true" className="text-lg text-amber-300">
                      ★
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {movie.imdbRating}
                        <span className="ml-1 text-xs font-medium text-slate-400">
                          / 10
                        </span>
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">
                        IMDb rating
                      </p>
                    </div>
                  </div>
                )}
                {movie.Runtime && movie.Runtime !== "N/A" && (
                  <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/3 px-4 py-3">
                    <span aria-hidden="true" className="text-lg text-violet-300">
                      ◷
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {movie.Runtime}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">
                        Runtime
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <section
            aria-labelledby="movie-info-heading"
            className="border-t border-white/10 bg-black/10 p-6 sm:p-9 md:px-10"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-5 w-1 rounded-full bg-linear-to-b from-pink-400 to-violet-500" />
              <h2
                id="movie-info-heading"
                className="text-sm font-bold uppercase tracking-[0.18em] text-white"
              >
                At a glance
              </h2>
            </div>
            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <DetailItem label="Released" value={movie.Released} />
              <DetailItem label="Director" value={movie.Director} />
              <DetailItem label="Writer" value={movie.Writer} />
              <DetailItem label="Cast" value={movie.Actors} />
              <DetailItem label="Language" value={movie.Language} />
              <DetailItem label="Awards" value={movie.Awards} />
            </dl>
          </section>
        </article>
      </div>
    </main>
  );
}
