// Navbar.jsx
import React, { useState } from "react";

const genres = ["Action", "Horror", "Adventure", "Comedy", "Romance", "Sci-Fi"];

const Navbar = ({ setFilter }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [genresOpen, setGenresOpen] = useState(false);

  return (
    <nav className="backdrop-blur-md bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 border-b border-slate-700/50 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 font-bold text-2xl tracking-wide relative"
        >
          <span
            className="text-pink-500 drop-shadow-glow"
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
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 items-center">
          <li>
            <a
              href="/"
              onClick={e => {
                e.preventDefault();
                setFilter({ type: "all" });
              }}
              className="relative px-3 py-1.5 rounded-md font-medium transition-all duration-200 hover:bg-pink-500/10 hover:text-pink-400 focus-visible:ring-2 ring-pink-400"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setFilter({ type: "type", value: "movie" });
              }}
              className="relative px-3 py-1.5 rounded-md font-medium transition-all duration-200 hover:bg-pink-500/10 hover:text-pink-400 focus-visible:ring-2 ring-pink-400"
            >
              Movies
            </a>
          </li>
          {/* Genres Dropdown */}
          <li className="relative group">
            <button
              className="relative px-3 py-1.5 rounded-md font-medium flex items-center gap-1 transition-all duration-200 hover:bg-pink-500/10 hover:text-pink-400 focus-visible:ring-2 ring-pink-400"
              type="button"
            >
              Genres
              <svg
                className="w-4 mt-1 h-4 ml-1 transition-transform group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <ul className="absolute left-0 mt-2 w-44 bg-slate-800/95 border border-slate-700 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 z-20 py-2 backdrop-blur-md">
              {genres.map((genre) => (
                <li key={genre}>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      setFilter({ type: "genre", value: genre });
                    }}
                    className="block px-5 py-2 rounded-lg hover:bg-pink-500/80 hover:text-white transition-all duration-150"
                  >
                    {genre}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setFilter({ type: "type", value: "series" });
              }}
              className="relative px-3 py-1.5 rounded-md font-medium transition-all duration-200 hover:bg-pink-500/10 hover:text-pink-400 focus-visible:ring-2 ring-pink-400"
            >
              Series
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="relative px-3 py-1.5 rounded-md font-medium transition-all duration-200 hover:bg-pink-500/10 hover:text-pink-400 focus-visible:ring-2 ring-pink-400"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Hamburger (with higher z-index) */}
        <button
          className="md:hidden flex flex-col gap-1.5 group z-[60]"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-7 h-0.5 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-blue-400 rounded transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-7 h-0.5 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-blue-400 rounded transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-7 h-0.5 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-blue-400 rounded transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } z-40 md:hidden`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden text-center fixed top-0 left-0 right-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 shadow-2xl transition-all duration-300 overflow-hidden z-50 ${
          menuOpen ? "max-h-[500px] py-4" : "max-h-0 py-0"
        }`}
        style={{ backdropFilter: "blur(12px)" }}
      >
        <ul className="flex flex-col gap-2 px-8">
          <li className="text-white/50">
            <a
              href="/"
              onClick={e => {
                e.preventDefault();
                setFilter({ type: "all" });
                setMenuOpen(false);
              }}
              className="block py-2 rounded-lg hover:bg-pink-500/20 hover:text-pink-400 transition-all font-medium"
            >
              Home
            </a>
          </li>
          <li className="text-white/50">
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setFilter({ type: "type", value: "movie" });
                setMenuOpen(false);
              }}
              className="block py-2 rounded-lg hover:bg-pink-500/20 hover:text-pink-400 transition-all font-medium"
            >
              Movies
            </a>
          </li>
          <li className="text-white/50">
            <button
              className="w-full justify-center flex items-center ml-2 py-2 rounded-lg hover:bg-pink-500/20 hover:text-pink-400 transition-all font-medium"
              onClick={() => setGenresOpen((prev) => !prev)}
              type="button"
            >
              Genres
              <svg
                className={`w-4 h-4 transition-transform ${
                  genresOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <ul
              className={`pl-4 transition-all duration-300 ${
                genresOpen ? "max-h-60" : "max-h-0 overflow-hidden"
              }`}
            >
              {genres.map((genre) => (
                <li key={genre}>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      setFilter({ type: "genre", value: genre });
                      setMenuOpen(false);
                      setGenresOpen(false);
                    }}
                    className="block text-white py-1 text-sm rounded hover:bg-pink-500/80 hover:text-white transition-all"
                  >
                    {genre}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li className="text-white/50">
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setFilter({ type: "type", value: "series" });
                setMenuOpen(false);
              }}
              className="block py-2 rounded-lg hover:bg-pink-500/20 hover:text-pink-400 transition-all font-medium"
            >
              Series
            </a>
          </li>
          <li className="text-white/50">
            <a
              href="/contact"
              className="block py-2 rounded-lg hover:bg-pink-500/20 hover:text-pink-400 transition-all font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;