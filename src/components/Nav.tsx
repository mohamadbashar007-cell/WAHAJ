import { useEffect, useRef, useState } from 'react'
import { Starburst } from './Starburst'
import { assetPath, routeHref } from '../lib/paths'
import { useLanguage } from '../lib/language'

const links = [['WORK', '/work'], ['DEVELOPMENT', '/development'], ['DESIGN + MOTION', '/design']]

export function Nav() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)
  const { language, toggleLanguage } = useLanguage()
  const path = window.location.pathname
  const close = (restore = false) => { setOpen(false); if (restore) requestAnimationFrame(() => buttonRef.current?.focus()) }

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (open) requestAnimationFrame(() => menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus())
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) close(true) }
    window.addEventListener('keydown', escape)
    return () => { document.body.classList.remove('menu-open'); window.removeEventListener('keydown', escape) }
  }, [open])

  return (
    <header className="site-header">
      <a className="nav-brand" href={routeHref('/')} aria-label="WAHAJ home"><img src={assetPath('/wahaj-logo-optimized.png')} alt="WAHAJ" width="124" height="97" /></a>
      <nav ref={menuRef} id="site-menu" className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation" aria-hidden={!open && undefined}>
        {links.map(([label, href]) => <a key={href} href={href} aria-current={path === href ? 'page' : undefined} onClick={() => close()} tabIndex={!open && matchMedia('(max-width: 900px)').matches ? -1 : undefined}>{label}</a>)}
        <a className="nav-cta" href={routeHref('/contact')} aria-current={path === '/contact' ? 'page' : undefined} onClick={() => close()}>{language === 'ar' ? 'ابدأ مشروعاً' : 'START A PROJECT'} <span>↗</span></a>
      </nav>
      <div className="nav-actions">
        <button className="language-button" type="button" onClick={toggleLanguage} aria-label={language === 'en' ? 'عرض الموقع بالعربية' : 'View site in English'}>{language === 'en' ? 'عربي' : 'EN'}</button>
        <button ref={buttonRef} className="menu-button" type="button" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}><span>{open ? 'CLOSE' : 'MENU'}</span><Starburst className="menu-mark" /></button>
      </div>
    </header>
  )
}
