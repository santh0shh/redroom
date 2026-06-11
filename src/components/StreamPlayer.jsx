import { useEffect, useRef, useState } from 'react'

export default function StreamPlayer({ isFullscreen, onFullscreenChange, chatOverlay }) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [viewerCount] = useState(() => 100 + Math.floor(Math.random() * 40))
  const [elapsed, setElapsed] = useState(0)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    const tick = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(tick)
  }, [])

  useEffect(() => {
    const onChange = () => onFullscreenChange(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [onFullscreenChange])

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  }

  const formatElapsed = (secs) => {
    const h = Math.floor(secs / 3600)
    const m = Math.floor((secs % 3600) / 60)
    const s = secs % 60
    return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':')
  }

  return (
    <main className="relative flex min-w-0 flex-1 flex-col bg-[#080000]">
      <div
        ref={containerRef}
        className={`relative flex flex-1 flex-col ${isFullscreen ? 'bg-black' : ''}`}
      >
        <div className="relative flex flex-1 items-center justify-center overflow-hidden">
          {videoError ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#0a0000]">
              <div className="h-16 w-16 animate-pulse rounded-full border-2 border-red-800/50 bg-red-950/30" />
              <p className="text-sm text-red-500/70">Signal loading...</p>
              <p className="text-[10px] text-red-800/50">
                Live isnt started yet
              </p>
            </div>
          ) : (
            <video
              ref={videoRef}
              className={`object-contain ${isFullscreen ? 'h-full w-full' : 'h-full max-h-[calc(100vh-2rem)] w-full'}`}
              src="/videos/stream.mp4"
              autoPlay
              loop
              muted
              playsInline
              onError={() => setVideoError(true)}
            />
          )}

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-0 right-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  Live
                </span>
                <span className="font-mono text-xs text-red-300/70">
                  {formatElapsed(elapsed)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-red-300/60">
                <span className="flex items-center gap-1">
                  <span className="text-red-500">●</span>
                  {viewerCount.toLocaleString()} watching
                </span>
              </div>
            </div>

            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,0,0,0.1)_2px,rgba(255,0,0,0.1)_4px)] opacity-[0.03]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
          </div>

          {chatOverlay}

          <div className={`absolute flex items-center justify-between ${!isFullscreen ? 'bottom-3 left-3 right-3': 'bottom-1 right-1'}`}>
            <div className="flex items-center gap-2">
              {/* <button
                type="button"
                onClick={() => {
                  if (videoRef.current?.paused) videoRef.current.play()
                  else videoRef.current?.pause()
                }}
                className="pointer-events-auto rounded border border-red-900/40 bg-black/60 px-3 py-1.5 text-[10px] uppercase tracking-wider text-red-400 backdrop-blur-sm transition hover:border-red-700 hover:text-red-300"
              >
                Play / Pause
              </button> */}
              {/* <button
                type="button"
                onClick={() => {
                  if (videoRef.current) videoRef.current.muted = !videoRef.current.muted
                }}
                className="pointer-events-auto rounded border border-red-900/40 bg-black/60 px-3 py-1.5 text-[10px] uppercase tracking-wider text-red-400 backdrop-blur-sm transition hover:border-red-700 hover:text-red-300"
              >
                Mute
              </button> */}
            </div>
            {!isFullscreen && <button
              type="button"
              onClick={toggleFullscreen}
              className={`pointer-events-auto flex items-center gap-1.5 rounded border border-red-800/50 bg-red-950/60 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-red-400 backdrop-blur-sm transition hover:border-red-500 hover:text-red-300 cursor-pointer ${isFullscreen?'px-2':'px-3'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isFullscreen ? (
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                ) : (
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                )}
              </svg>
              {isFullscreen ? '' : 'Fullscreen'}
            </button>}
          </div>
        </div>
      </div>

      {!isFullscreen && (
        <div className="border-t border-red-900/30 px-4 py-2">
          <p className="text-xs font-medium text-red-300/80">Red Room · Private Relay #7</p>
          <p className="text-[10px] text-red-700/50">Recorded session · presented as live feed</p>
        </div>
      )}
    </main>
  )
}
