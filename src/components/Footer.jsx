// components/Footer.jsx
import { Link } from "react-router-dom";

const genres = [
  { name: "Action", icon: "↗" },
  { name: "Horror", icon: "◉" },
  { name: "Adventure", icon: "⌁" },
  { name: "Comedy", icon: "✳" },
  { name: "Romance", icon: "♡" },
  { name: "Sci-Fi", icon: "✦" },
];

export default function Footer({ setFilter }) {
  const filterAndBrowse = (filter) => {
    setFilter(filter);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-slate-950 text-slate-300">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(190,24,93,0.13),transparent_38%),radial-gradient(ellipse_at_bottom_right,rgba(79,70,229,0.13),transparent_36%)]"
      />

      <div className="mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-8 lg:px-10 lg:pt-16">
        <div className="mb-12 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/4 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-pink-300">
              The next scene starts here
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Find a story worth staying in for.
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Explore movies and series, discover a new genre, and make tonight a movie night.
            </p>
          </div>
          <Link
            to="/"
            onClick={() => filterAndBrowse({ type: "all" })}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-linear-to-r from-pink-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-950/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-950/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300"
          >
            Explore the collection
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.2fr_0.8fr] lg:gap-12">
          <div>
            <Link
              to="/"
              onClick={() => filterAndBrowse({ type: "all" })}
              className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-linear-to-br from-pink-500/20 to-violet-500/20 text-xl text-pink-300 ring-1 ring-inset ring-pink-300/20 transition group-hover:scale-105 group-hover:ring-pink-300/40">
                <span role="img" aria-label="movie">
                  🎬
                </span>
              </span>
              <span className="bg-linear-to-r from-pink-300 via-fuchsia-300 to-blue-300 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
                MovieHub
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              A little inspiration for your next watch. Browse the collection and find your kind of movie night.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/6 px-3 py-1.5 text-xs font-medium text-emerald-200/90">
              <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]" />
              Made for movie lovers
            </div>
          </div>

          <nav aria-label="Explore MovieHub">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  onClick={() => filterAndBrowse({ type: "all" })}
                  className="transition-colors hover:text-pink-300 focus-visible:text-pink-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => filterAndBrowse({ type: "type", value: "movie" })}
                  className="transition-colors hover:text-pink-300 focus-visible:text-pink-300"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => filterAndBrowse({ type: "type", value: "series" })}
                  className="transition-colors hover:text-pink-300 focus-visible:text-pink-300"
                >
                  Series
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-pink-300 focus-visible:text-pink-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Browse by genre">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Browse by genre
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {genres.map((genre) => (
                <li key={genre.name}>
                  <Link
                    to="/"
                    onClick={() =>
                      filterAndBrowse({ type: "genre", value: genre.name })
                    }
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/3 px-3 py-2 text-xs text-slate-400 transition duration-200 hover:border-pink-300/30 hover:bg-pink-300/8 hover:text-pink-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
                  >
                    <span aria-hidden="true" className="text-pink-300/80">
                      {genre.icon}
                    </span>
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Get in touch
            </h3>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Have a question or a suggestion? We would love to hear from you.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-pink-300 transition hover:gap-3 hover:text-pink-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300"
            >
              Visit our contact page
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} MovieHub. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span>Made for the love of</span>
            <span aria-label="cinema" role="img" className="text-pink-300">
              cinema ✦
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
