import { Link } from "react-router-dom";

export default function MovieCard({ id, title, poster, year }) {
  return (
    <div className="bg-slate-800/80 rounded-2xl shadow-2xl border border-slate-700/60 p-4 flex flex-col items-center hover:scale-105 transition duration-200">
      <img
        src={poster !== "N/A" ? poster : "https://via.placeholder.com/300x450?text=No+Image"}
        alt={title}
        className="w-full h-64 object-cover rounded-xl mb-4"
      />
      <h2 className="text-xl font-bold mb-1 text-pink-400 text-center">{title}</h2>
      <p className="text-slate-400 mb-3 text-sm">{year}</p>

      <div className="flex flex-col gap-2 w-full">
        <Link
          to={`/movie/${id}`}
          className="w-full px-4 py-2 text-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          View Details
        </Link>
        <Link
          href="https://example.com/download.mp4" // replace with real if you have
          download
          className="w-full px-4 py-2 text-center rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
        >
          Download
        </Link>
      </div>
    </div>
  );
}
