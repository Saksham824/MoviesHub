import { Link } from "react-router-dom";

const FALLBACK_POSTER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450">
      <rect width="300" height="450" fill="#1e293b"/>
      <text x="150" y="225" fill="#64748b" font-family="sans-serif" font-size="18" text-anchor="middle">No Image</text>
    </svg>`
  );

export default function MovieCard({ id, title, poster, year }) {
  const posterSource = poster && poster !== "N/A" ? poster : FALLBACK_POSTER;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1.5 hover:border-pink-300/30 hover:shadow-2xl hover:shadow-pink-950/20">
      <Link
        to={`/movie/${id}`}
        aria-label={`View details for ${title}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300"
      />

      <div className="relative aspect-2/3 overflow-hidden bg-slate-800">
        <img
          src={posterSource}
          alt={`${title} poster`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_POSTER;
          }}
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/10 to-transparent opacity-90" />

        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-slate-950/70 px-2.5 py-1 text-xs font-medium text-slate-200 shadow-lg backdrop-blur-md">
          MovieHub pick
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-pink-300">
            {year}
          </p>
          <h2 className="line-clamp-2 text-lg font-bold leading-snug text-white transition-colors group-hover:text-pink-100 sm:text-xl">
            {title}
          </h2>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition group-hover:gap-3 group-hover:text-pink-200">
            View details
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </article>
  );
}