import { Link, useLocation } from 'react-router-dom'
import { Film, Home, List } from 'lucide-react'

export default function Navbar() {
  const { pathname } = useLocation()
  const linkClass = (path) => `inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
    pathname === path ? 'bg-blue-600 text-white' : 'text-blue-100 hover:bg-blue-500/20'
  }`

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-slate-900/70 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-white font-semibold">
          <Film className="w-6 h-6 text-blue-400" />
          StreamBox
        </Link>
        <nav className="flex items-center gap-2">
          <Link to="/" className={linkClass('/')}> <Home className="w-4 h-4"/> Home</Link>
          <Link to="/watchlist" className={linkClass('/watchlist')}> <List className="w-4 h-4"/> Watchlist</Link>
          <Link to="/test" className={linkClass('/test')}>Test</Link>
        </nav>
      </div>
    </header>
  )
}
