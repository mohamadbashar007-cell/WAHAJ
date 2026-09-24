import { assetPath } from '../lib/paths'
import { useLocale } from '../lib/i18n'

export function Footer() {
  const { t, href } = useLocale()
  return (
    <footer className="footer">
      <div className="footer-brand"><span className="brand-wordmark"><img src={assetPath('/wahaj-logo.png')} alt="WAHAJ" /></span></div>
      <p>{t(<>CREATIVE DIGITAL COMPANY<br />STRATEGY / DESIGN / TECHNOLOGY</>, <>شركة إبداعية رقمية<br />استراتيجية / تصميم / تقنية</>)}</p>
      <nav aria-label={t('Footer navigation', 'روابط التذييل')}>
        <a href={href('/?section=work')}>{t('SELECTED WORK', 'أعمال مختارة')}</a>
        <a href={href('/development')}>{t('DEVELOPMENT', 'التطوير')}</a>
        <a href={href('/design')}>{t('DESIGN + MOTION', 'التصميم + موشن')}</a>
        <a href={href('/contact')}>{t('CONTACT', 'تواصل معنا')}</a>
      </nav>
      <div className="footer-bottom">
        <span>© 2026 WAHAJ</span>
        <nav className="footer-social" aria-label={t('Social media', 'منصات التواصل')}>
          <a href="https://www.instagram.com/wahajcreative7?stkn=ZWhlZHBvOGpheHI2" target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
          <a href="https://www.facebook.com/profile.php?id=61594091726367" target="_blank" rel="noreferrer">FACEBOOK ↗</a>
          <a href="https://www.tiktok.com/@wahajcreative?lang=en" target="_blank" rel="noreferrer">TIKTOK ↗</a>
        </nav>
        <a href={href('/')}>{t('BACK TO HOME', 'العودة للرئيسية')} ↑</a>
      </div>
    </footer>
  )
}
