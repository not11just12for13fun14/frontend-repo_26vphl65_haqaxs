import { useEffect, useRef } from 'react'

export default function Player({ movie, onClose }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }, [movie])

  if (!movie) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h3 className="text-white font-semibold">{movie.title}</h3>
          <button onClick={onClose} className="text-blue-200 hover:text-white">Close</button>
        </div>
        <div className="bg-black">
          <video ref={videoRef} controls className="w-full aspect-video">
            <source src={movie.video_url} type="video/mp4" />
          </video>
        </div>
        <div className="p-4 text-blue-100/80 text-sm">
          {movie.description}
        </div>
      </div>
    </div>
  )
}
