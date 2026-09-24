import { useEffect, useRef } from 'react'
import { assetPath } from '../lib/paths'
import { useLocale } from '../lib/i18n'

type MotionReelProps = {
  source?: string
  poster?: string
  label?: string
  ariaLabel?: string
  variant?: 'brand' | 'durra'
}

export function MotionReel({
  source = '/projects/motion/wahaj-brand-motion.mp4',
  poster = '/projects/motion/wahaj-brand-motion-poster.png',
  label,
  ariaLabel,
  variant = 'brand',
}: MotionReelProps) {
  const { t } = useLocale()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPlayback = () => {
      if (reducedMotion.matches) {
        video.pause()
        return
      }
      void video.play().catch(() => {})
    }

    syncPlayback()
    reducedMotion.addEventListener('change', syncPlayback)
    return () => {
      reducedMotion.removeEventListener('change', syncPlayback)
      video.pause()
    }
  }, [])

  return (
    <div className={`motion-reel motion-reel--${variant} reveal`}>
      <video
        ref={videoRef}
        className="motion-video"
        muted
        loop
        playsInline
        preload="metadata"
        poster={assetPath(poster)}
        aria-label={ariaLabel || t('WAHAJ brand motion reel', 'فيديو موشن لهوية وهج')}
      >
        <source src={assetPath(source)} type="video/mp4" />
      </video>
      <div className="motion-reel-caption">
        <span>{label || t('01 / WAHAJ — BRAND MOTION', '01 / وهج — موشن الهوية')}</span>
      </div>
    </div>
  )
}
