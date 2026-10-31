import { useState, useEffect, useMemo, useRef } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = "22de56f0";
const PAGE_SIZE = 10; // OMDb always returns 10 per page
const MAX_API_PAGES = 100; // OMDb hard limit
const PAGES_PER_KEYWORD = 10; // how deep we go into each keyword when browsing

const KEYWORDS = [
  "Avengers",
  "Batman",
  "Harry Potter",
  "Star Wars",
  "Spider-Man",
  "Inception",
  "Matrix",
  "Jurassic",
  "Mission Impossible",
  "Pirates",
  "Love",
  "War",
  "Night",
  "Dark",
  "King",
  "Man",
  "Life",
  "World",
  "Dragon",
  "Story",
];

const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// Builds a compact page list like: 1 … 4 5 6 … 20
const getPageNumbers = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("...");
  pages.push(total);
  return pages;
};

export default function Home({ filter }) {
  const [query, setQuery] = useState(""); // what the user is typing
  const [activeQuery, setActiveQuery] = useState(""); // what was submitted
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resultsRef = useRef(null);
  const isFirstRender = useRef(true);

  // Shuffled once per visit so browsing pages gives a varied but stable order
  const keywords = useMemo(() => shuffle(KEYWORDS), []);

  const filterType = filter?.type ?? "all";
  const filterValue = filter?.value ?? "";
  const filterKey = `${filterType}:${filterValue}`;

  // Reset to page 1 whenever the filter changes
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey);
    setPage(1);
    setActiveQuery("");
    setQuery("");
  }

  // Load results whenever filter, search, or page changes
  useEffect(() => {
    let cancelled = false;

    const apiGet = async (params) => {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&${params}`
      );
      return res.json();
    };

    const load = async () => {
      setLoading(true);
      setError("");

      try {
        let data;
        let pagesCount;
        let total;

        if (activeQuery) {
          // ---- Search mode: real OMDb pagination ----
          data = await apiGet(
            `s=${encodeURIComponent(activeQuery)}&page=${page}`
          );
          total = parseInt(data.totalResults || "0", 10);
          pagesCount = Math.min(
            Math.ceil(total / PAGE_SIZE) || 1,
            MAX_API_PAGES
          );
        } else {
          // ---- Browse mode: rotate through keywords, one per page ----
          const keyword = keywords[(page - 1) % keywords.length];
          const apiPage = Math.floor((page - 1) / keywords.length) + 1;
          const typeParam =
            filterType === "type" && filterValue ? `&type=${filterValue}` : "";

          data = await apiGet(
            `s=${encodeURIComponent(keyword)}${typeParam}&page=${apiPage}`
          );
          pagesCount = keywords.length * PAGES_PER_KEYWORD;
          total = 0; // unknown in browse mode
        }

        if (cancelled) return;

        if (data.Response === "True") {
          let results = data.Search;

          // Genre filter: OMDb can't search by genre, so fetch details and filter
          if (filterType === "genre" && !activeQuery) {
            const detailed = await Promise.all(
              results.map((m) => apiGet(`i=${m.imdbID}`))
            );
            if (cancelled) return;
            results = detailed.filter(
              (m) =>
                m.Genre &&
                m.Genre.toLowerCase().includes(filterValue.toLowerCase())
            );
            if (results.length === 0) {
              setError(
                `No ${filterValue} titles on this page. Try the next page.`
              );
            }
          }

          // Remove duplicates by imdbID
          const unique = {};
          results.forEach((m) => (unique[m.imdbID] = m));

          setMovies(Object.values(unique));
          setTotalPages(pagesCount);
          setTotalResults(total);
        } else {
          setMovies([]);
          setTotalPages(pagesCount || 1);
          setTotalResults(0);
          setError(data.Error || "No movies found");
        }
      } catch (err) {
        if (cancelled) return;
        setMovies([]);
        setError("Failed to fetch movies. Please try again.");
      }

      if (!cancelled) setLoading(false);
    };

    load();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line
  }, [filterKey, activeQuery, page, keywords]);

  // Scroll to the top of the results when the page changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = query.trim();
    if (!searchQuery) {
      setError("Enter a movie or series title to start your search.");
      return;
    }
    setError("");
    setPage(1);
    setActiveQuery(searchQuery);
  };

  const searchFor = (searchQuery) => {
    setQuery(searchQuery);
    setError("");
    setPage(1);
    setActiveQuery(searchQuery);
  };

  const goToPage = (p) => {
    if (p < 1 || p > totalPages || p === page || loading) return;
    setPage(p);
  };

  const filterLabel =
    filter?.type === "genre"
      ? filter.value
      : filter?.type === "type"
        ? filter.value === "series"
          ? "Series"
          : "Movies"
        : "Tonight’s picks";

  const pageNumbers = getPageNumbers(page, totalPages);

  const pageButtonBase =
    "inline-flex min-w-10 items-center justify-center rounded-xl border px-3 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300 disabled:cursor-not-allowed disabled:opacity-40";

  const spotlightMovies = movies
    .filter((movie) => movie.Poster && movie.Poster !== "N/A")
    .slice(0, 3);
  const spotlightPositions = [
    "right-[8%] top-[6%] z-20 h-[82%] w-[56%] rotate-[4deg]",
    "left-[6%] top-[18%] z-10 h-[59%] w-[37%] -rotate-[9deg]",
    "bottom-[3%] right-[2%] z-30 h-[42%] w-[31%] rotate-[9deg]",
  ];

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#08090d] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_8%,rgba(190,24,93,0.17),transparent_34%),radial-gradient(ellipse_at_88%_22%,rgba(79,70,229,0.16),transparent_32%)]"
      />

      <div className="mx-auto max-w-360 px-4 pb-20 pt-6 sm:px-7 sm:pt-10 lg:px-10">
        <section className="relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-[#101117] shadow-2xl shadow-black/40 sm:rounded-[36px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-36 -z-10 size-136 rounded-full bg-violet-500/12 blur-[100px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(255,255,255,0.025),transparent_45%,rgba(168,85,247,0.04))]"
          />

          <div className="grid items-center lg:min-h-147.5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-10 px-6 pb-9 pt-10 sm:px-10 sm:pb-12 sm:pt-14 lg:px-14 lg:py-16 xl:px-18">
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-pink-300/15 bg-pink-300/6 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-pink-200 sm:text-[11px]">
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink-300 opacity-50" />
                  <span className="relative inline-flex size-2 rounded-full bg-pink-300" />
                </span>
                Your next favorite is waiting
              </div>

              <h1 className="max-w-2xl text-[clamp(2.75rem,6.1vw,5.75rem)] font-black leading-[0.98] tracking-[-0.055em] text-white">
                Make tonight
                <span className="mt-1 block bg-linear-to-r from-pink-300 via-fuchsia-300 to-violet-300 bg-clip-text pb-2 text-transparent">
                  a movie night.
              </span>
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                Find the film you’ll be thinking about tomorrow. Search a
                favorite, follow a feeling, and let the next great story find
                you.
              </p>

              <form
                onSubmit={handleSearch}
                role="search"
                className="mt-8 flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#08090d]/80 p-2 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl transition focus-within:border-pink-300/35 sm:flex-row sm:items-center"
              >
                <label htmlFor="movie-search" className="sr-only">
                  Search movies and series
                </label>
                <div className="flex min-h-12 min-w-0 flex-1 items-center gap-3 px-3">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-5 shrink-0 text-slate-500"
                  >
                    <circle
                      cx="10.8"
                      cy="10.8"
                      r="6.8"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="m16 16 4.2 4.2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    id="movie-search"
                    type="search"
                    className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
                    placeholder="Search movies, series, and more..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-pink-500 to-violet-500 px-5 text-sm font-bold text-white shadow-lg shadow-pink-950/30 transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300 disabled:cursor-wait disabled:opacity-70 sm:px-6"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Searching
                    </>
                  ) : (
                    <>
                      Find a film
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-medium text-slate-500">
                  Try:
                </span>
                {["Dune", "Interstellar", "The Batman", "Oppenheimer"].map(
                  (title) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() => searchFor(title)}
                      className="rounded-full border border-white/8 bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:border-pink-300/25 hover:bg-pink-300/[0.07] hover:text-pink-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
                    >
                      {title}
                    </button>
                  )
                )}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/8 pt-6 text-xs text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <span className="grid size-7 place-items-center rounded-lg border border-white/8 bg-white/[0.035] text-pink-200">
                    ✦
                  </span>
                  Movies worth remembering
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="grid size-7 place-items-center rounded-lg border border-white/8 bg-white/[0.035] text-violet-200">
                    ▶
                  </span>
                  Series worth staying up for
                </span>
              </div>
            </div>

            <div
              aria-label="Featured titles from the current collection"
              className="relative mx-4 mb-5 min-h-75 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0c12] sm:mx-8 sm:mb-8 sm:min-h-100 lg:mx-5 lg:my-8 lg:mr-8 lg:min-h-127.5 xl:mr-10"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_54%_48%,rgba(139,92,246,0.18),transparent_54%),linear-gradient(145deg,rgba(236,72,153,0.07),transparent_46%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.13] bg-[linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-size-[46px_46px] mask-[linear-gradient(to_bottom,black,transparent_88%)]"
              />

              {spotlightMovies.length > 0 ? (
                spotlightMovies.map((movie, index) => (
                  <div
                    key={movie.imdbID}
                    className={`absolute overflow-hidden rounded-2xl border border-white/15 bg-slate-800 shadow-[0_28px_65px_-24px_rgba(0,0,0,0.95)] transition duration-500 hover:z-40 hover:scale-[1.03] sm:rounded-3xl ${
                      spotlightPositions[index]
                    }`}
                  >
                    <img
                      src={movie.Poster}
                      alt={`${movie.Title} poster`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/5 to-black/10" />
                    <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4">
                      <p className="truncate text-[10px] font-bold uppercase tracking-[0.15em] text-pink-200 sm:text-xs">
                        {movie.Year}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs font-bold leading-tight text-white sm:text-base">
                        {movie.Title}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 grid place-items-center"
                >
                  <div className="relative grid size-48 place-items-center rounded-full border border-white/10 bg-white/2.5 shadow-[0_0_100px_-24px_rgba(217,70,239,0.45)] sm:size-64">
                    <div className="absolute inset-5 rounded-full border border-dashed border-pink-200/20" />
                    <div className="grid size-28 place-items-center rounded-full border border-white/10 bg-linear-to-br from-pink-500/20 to-violet-500/20 text-5xl text-pink-100 shadow-2xl sm:size-36 sm:text-6xl">
                      ✦
                    </div>
                  </div>
                </div>
              )}

              <div className="absolute left-3 top-3 z-40 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white/80 shadow-xl backdrop-blur-xl sm:left-5 sm:top-5 sm:text-[10px]">
                <span className="size-1.5 rounded-full bg-pink-300 shadow-[0_0_10px_rgba(249,168,212,0.9)]" />
                A little inspiration
              </div>
              <div className="absolute bottom-3 left-3 z-40 max-w-[55%] rounded-2xl border border-white/10 bg-black/40 px-3 py-2.5 backdrop-blur-xl sm:bottom-5 sm:left-5 sm:px-4 sm:py-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">
                  Settle in
                </p>
                <p className="mt-1 text-xs font-semibold text-white sm:text-sm">
                  Your next story starts here
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={resultsRef}
          aria-labelledby="movie-results-heading"
          className="scroll-mt-6 pt-12 sm:pt-16"
        >
          <div className="mb-7 flex flex-col gap-4 border-b border-white/8 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-pink-300 sm:text-xs">
                The good stuff starts here
              </p>
              <h2
                id="movie-results-heading"
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                {activeQuery ? `Results for “${activeQuery}”` : filterLabel}
              </h2>
            </div>
            {!loading && movies.length > 0 && (
              <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-medium text-slate-400">
                {totalResults > 0
                  ? `${totalResults.toLocaleString()} titles · Page ${page} of ${totalPages}`
                  : `${movies.length} ${movies.length === 1 ? "title" : "titles"} · Page ${page}`}
              </span>
            )}
          </div>

          {error && (
            <div
              role="alert"
              className="mb-6 rounded-2xl border border-rose-400/20 bg-rose-400/6 px-5 py-4 text-sm text-rose-200"
            >
              <span className="mr-2 font-semibold">Couldn’t load titles.</span>
              {error}
            </div>
          )}

          {loading ? (
            <div
              aria-label="Loading movies"
              aria-live="polite"
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {Array.from({ length: 8 }, (_, index) => (
                <div
                  key={index}
                  className="aspect-2/3 animate-pulse rounded-2xl border border-white/10 bg-linear-to-br from-slate-800 to-slate-900"
                />
              ))}
            </div>
          ) : movies.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  id={movie.imdbID}
                  title={movie.Title}
                  poster={movie.Poster}
                  year={movie.Year}
                />
              ))}
            </div>
          ) : !error ? (
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/2 px-6 py-14 text-center">
              <span
                aria-hidden="true"
                className="mx-auto grid size-14 place-items-center rounded-2xl border border-white/10 bg-white/4 text-2xl text-pink-300"
              >
                ✦
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">
                Your next watch is out there
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                Try searching for a title above, or use the navigation to explore movies, series, and genres.
              </p>
            </div>
          ) : null}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="mt-12 flex flex-wrap items-center justify-center gap-2"
            >
              <button
                type="button"
                onClick={() => goToPage(page - 1)}
                disabled={page === 1 || loading}
                className={`${pageButtonBase} border-white/10 bg-white/4 text-slate-200 hover:border-pink-300/30 hover:bg-white/8`}
              >
                ← Prev
              </button>

              {pageNumbers.map((p, i) =>
                p === "..." ? (
                  <span
                    key={`dots-${i}`}
                    className="px-1 text-slate-500"
                    aria-hidden="true"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    onClick={() => goToPage(p)}
                    disabled={loading}
                    aria-current={p === page ? "page" : undefined}
                    className={`${pageButtonBase} ${
                      p === page
                        ? "border-transparent bg-linear-to-r from-pink-500 to-violet-500 text-white shadow-lg shadow-pink-950/30"
                        : "border-white/10 bg-white/4 text-slate-300 hover:border-pink-300/30 hover:bg-white/8"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages || loading}
                className={`${pageButtonBase} border-white/10 bg-white/4 text-slate-200 hover:border-pink-300/30 hover:bg-white/8`}
              >
                Next →
              </button>
            </nav>
          )}
        </section>
      </div>
    </main>
  );
}