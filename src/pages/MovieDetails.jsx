import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_KEY = "22de56f0";
const FALLBACK_POSTER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900">
    <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1b1725"/><stop offset="1" stop-color="#090a0f"/></linearGradient></defs>
    <rect width="600" height="900" fill="url(#bg)"/>
    <circle cx="300" cy="390" r="95" fill="#f9a8d4" fill-opacity=".08"/>
    <path d="M280 345v90l75-45-75-45Z" fill="#f9a8d4" fill-opacity=".75"/>
    <text x="300" y="550" fill="#94a3b8" font-family="sans-serif" font-size="24" letter-spacing="4" text-anchor="middle">MOVIEHUB</text>
  </svg>`);

function DetailItem({ label, value }) {
  if (!value || value === "N/A") return null;

  return (
    <div className="group rounded-2xl border border-white/8 bg-white/[0.035] p-4 transition duration-300 hover:border-pink-300/20 hover:bg-white/5.5 motion-reduce:transition-none">
      <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-6 text-slate-200">{value}</dd>
    </div>
  );
}

function SectionHeading({ eyebrow, children }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span
        aria-hidden="true"
        className="h-8 w-1 rounded-full bg-linear-to-b from-pink-400 to-violet-500"
      />
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-pink-300">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-lg font-bold tracking-tight text-white sm:text-xl">
          {children}
        </h2>
      </div>
    </div>
  );
}

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [posterFailed, setPosterFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovie = async () => {
      setLoading(true);
      setError("");
      setMovie(null);
      setPosterFailed(false);

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
        className="min-h-[70vh] overflow-hidden bg-[#08090d] px-5 py-10 text-white sm:px-8 sm:py-14"
      >
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="mb-10 h-4 w-36 rounded-full bg-white/10" />
          <div className="grid gap-8 lg:grid-cols-[minmax(260px,0.7fr)_1.5fr] lg:gap-16">
            <div className="mx-auto aspect-2/3 w-full max-w-70 rounded-3xl bg-slate-800/80" />
            <div className="space-y-6 py-3 lg:py-10">
              <div className="h-4 w-40 rounded bg-slate-800" />
              <div className="h-14 max-w-xl rounded bg-slate-800" />
              <div className="h-28 max-w-2xl rounded-2xl bg-slate-800/80" />
              <div className="flex gap-3">
                <div className="h-16 w-36 rounded-2xl bg-slate-800" />
                <div className="h-16 w-36 rounded-2xl bg-slate-800" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#08090d] px-5 py-16 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 size-112 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-[100px]"
        />
        <div
          role="alert"
          className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/4 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl"
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
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-pink-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300 motion-reduce:transform-none motion-reduce:transition-none"
          >
            <span aria-hidden="true">←</span>
            Back to discovery
          </Link>
        </div>
      </main>
    );
  }

  const poster =
    !posterFailed && movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : FALLBACK_POSTER;
  const genres =
    movie.Genre && movie.Genre !== "N/A"
      ? movie.Genre.split(",").map((genre) => genre.trim())
      : [];
  const hasRating = movie.imdbRating && movie.imdbRating !== "N/A";
  const hasRuntime = movie.Runtime && movie.Runtime !== "N/A";
  const hasYear = movie.Year && movie.Year !== "N/A";
  const hasRated = movie.Rated && movie.Rated !== "N/A";

  return (
    <main className="relative isolate overflow-hidden bg-[#08090d] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-168 overflow-hidden"
      >
        <img
          src={poster}
          alt=""
          onError={() => setPosterFailed(true)}
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-3xl"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#08090d]/30 via-[#08090d]/75 to-[#08090d]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_15%,rgba(190,24,93,0.16),transparent_38%),radial-gradient(ellipse_at_15%_35%,rgba(91,33,182,0.12),transparent_35%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-7 sm:px-8 sm:pb-20 sm:pt-10 lg:px-10 lg:pb-24">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 sm:mb-10">
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-black/20 px-4 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-md transition duration-200 hover:border-pink-300/30 hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300 motion-reduce:transition-none"
          >
            <span
              aria-hidden="true"
              className="transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
            >
              ←
            </span>
            Back to discovery
          </Link>
          <p className="hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500 sm:flex">
            <span className="text-pink-300">MovieHub</span>
            <span aria-hidden="true" className="text-slate-700">/</span>
            Title details
          </p>
        </div>

        <article>
          <div className="grid items-center gap-9 md:grid-cols-[minmax(230px,0.7fr)_1.3fr] md:gap-10 lg:grid-cols-[minmax(290px,0.75fr)_1.45fr] lg:gap-16">
            <div className="mx-auto w-full max-w-76 md:max-w-none">
              <div className="group relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-4xl bg-linear-to-br from-pink-400/20 via-transparent to-violet-400/15 opacity-70 blur-2xl transition duration-700 group-hover:opacity-100 motion-reduce:transition-none"
                />
                <div className="relative overflow-hidden rounded-[1.4rem] border border-white/15 bg-slate-900 shadow-[0_35px_90px_-35px_rgba(0,0,0,0.95)] transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_42px_100px_-35px_rgba(190,24,93,0.28)] motion-reduce:transform-none motion-reduce:transition-none">
                  <img
                    src={poster}
                    alt={`${movie.Title} poster`}
                    onError={() => setPosterFailed(true)}
                    className="aspect-2/3 w-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-white/5"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[1.4rem] ring-1 ring-inset ring-white/10"
                  />
                </div>
                {hasRating && (
                  <div className="absolute -bottom-4 -right-3 flex items-center gap-2.5 rounded-2xl border border-amber-200/20 bg-[#111116]/95 px-4 py-3 shadow-xl shadow-black/40 backdrop-blur-xl sm:-right-5">
                    <span
                      aria-hidden="true"
                      className="text-2xl leading-none text-amber-300"
                    >
                      ★
                    </span>
                    <span className="text-lg font-black tabular-nums text-white">
                      {movie.imdbRating}
                      <span className="ml-1 text-xs font-medium text-slate-500">
                        /10
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="min-w-0 py-2 md:py-8 lg:py-12">
              <div className="flex flex-wrap items-center gap-2.5">
                {movie.Type && movie.Type !== "N/A" && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-pink-300/20 bg-pink-300/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-pink-200">
                    <span className="size-1.5 rounded-full bg-pink-300 shadow-[0_0_10px_rgba(249,168,212,0.85)]" />
                    {movie.Type}
                  </span>
                )}
                {hasRated && (
                  <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-300">
                    Rated {movie.Rated}
                  </span>
                )}
                {hasYear && (
                  <span className="text-sm font-medium tabular-nums text-slate-400">
                    {movie.Year}
                  </span>
                )}
              </div>

              <h1 className="mt-5 max-w-4xl text-[2.5rem] font-black leading-[1.04] tracking-[-0.045em] text-white sm:text-5xl lg:mt-6 lg:text-6xl xl:text-7xl">
                {movie.Title}
              </h1>

              {genres.length > 0 && (
                <ul
                  aria-label="Genres"
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {genres.map((genre) => (
                    <li
                      key={genre}
                      className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white"
                    >
                      {genre}
                    </li>
                  ))}
                </ul>
              )}

              {movie.Plot && movie.Plot !== "N/A" && (
                <p className="mt-6 max-w-3xl text-[15px] leading-7 text-slate-300 sm:text-base sm:leading-8">
                  {movie.Plot}
                </p>
              )}

              <div className="mt-7 flex flex-wrap gap-3">
                {hasRating && (
                  <div className="flex min-w-36 items-center gap-3 rounded-2xl border border-amber-300/15 bg-amber-300/5.5 px-4 py-3">
                    <span
                      aria-hidden="true"
                      className="grid size-9 place-items-center rounded-xl bg-amber-300/10 text-lg text-amber-300"
                    >
                      ★
                    </span>
                    <div>
                      <p className="text-sm font-bold tabular-nums text-white">
                        {movie.imdbRating}
                        <span className="ml-1 text-xs font-medium text-slate-500">
                          / 10
                        </span>
                      </p>
                      <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                        IMDb rating
                      </p>
                    </div>
                  </div>
                )}
                {hasRuntime && (
                  <div className="flex min-w-36 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
                    <span
                      aria-hidden="true"
                      className="grid size-9 place-items-center rounded-xl bg-violet-300/10 text-lg text-violet-200"
                    >
                      ◷
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {movie.Runtime}
                      </p>
                      <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                        Runtime
                      </p>
                    </div>
                  </div>
                )}
                {movie.imdbID && (
                  <a
                    href={`https://www.imdb.com/title/${movie.imdbID}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 transition duration-200 hover:border-pink-300/30 hover:bg-pink-300/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300 motion-reduce:transition-none"
                  >
                    More on IMDb
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {(movie.Plot && movie.Plot !== "N/A") ||
          movie.Director !== "N/A" ||
          movie.Actors !== "N/A" ? (
            <section
              aria-labelledby="story-heading"
              className="mt-14 border-t border-white/10 pt-8 sm:mt-20 sm:pt-10"
            >
              <SectionHeading eyebrow="The film">A closer look</SectionHeading>
              <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <DetailItem label="Released" value={movie.Released} />
                <DetailItem label="Director" value={movie.Director} />
                <DetailItem label="Writer" value={movie.Writer} />
                <DetailItem label="Cast" value={movie.Actors} />
                <DetailItem label="Language" value={movie.Language} />
                <DetailItem label="Awards" value={movie.Awards} />
              </dl>
            </section>
          ) : null}
        </article>
      </div>
    </main>
  );
}
