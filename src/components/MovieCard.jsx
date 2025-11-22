import { Play, Clock, ThumbsUp } from 'lucide-react'

export default function MovieCard({ movie, onPlay, onLike, onWatchlist }) {
  return (
    <div className="group bg-slate-800/40 border border-white/10 rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img src={movie.thumbnail_url} alt={movie.title} className="w-full h-52 object-cover" />
        <button
          onClick={() => onPlay(movie)}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <span className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
            <Play className="w-4 h-4"/> Play
          </span>
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-semibold line-clamp-2">{movie.title}</h3>
          <span className="text-xs text-blue-200/70">{movie.year || ''}</span>
        </div>
        <p className="text-blue-100/70 text-sm line-clamp-2 mt-1">{movie.description}</p>
        <div className="flex items-center justify-between mt-3 text-blue-200/70 text-xs">
          <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3"/> {movie.duration_minutes || '--'}m</span>
          <span className="inline-flex items-center gap-1"><ThumbsUp className="w-3 h-3"/> {movie.likes || 0}</span>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <button onClick={() => onLike(movie)} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded">Like</button>
          <button onClick={() => onWatchlist(movie)} className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Watchlist</button>
        </div>
      </div>
    </div>
  )
}
