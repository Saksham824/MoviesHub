import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const genres = ["Action", "Horror", "Adventure", "Comedy", "Romance", "Sci-Fi"];

const navLinkClass =
  "rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition duration-200 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400";

const Navbar = ({ setFilter }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [genresOpen, setGenresOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen && !genresOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setGenresOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, genresOpen]);

  const selectFilter = (filter) => {
    setFilter(filter);
    setMenuOpen(false);
    setGenresOpen(false);
  };

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 border-b border-white/8 bg-slate-950/85 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rose-400/70 to-transparent" />

      <div className="mx-auto flex h-19 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={() => selectFilter({ type: "all" })}
          className="group flex shrink-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          aria-label="MovieHub home"
        >
          <span className="relative grid h-11 w-11 place-items-center rounded-2xl border border-rose-300/20 bg-linear-to-br from-rose-500/20 to-fuchsia-500/10 text-rose-300 shadow-[0_0_30px_-12px_rgba(244,63,94,0.8)] transition duration-300 group-hover:scale-105 group-hover:border-rose-300/40">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6"
            >
              <path
                d="M4 7.5h16v12H4zM4 7.5l3-4 3 4 3-4 3 4 3-4 2 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M10 11v5l4-2.5-4-2.5Z" fill="currentColor" />
            </svg>
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[19px] font-black tracking-tight text-white">
              Movie<span className="text-rose-400">Hub</span>
            </span>
            <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Your movie universe
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/6 bg-white/2.5 p-1 md:flex">
          <Link
            to="/"
            onClick={() => selectFilter({ type: "all" })}
            className={navLinkClass}
          >
            Home
          </Link>
          <button
            type="button"
            onClick={() => selectFilter({ type: "type", value: "movie" })}
            className={navLinkClass}
          >
            Movies
          </button>

          <div className="relative">
            <button
              type="button"
              aria-expanded={genresOpen}
              aria-haspopup="true"
              onClick={() => setGenresOpen((open) => !open)}
              className={`${navLinkClass} flex items-center gap-2`}
            >
              Genres
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  genresOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  d="m5 7.5 5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              className={`absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-900/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl transition duration-200 ${
                genresOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
            >
              <div className="mb-2 px-2 pt-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">
                  Browse by mood
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Find your next favorite
                </p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() =>
                      selectFilter({ type: "genre", value: genre })
                    }
                    className="rounded-xl px-3 py-2.5 text-left text-sm text-slate-300 transition hover:bg-rose-400/10 hover:text-rose-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => selectFilter({ type: "type", value: "series" })}
            className={navLinkClass}
          >
            Series
          </button>
          <Link to="/contact" className={navLinkClass}>
            Contact
          </Link>
        </div>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <span className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            Find something great
          </span>
          <Link
            to="/"
            onClick={() => selectFilter({ type: "all" })}
            className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-rose-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-950/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-rose-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Explore films
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M4 10h12m-5-5 5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <button
          type="button"
          className="relative z-50 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/4 text-slate-200 transition hover:border-rose-300/30 hover:bg-rose-400/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 md:hidden"
          onClick={() => {
            setMenuOpen((open) => !open);
            setGenresOpen(false);
          }}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span className="relative flex h-4 w-5 flex-col justify-between">
            <span
              className={`h-0.5 w-full rounded-full bg-current transition duration-200 ${
                menuOpen ? "translate-y-1.75 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full rounded-full bg-current transition duration-200 ${
                menuOpen ? "scale-x-0 opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full rounded-full bg-current transition duration-200 ${
                menuOpen ? "-translate-y-1.7 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        aria-hidden="true"
        className={`fixed inset-x-0 bottom-0 top-19 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-200 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => {
          setMenuOpen(false);
          setGenresOpen(false);
        }}
      />

      <div
        id="mobile-navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`absolute left-3 right-3 top-[calc(100%+0.65rem)] z-50 origin-top rounded-3xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl shadow-black/50 backdrop-blur-2xl transition duration-200 md:hidden ${
          menuOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-2 scale-[0.98] opacity-0"
        }`}
      >
        <div className="mb-2 rounded-2xl border border-rose-300/10 bg-linear-to-r from-rose-500/10 to-fuchsia-500/5 px-4 py-3">
          <p className="text-sm font-semibold text-white">What are you in the mood for?</p>
          <p className="mt-1 text-xs text-slate-400">
            Explore movies, series, and more.
          </p>
        </div>
        <div className="grid gap-1">
          <Link
            to="/"
            onClick={() => selectFilter({ type: "all" })}
            className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/6 hover:text-white"
          >
            Home
          </Link>
          <button
            type="button"
            onClick={() => selectFilter({ type: "type", value: "movie" })}
            className="rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-200 transition hover:bg-white/6 hover:text-white"
          >
            Movies
          </button>
          <div>
            <button
              type="button"
              aria-expanded={genresOpen}
              onClick={() => setGenresOpen((open) => !open)}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-200 transition hover:bg-white/6 hover:text-white"
            >
              Genres
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                  genresOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  d="m5 7.5 5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              className={`grid grid-cols-2 gap-1 overflow-hidden px-2 transition-all duration-200 ${
                genresOpen
                  ? "mt-1 max-h-40 pb-2 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => selectFilter({ type: "genre", value: genre })}
                  tabIndex={genresOpen ? 0 : -1}
                  className="rounded-lg px-3 py-2 text-left text-sm text-slate-400 transition hover:bg-rose-400/10 hover:text-rose-200"
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => selectFilter({ type: "type", value: "series" })}
            className="rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-200 transition hover:bg-white/6 hover:text-white"
          >
            Series
          </button>
          <Link
            to="/contact"
            onClick={() => {
              setMenuOpen(false);
              setGenresOpen(false);
            }}
            className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/6 hover:text-white"
          >
            Contact
          </Link>
        </div>
        <Link
          to="/"
          onClick={() => selectFilter({ type: "all" })}
          className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-rose-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-950/30 transition hover:brightness-110"
        >
          Explore films
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="h-4 w-4"
          >
            <path
              d="M4 10h12m-5-5 5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
