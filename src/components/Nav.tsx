import { useEffect, useRef, useState } from 'react'
import { Starburst } from './Starburst'
import { assetPath } from '../lib/paths'
import { localeHref, useLocale } from '../lib/i18n'

export function Nav({ path }: { path: string }) {
  const { isArabic, t, href } = useLocale()
  const [open, setOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => { setOpen(false) }, [path])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  const links = [
    [t('WORK', 'الأعمال'), '/?section=work'],
    [t('DEVELOPMENT', 'التطوير'), '/development'],
    [t('DESIGN + MOTION', 'التصميم + موشن'), '/design'],
    [t('CONTACT', 'تواصل معنا'), '/contact'],
  ]
  const alternateLocale = isArabic ? 'en' : 'ar'
  const alternatePath = localeHref(`${path}${window.location.search}`, alternateLocale)

  useEffect(() => {
    if (!open) return
    const firstLink = header.current?.querySelector<HTMLAnchorElement>('nav a')
    const focusFrame = requestAnimationFrame(() => firstLink?.focus())
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); return }
      if (event.key !== 'Tab') return
      const items = Array.from(header.current?.querySelectorAll<HTMLElement>('button, nav a') || [])
      const first = items[0], last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    const media = matchMedia('(min-width: 901px)')
    const closeOnDesktop = () => { if (media.matches) setOpen(false) }
    document.addEventListener('keydown', handleKey)
    media.addEventListener('change', closeOnDesktop)
    return () => { cancelAnimationFrame(focusFrame); document.removeEventListener('keydown', handleKey); media.removeEventListener('change', closeOnDesktop) }
  }, [open])

  return (
    <header className="site-header" ref={header}>
      <a className="nav-brand" href={href('/')} aria-label={t('WAHAJ home', 'الصفحة الرئيسية لوهج')} onClick={() => setOpen(false)}>
        <span className="brand-wordmark"><img src={assetPath('/wahaj-logo.png')} alt="WAHAJ" /></span>
      </a>
      <button ref={toggle} className="menu-button" type="button" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>
        <span>{open ? t('CLOSE', 'إغلاق') : t('MENU', 'القائمة')}</span>
        <Starburst className="menu-mark" />
      </button>
      <nav id="site-menu" className={open ? 'nav-links is-open' : 'nav-links'} aria-label={t('Primary navigation', 'التنقل الرئيسي')}>
        {links.map(([label, route]) => (
          <a key={route} href={href(route)} aria-current={(route.startsWith('/?') ? path.startsWith('/work/') : path === route) ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a className="language-switch" href={alternatePath} hrefLang={alternateLocale} lang={alternateLocale} onClick={() => setOpen(false)}>{isArabic ? 'EN' : 'عربي'}</a>
        <a className="nav-cta" href={href('/contact')} aria-current={path === '/contact' ? 'page' : undefined} onClick={() => setOpen(false)}>{t('START A PROJECT', 'ابدأ مشروعًا')} <span>↗</span></a>
      </nav>
    </header>
  )
}
