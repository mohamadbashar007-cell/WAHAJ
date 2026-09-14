import { assetPath, routeHref } from '../lib/paths'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand"><span className="brand-wordmark"><img src={assetPath('/wahaj-logo.png')} alt="WAHAJ" /></span></div>
      <p>CREATIVE DIGITAL COMPANY<br />STRATEGY / DESIGN / TECHNOLOGY</p>
      <nav aria-label="Footer navigation">
        <a href={routeHref('/?section=work')}>SELECTED WORK</a>
        <a href={routeHref('/development')}>DEVELOPMENT</a>
        <a href={routeHref('/design')}>DESIGN + MOTION</a>
        <a href={routeHref('/contact')}>CONTACT</a>
      </nav>
      <div className="footer-bottom">
        <span>© 2026 WAHAJ</span>
        <nav className="footer-social" aria-label="Social media">
          <a href="https://www.instagram.com/wahajcreative7?stkn=ZWhlZHBvOGpheHI2" target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
          <a href="https://www.facebook.com/profile.php?id=61594091726367" target="_blank" rel="noreferrer">FACEBOOK ↗</a>
          <a href="https://www.tiktok.com/@wahajcreative?lang=en" target="_blank" rel="noreferrer">TIKTOK ↗</a>
        </nav>
        <a href={routeHref('/')}>BACK TO THE SPARK ↑</a>
      </div>
    </footer>
  )
}
