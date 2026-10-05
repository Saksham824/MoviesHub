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

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(190,24,93,0.18),transparent_42%),radial-gradient(ellipse_at_90%_40%,rgba(79,70,229,0.12),transparent_35%)]"
      />

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 sm:pt-16 lg:px-10">
        <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-slate-900/60 px-6 py-12 shadow-2xl shadow-black/20 backdrop-blur-sm sm:px-10 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-36 size-96 rounded-full bg-pink-500/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-300/20 bg-pink-300/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-pink-200">
              <span aria-hidden="true" className="text-sm">✦</span>
              Your next favorite is waiting
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Stories worth
              <span className="block bg-linear-to-r from-pink-300 via-fuchsia-300 to-blue-300 bg-clip-text text-transparent">
                staying in for.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Find your next movie night favorite. Search the collection, explore a genre, and settle in for a great story.
            </p>

            <form
              onSubmit={handleSearch}
              role="search"
              className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl sm:flex-row"
            >
              <label htmlFor="movie-search" className="sr-only">
                Search movies and series
              </label>
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <span aria-hidden="true" className="text-xl text-slate-500">
                  ⌕
                </span>
                <input
                  id="movie-search"
                  type="search"
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
                  placeholder="Search movies, series, or a favorite actor..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-pink-500 to-violet-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-950/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-950/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300 disabled:cursor-wait disabled:opacity-70"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Searching
                  </>
                ) : (
                  <>
                    Search titles
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </form>
            <p className="mt-4 text-xs text-slate-500">
              A universe of stories, one search away.
            </p>
          </div>
        </section>

        <section
          ref={resultsRef}
          aria-labelledby="movie-results-heading"
          className="scroll-mt-6 pt-14 sm:pt-16"
        >
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-pink-300">
                Curated for your next watch
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