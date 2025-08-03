import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = "22de56f0";

// Some popular/random keywords or titles
const RANDOM_KEYWORDS = [
  "Avengers",
  "Batman",
  "Harry Potter",
  "Star Wars",
  "Spider-Man",
  "Inception",
  "Matrix",
  "Jurassic",
  "Mission Impossible",
  "Pirates"
];

export default function Home({ filter }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch random movies on first load
  useEffect(() => {
    if (!filter || filter.type === "all") {
      fetchRandomMovies();
    }
    // eslint-disable-next-line
  }, []);

  // Fetch movies when filter changes
  useEffect(() => {
    if (!filter) return;
    if (filter.type === "all") {
      fetchRandomMovies();
      return;
    }
    let searchTerm = "batman"; // fallback
    let type = "";
    if (filter.type === "type") {
      type = filter.value;
    }
    fetchMovies(searchTerm, type, filter);
    // eslint-disable-next-line
  }, [filter]);

  // Fetch movies by search bar
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No movies found");
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
    }

    setLoading(false);
  };

  // Helper to fetch and filter movies by type/genre
  const fetchMovies = async (searchTerm, type, filter) => {
    setLoading(true);
    setError("");
    setMovies([]);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}${type ? `&type=${type}` : ""}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        let results = data.Search;

        // If filtering by genre, fetch details for each movie and filter
        if (filter.type === "genre") {
          const detailed = await Promise.all(
            results.map(async (movie) => {
              const res = await fetch(
                `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
              );
              return await res.json();
            })
          );
          results = detailed.filter(
            (movie) =>
              movie.Genre &&
              movie.Genre.toLowerCase().includes(filter.value.toLowerCase())
          );
        }

        setMovies(results);
      } else {
        setError(data.Error || "No movies found");
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
    }
    setLoading(false);
  };

  // Fetch random movies using random keywords
  const fetchRandomMovies = async () => {
    setLoading(true);
    setError("");
    setMovies([]);
    try {
      // Pick 3 random keywords
      const keywords = RANDOM_KEYWORDS.sort(() => 0.5 - Math.random()).slice(0, 3);
      let allResults = [];
      for (let keyword of keywords) {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(keyword)}`
        );
        const data = await response.json();
        if (data.Response === "True") {
          allResults = allResults.concat(data.Search);
        }
      }
      // Remove duplicates by imdbID
      const unique = {};
      allResults.forEach((m) => (unique[m.imdbID] = m));
      setMovies(Object.values(unique).slice(0, 12)); // Show up to 12
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-2">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-pink-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent drop-shadow-glow">
          🎬 Movie Downloader
        </h1>
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 mb-10 items-center justify-center"
        >
          <input
            className="w-full sm:w-96 px-4 py-2 rounded-xl bg-slate-800/70 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-400 text-slate-100 placeholder:text-slate-400 shadow-lg backdrop-blur-md transition"
            placeholder="Search for movies or series..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-blue-500 text-white shadow-lg hover:scale-105 hover:from-pink-600 hover:to-blue-600 transition-all duration-200"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && (
          <div className="text-center text-red-400 mb-6">{error}</div>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {movies.length === 0 && !loading && !error ? (
            <div className="col-span-full text-center text-slate-400 text-lg py-12">
              Try searching for a movie or select a filter from the navbar.
            </div>
          ) : (
            movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                id={movie.imdbID}
                title={movie.Title}
                poster={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
                year={movie.Year}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}