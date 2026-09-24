import { useEffect, useRef } from 'react'
import { Starburst } from './Starburst'
import { useLocale } from '../lib/i18n'

export function Hero() {
  const { isArabic, t, href } = useLocale()
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
        <span>{t('INDEPENDENT CREATIVE COMPANY', 'شركة إبداعية مستقلة')}</span>
        <span>{t('CAIRO / WORKING EVERYWHERE', 'القاهرة / نعمل في كل مكان')}</span>
      </div>
      <h1 id="hero-title" className="hero-title">
        <span className="hero-line hero-opening"><i>{t('WE MAKE', 'نصنع')}</i><Starburst className="hero-burst" /></span>
        <span className="hero-line hero-statement"><i>{t('BRANDS', 'علامات')}</i><i className="hero-glow">{t('GLOW.', 'تتوهّج.')}</i></span>
      </h1>
      <div className="hero-bottom reveal">
        <p>{t(<>Brand identities, websites, web applications and mobile apps.<br />Designed and developed by one team.</>, <>هويات بصرية، ومواقع، وتطبيقات ويب وموبايل.<br />نصمّمها ونطوّرها كفريق واحد.</>)}</p>
        <div className="hero-actions">
          <a href={href('/contact/')} className="hero-cta" data-cursor={isArabic ? 'ابدأ' : 'LET’S GO'}>{t('START A PROJECT', 'ابدأ مشروعًا')} <span>↗</span></a>
          <a href={href('/?section=work')} className="scroll-link" data-cursor={isArabic ? 'تصفّح' : 'SCROLL'}><span>{t('EXPLORE OUR WORK', 'تصفّح أعمالنا')}</span><i>↓</i></a>
        </div>
      </div>
      <span className="hero-index" aria-hidden="true">01</span>
    </section>
  )
}
