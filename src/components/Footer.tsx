import { Link } from './Link'
import { ContactLinks } from './ContactLinks'
import { assetPath, routeHref } from '../lib/paths'
import { useLanguage } from '../lib/language'

export function Footer() {
  const { language } = useLanguage()
  const ar = language === 'ar'
  return <footer className="footer">
    <Link href="/" className="footer-brand" aria-label="WAHAJ home"><img src={assetPath('/wahaj-logo.svg')} alt="WAHAJ" width="124" height="97" /></Link>
    <p>{ar ? 'شركة إبداعية مستقلة' : 'INDEPENDENT CREATIVE COMPANY'}<br />{ar ? 'استراتيجية / تصميم / تقنية' : 'STRATEGY / DESIGN / TECHNOLOGY'}</p>
    <nav aria-label="Footer navigation"><Link href={routeHref('/#work')}>{ar ? 'الأعمال' : 'SELECTED WORK'}</Link><Link href={routeHref('/development')}>{ar ? 'التطوير' : 'DEVELOPMENT'}</Link><Link href={routeHref('/design')}>{ar ? 'التصميم والموشن' : 'DESIGN + MOTION'}</Link><Link href={routeHref('/contact')}>{ar ? 'تواصل معنا' : 'CONTACT'}</Link><Link href={routeHref('/privacy')}>{ar ? 'سياسة الخصوصية' : 'PRIVACY'}</Link></nav>
    <ContactLinks /><div className="footer-bottom"><span>© {new Date().getFullYear()} WAHAJ</span><button type="button" onClick={() => { window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); document.getElementById('main-content')?.focus({ preventScroll: true }) }}>{ar ? 'العودة إلى الأعلى ↑' : 'BACK TO TOP ↑'}</button></div>
  </footer>
}
