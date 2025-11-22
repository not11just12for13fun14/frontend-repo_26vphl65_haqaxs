import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import MovieCard from './components/MovieCard'
import Player from './components/Player'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('')
  const [loading, setLoading] = useState(true)
  const [nowPlaying, setNowPlaying] = useState(null)
  const [userId, setUserId] = useState('')
  const [watchlistIds, setWatchlistIds] = useState(new Set())

  useEffect(() => {
    const id = localStorage.getItem('deviceId') || crypto.randomUUID()
    localStorage.setItem('deviceId', id)
    setUserId(id)
  }, [])

  const fetchMovies = async () => {
    setLoading(true)
    const url = new URL(baseUrl + '/api/movies')
    if (query) url.searchParams.set('q', query)
    if (genre) url.searchParams.set('genre', genre)
    const res = await fetch(url)
    const data = await res.json()
    setMovies(data)
    setLoading(false)
  }

  const fetchWatchlist = async (id) => {
    if (!id) return
    const res = await fetch(`${baseUrl}/api/watchlist/${id}`)
    const data = await res.json()
    const ids = new Set(data.map(m => m.id))
    setWatchlistIds(ids)
  }

  useEffect(() => { fetchMovies() }, [query, genre])
  useEffect(() => { fetchWatchlist(userId) }, [userId])

  const handlePlay = async (movie) => {
    setNowPlaying(movie)
    try { await fetch(`${baseUrl}/api/movies/${movie.id}/view`, { method: 'POST' }) } catch {}
  }

  const handleLike = async (movie) => {
    try { await fetch(`${baseUrl}/api/movies/${movie.id}/like`, { method: 'POST' }) } catch {}
    fetchMovies()
  }

  const handleWatchlist = async (movie) => {
    await fetch(`${baseUrl}/api/watchlist/${movie.id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: userId }) })
    fetchWatchlist(userId)
  }

  const genres = useMemo(() => {
    const g = new Set()
    movies.forEach(m => (m.genres || []).forEach(x => g.add(x)))
    return ['All', ...Array.from(g)]
  }, [movies])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-50">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="flex-1 bg-slate-800/60 border border-white/10 rounded-lg px-4 py-2 placeholder-blue-200/50 text-blue-50"
          />
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value === 'All' ? '' : e.target.value)}
            className="bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2"
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <button onClick={fetchMovies} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Refresh</button>
          <button onClick={async () => { await fetch(baseUrl + '/seed', { method: 'POST' }); fetchMovies() }} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg">Seed Demo</button>
        </div>

        {loading ? (
          <div className="text-center text-blue-200 py-20">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((m) => (
              <div key={m.id} className={watchlistIds.has(m.id) ? 'ring-2 ring-blue-500 rounded-xl' : ''}>
                <MovieCard movie={m} onPlay={handlePlay} onLike={handleLike} onWatchlist={handleWatchlist} />
              </div>
            ))}
          </div>
        )}
      </section>

      {nowPlaying && (
        <Player movie={nowPlaying} onClose={() => setNowPlaying(null)} />
      )}
    </div>
  )
}

export default App
