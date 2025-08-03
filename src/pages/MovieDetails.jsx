import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_KEY = "22de56f0";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
      setMovie(res.data);
    };
    fetchMovie();
  }, [id]);

  if (!movie)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-white text-xl font-semibold animate-pulse">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-10 px-2 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="flex flex-col items-center">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
            alt={movie.Title}
            className="rounded-2xl shadow-xl w-full max-w-xs object-cover border-4 border-white/20"
          />
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {movie.Genre &&
              movie.Genre.split(", ").map((genre) => (
                <span
                  key={genre}
                  className="bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow"
                >
                  {genre}
                </span>
              ))}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent drop-shadow-glow">
            {movie.Title}
          </h1>
          <p className="mb-4 text-slate-200 text-base md:text-lg italic">{movie.Plot}</p>
          <div className="space-y-2 text-slate-300 text-sm md:text-base">
            <div>
              <span className="font-semibold text-pink-400">Released:</span> {movie.Released}
            </div>
            <div>
              <span className="font-semibold text-pink-400">IMDB Rating:</span>{" "}
              <span className="font-bold text-yellow-400">{movie.imdbRating}</span>
            </div>
            <div>
              <span className="font-semibold text-pink-400">Runtime:</span> {movie.Runtime}
            </div>
            <div>
              <span className="font-semibold text-pink-400">Director:</span> {movie.Director}
            </div>
            <div>
              <span className="font-semibold text-pink-400">Actors:</span> {movie.Actors}
            </div>
          </div>
          <Link
            to="https://example.com/download.mp4"
            download
            className="mt-8 text-center inline-block px-8 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-blue-500 text-white font-bold text-lg shadow-lg hover:scale-105 hover:from-pink-600 hover:to-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            ⬇️ Download Movie
          </Link>
        </div>
      </div>
    </div>
  );
}