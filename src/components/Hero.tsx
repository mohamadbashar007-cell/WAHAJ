import { useEffect, useRef } from 'react'
import { Starburst } from './Starburst'
import { assetPath, routeHref } from '../lib/paths'

export function Hero() {
  const hero = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = hero.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / innerWidth - 0.5) * 18
      const y = (event.clientY / innerHeight - 0.5) * 18
      el.style.setProperty('--hero-x', `${x}px`)
      el.style.setProperty('--hero-y', `${y}px`)
    }
    addEventListener('pointermove', onMove, { passive: true })
    return () => removeEventListener('pointermove', onMove)
  }, [])

  return (
    <section id="top" className="hero" ref={hero} aria-labelledby="hero-title">
      <div className="hero-meta reveal">
        <span>INDEPENDENT CREATIVE COMPANY</span>
        <span>CAIRO / WORKING EVERYWHERE</span>
      </div>
      <h1 id="hero-title" className="hero-title">
        <span className="hero-line line-one"><i>WE</i><i>MAKE</i></span>
        <span className="hero-line line-two"><i>BRANDS</i></span>
        <span className="hero-line line-three"><i>GLOW.</i><Starburst className="hero-burst" label="WAHAJ spark" /></span>
      </h1>
      <a className="hero-feature" href={routeHref('/work')} data-cursor="VIEW" aria-label="View selected work">
        <img src={assetPath('/projects/wesal.png')} alt="Wesal digital experience, a selected WAHAJ project" />
        <span><b>FEATURED / 01</b><em>WESAL — BRAND + DIGITAL</em></span>
        <i>↗</i>
      </a>
      <div className="hero-bottom reveal">
        <p>WE TURN CLEAR IDEAS INTO<br />VISIBLE, MEMORABLE EXPERIENCES.</p>
        <a href="#work" className="scroll-link" data-cursor="SCROLL">
          <span>SCROLL TO IGNITE</span><i>↓</i>
        </a>
      </div>
      <span className="hero-index" aria-hidden="true">01</span>
    </section>
  )
}
