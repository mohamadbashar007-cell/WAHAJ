import { useEffect, useRef, useState } from 'react'
import { assetPath } from '../lib/paths'

export function MotionReel() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPlayback = () => {
      if (reducedMotion.matches) {
        video.pause()
        setIsPlaying(false)
        return
      }
      void video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }

    syncPlayback()
    reducedMotion.addEventListener('change', syncPlayback)
    return () => {
      reducedMotion.removeEventListener('change', syncPlayback)
      video.pause()
    }
  }, [])

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="motion-reel reveal">
      <video
        ref={videoRef}
        className="motion-video"
        muted
        loop
        playsInline
        preload="metadata"
        poster={assetPath('/projects/optimized/creative-durra-social-hero-large.webp')}
        aria-label="Durra product campaign motion reel"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={assetPath('/projects/motion/durra-product-reel.mp4')} type="video/mp4" />
      </video>
      <div className="motion-reel-caption">
        <span>01 / DURRA — PRODUCT REEL</span>
        <button type="button" onClick={togglePlayback} aria-pressed={isPlaying}>
          {isPlaying ? 'PAUSE REEL' : 'PLAY REEL'}
        </button>
      </div>
    </div>
  )
}
