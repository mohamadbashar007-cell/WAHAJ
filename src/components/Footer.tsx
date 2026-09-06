import { assetPath, routeHref } from '../lib/paths'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand"><span className="brand-wordmark"><img src={assetPath('/wahaj-logo.png')} alt="WAHAJ" /></span></div>
      <p>CREATIVE DIGITAL COMPANY<br />STRATEGY / DESIGN / TECHNOLOGY</p>
      <nav aria-label="Footer navigation">
        <a href={routeHref('/work')}>SELECTED WORK</a>
        <a href={routeHref('/development')}>DEVELOPMENT</a>
        <a href={routeHref('/design')}>DESIGN + MOTION</a>
        <a href={routeHref('/contact')}>CONTACT</a>
      </nav>
      <div className="footer-bottom"><span>© 2026 WAHAJ</span><a href={routeHref('/')}>BACK TO THE SPARK ↑</a></div>
    </footer>
  )
}
