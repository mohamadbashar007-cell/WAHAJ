import { Link } from './Link'
﻿import { useEffect, useRef, useState } from 'react'
import { Starburst } from './Starburst'
import { assetPath } from '../lib/paths'
import { useLanguage } from '../lib/language'
export function Nav() {
  const [open, setOpen] = useState(false)
  const [mobile, setMobile] = useState(() => matchMedia('(max-width: 900px)').matches)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLElement>(null)
  const { language, toggleLanguage } = useLanguage()
  const ar = language === 'ar'
  const path = window.location.pathname.replace(/^\/ar(?=\/|$)/, '') || '/'
  const close = (restore = true) => { setOpen(false); if (restore) buttonRef.current?.focus() }
  useEffect(() => {
    const media = matchMedia('(max-width: 900px)')
    const resize = () => { setMobile(media.matches); setOpen(false) }
    const navigate = () => setOpen(false)
    media.addEventListener('change', resize); window.addEventListener('wahaj:navigate', navigate)
    return () => { media.removeEventListener('change', resize); window.removeEventListener('wahaj:navigate', navigate) }
  }, [])
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    const main = document.getElementById('main-content'), footer = document.querySelector('footer')
    if (main) main.inert = open
    if (footer) footer.inert = open
    if (open) menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    const keyboard = (event: KeyboardEvent) => {
      if (!open) return
      if (event.key === 'Escape') { event.preventDefault(); close() }
      if (event.key === 'Tab') {
        const items = [...headerRef.current!.querySelectorAll<HTMLElement>('a[href],button')].filter(el => !el.closest('[inert]'))
        const first = items[0], last = items[items.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', keyboard)
    return () => { document.body.classList.remove('menu-open'); if (main) main.inert = false; if (footer) footer.inert = false; window.removeEventListener('keydown', keyboard) }
  }, [open])
  const links = [[ar ? 'الرئيسية' : 'HOME', '/'], [ar ? 'الأعمال' : 'SELECTED WORK', '/#work'], [ar ? 'التطوير' : 'DEVELOPMENT', '/development'], [ar ? 'التصميم والموشن' : 'DESIGN + MOTION', '/design']]
  return <header ref={headerRef} className="site-header">
    <Link className="nav-brand" href="/" aria-label={ar ? 'وهج — الرئيسية' : 'WAHAJ home'} onClick={() => close(false)}><img src={assetPath('/wahaj-logo.svg')} alt="WAHAJ" width="124" height="97" /></Link>
    <nav ref={menuRef} id="site-menu" className={open ? 'nav-links is-open' : 'nav-links'} aria-label={ar ? 'القائمة الرئيسية' : 'Primary navigation'} inert={mobile && !open}>
      {links.map(([label, href]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined} onClick={() => close(false)}>{label}</Link>)}
      <Link className="nav-cta" href="/contact" aria-current={path === '/contact' ? 'page' : undefined} onClick={() => close(false)}>{ar ? 'ابدأ مشروعاً' : 'START A PROJECT'} <span aria-hidden="true">↗</span></Link>
    </nav>
    <div className="nav-actions"><button className="language-button" type="button" onClick={toggleLanguage} aria-label={ar ? 'View site in English' : 'عرض الموقع بالعربية'}>{ar ? 'EN' : 'عربي'}</button><button ref={buttonRef} className="menu-button" type="button" aria-expanded={open} aria-controls="site-menu" onClick={() => open ? close() : setOpen(true)}><span>{open ? (ar ? 'إغلاق' : 'CLOSE') : (ar ? 'القائمة' : 'MENU')}</span><Starburst className="menu-mark" /></button></div>
  </header>
}
