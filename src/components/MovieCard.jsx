import { useState } from "react";
import { Link } from "react-router-dom";

const FALLBACK_POSTER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">
      <defs>
        <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#171923"/>
          <stop offset="1" stop-color="#090a0f"/>
        </linearGradient>
      </defs>
      <rect width="600" height="900" fill="url(#background)"/>
      <circle cx="300" cy="390" r="92" fill="#ffffff" fill-opacity=".035"/>
      <path d="M280 345v90l75-45-75-45Z" fill="#f9a8d4" fill-opacity=".65"/>
      <text x="300" y="540" fill="#94a3b8" font-family="sans-serif" font-size="24" letter-spacing="3" text-anchor="middle">NO POSTER</text>
    </svg>`
  );

export default function MovieCard({ id, title, poster, year }) {
  const [posterFailed, setPosterFailed] = useState(false);
  const displayTitle = title?.trim() || "Untitled";
  const hasPoster = poster?.trim() && poster.trim().toUpperCase() !== "N/A";
  const posterSource = hasPoster && !posterFailed ? poster : FALLBACK_POSTER;
  const displayYear = year && year !== "N/A" ? year : null;

  return (
    <article className="group relative h-full">
      <Link
        to={`/movie/${id}`}
        aria-label={`View details for ${displayTitle}`}
        className="relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-[#101117] shadow-[0_18px_50px_-28px_rgba(0,0,0,0.9)] transition duration-300 hover:-translate-y-1.5 hover:border-pink-300/30 hover:shadow-[0_28px_65px_-28px_rgba(190,24,93,0.38)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300 motion-reduce:transform-none motion-reduce:transition-none"
      >
        <div className="relative aspect-2/3 overflow-hidden bg-slate-900">
          <img
            src={posterSource}
            alt={`${displayTitle} poster`}
            loading="lazy"
            decoding="async"
            onError={() => setPosterFailed(true)}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-[#090a0f] via-[#090a0f]/15 to-black/10"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/50 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100"
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3 sm:p-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white/90 shadow-lg backdrop-blur-md sm:text-[10px]">
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                className="size-3 text-pink-300"
              >
                <path
                  d="m8 1.5 1.55 4.95L14.5 8l-4.95 1.55L8 14.5l-1.55-4.95L1.5 8l4.95-1.55L8 1.5Z"
                  fill="currentColor"
                />
              </svg>
              Discover
            </span>
            {displayYear && (
              <span className="rounded-full border border-white/15 bg-black/45 px-2.5 py-1.5 text-[10px] font-semibold tabular-nums text-white/90 shadow-lg backdrop-blur-md sm:text-xs">
                {displayYear}
              </span>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.22em] text-pink-300 sm:text-[10px]">
              MovieHub collection
            </p>
            <h2 className="line-clamp-2 text-lg font-bold leading-snug tracking-tight text-white transition-colors duration-200 group-hover:text-pink-100 sm:text-xl">
              {displayTitle}
            </h2>
            <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white/75 transition duration-200 group-hover:gap-3 group-hover:text-white sm:text-sm">
              Explore title
              <span
                aria-hidden="true"
                className="grid size-7 place-items-center rounded-full border border-white/15 bg-white/5 text-sm transition duration-200 group-hover:border-pink-300/40 group-hover:bg-pink-300/15 group-hover:text-pink-100"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
