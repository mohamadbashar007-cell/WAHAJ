import { useEffect, useState } from 'react'
import { Starburst } from './Starburst'
import { assetPath, routeHref } from '../lib/paths'

const links = [
  ['WORK', routeHref('/work')],
  ['DEVELOPMENT', routeHref('/development')],
  ['DESIGN + MOTION', routeHref('/design')],
]

export function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  return (
    <header className="site-header">
      <a className="nav-brand" href={routeHref('/')} aria-label="WAHAJ home">
        <span className="brand-wordmark"><img src={assetPath('/wahaj-logo.png')} alt="WAHAJ" /></span>
      </a>
      <button className="menu-button" type="button" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>
        <span>{open ? 'CLOSE' : 'MENU'}</span>
        <Starburst className="menu-mark" />
      </button>
      <nav id="site-menu" className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a className="nav-cta" href={routeHref('/contact')} onClick={() => setOpen(false)}>START A PROJECT <span>↗</span></a>
      </nav>
    </header>
  )
}
