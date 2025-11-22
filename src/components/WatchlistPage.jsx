import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import MovieCard from './MovieCard'

export default function WatchlistPage() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [movies, setMovies] = useState([])
  const [nowPlaying, setNowPlaying] = useState(null)
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const id = localStorage.getItem('deviceId')
    setUserId(id)
  }, [])

  useEffect(() => {
    if (!userId) return
    fetch(`${baseUrl}/api/watchlist/${userId}`).then(r => r.json()).then(setMovies)
  }, [userId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-50">
      <Navbar />
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Your Watchlist</h2>
        {movies.length === 0 ? (
          <p className="text-blue-200">No items in watchlist yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((m) => (
              <MovieCard key={m.id} movie={m} onPlay={(movie)=>setNowPlaying(movie)} onLike={()=>{}} onWatchlist={()=>{}} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
