import { useEffect, useRef, useState } from 'react'
import { Starburst } from './Starburst'
import { assetPath, routeHref } from '../lib/paths'

const links = [
  ['WORK', routeHref('/?section=work')],
  ['DEVELOPMENT', routeHref('/development')],
  ['DESIGN + MOTION', routeHref('/design')],
]

export function Nav({ path }: { path: string }) {
  const [open, setOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => { setOpen(false) }, [path])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

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
      <a className="nav-brand" href={routeHref('/')} aria-label="WAHAJ home" onClick={() => setOpen(false)}>
        <span className="brand-wordmark"><img src={assetPath('/wahaj-logo.png')} alt="WAHAJ" /></span>
      </a>
      <button ref={toggle} className="menu-button" type="button" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>
        <span>{open ? 'CLOSE' : 'MENU'}</span>
        <Starburst className="menu-mark" />
      </button>
      <nav id="site-menu" className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href} aria-current={(label === 'WORK' ? path.startsWith('/work/') : href === routeHref(path)) ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a className="nav-cta" href={routeHref('/contact')} aria-current={path === '/contact' ? 'page' : undefined} onClick={() => setOpen(false)}>START A PROJECT <span>↗</span></a>
      </nav>
    </header>
  )
}
