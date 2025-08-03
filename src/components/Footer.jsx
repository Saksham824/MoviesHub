// components/Footer.jsx
import { Link } from "react-router-dom";

const genres = [
  "Action",
  "Horror",
  "Adventure",
  "Comedy",
  "Romance",
  "Sci-Fi",
];

export default function Footer({ setFilter }) {
  return (
    <footer className="backdrop-blur-md bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 border-t border-slate-700/50 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-2xl tracking-wide"
          >
            <span
              className="text-pink-500"
              style={{
                textShadow: "0 0 8px #e11d48, 0 0 16px #e11d48",
              }}
              role="img"
              aria-label="movie"
            >
              🎬
            </span>
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
              MovieHub
            </span>
          </Link>
          <p className="text-slate-400 text-sm max-w-xs text-center md:text-left">
            Download your favorite movies and series in high quality. Fast, free, and secure.
          </p>
          {/* Socials */}
          <div className="flex gap-4 mt-2">
            {/* ...social icons as before... */}
          </div>
        </div>

        {/* Quick Links & Genres */}
        <div className="flex flex-col sm:flex-row gap-8 text-center md:text-left">
          <div>
            <h3 className="text-slate-300 font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="hover:text-pink-400 transition">Home</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-pink-400 transition">Movies</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-pink-400 transition">Series</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-pink-400 transition">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-300 font-semibold mb-2">Genres</h3>
            <ul className="space-y-1">
              {genres.map((genre) => (
                <li key={genre}>
                  {/* Use a button or Link with onClick to set the filter */}
                  <a
                    href="#"
                    className="hover:text-pink-400 transition cursor-pointer"
                    onClick={e => {
                      e.preventDefault();
                      setFilter({ type: "genre", value: genre });
                      window.scrollTo({ top: 0, behavior: "smooth" }); // Optional: scroll to top
                    }}
                  >
                    {genre}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-slate-700/50 py-4 text-center text-slate-500 text-sm bg-slate-900/80">
        &copy; {new Date().getFullYear()} MovieHub. All rights reserved.
      </div>
    </footer>
  );
}