import { assetPath, routeHref } from '../lib/paths'
import { useLanguage } from '../lib/language'

export function Footer() {
  const { language } = useLanguage()
  const ar = language === 'ar'
  return <footer className="footer">
    <div className="footer-brand"><img src={assetPath('/wahaj-logo-optimized.png')} alt="WAHAJ" width="124" height="97" /></div>
    <p>{ar ? 'شركة إبداعية مستقلة' : 'INDEPENDENT CREATIVE COMPANY'}<br />{ar ? 'استراتيجية / تصميم / تقنية' : 'STRATEGY / DESIGN / TECHNOLOGY'}</p>
    <nav aria-label="Footer navigation"><a href={routeHref('/work')}>{ar ? 'الأعمال' : 'SELECTED WORK'}</a><a href={routeHref('/development')}>{ar ? 'التطوير' : 'DEVELOPMENT'}</a><a href={routeHref('/design')}>{ar ? 'التصميم والموشن' : 'DESIGN + MOTION'}</a><a href={routeHref('/contact')}>{ar ? 'تواصل معنا' : 'CONTACT'}</a><a href={routeHref('/privacy')}>{ar ? 'سياسة الخصوصية' : 'PRIVACY'}</a></nav>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} WAHAJ</span><a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{ar ? 'العودة إلى الأعلى ↑' : 'BACK TO TOP ↑'}</a></div>
  </footer>
}
