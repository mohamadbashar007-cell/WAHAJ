import { Starburst } from './Starburst'
import { useLocale } from '../lib/i18n'

export function DesignCode() {
  const { t, href } = useLocale()
  return (
    <section className="design-code" aria-labelledby="design-code-title">
      <h2 id="design-code-title" className="sr-only">{t('Design and code', 'التصميم والبرمجة')}</h2>
      <a href={href('/design')} className="discipline design-side reveal" data-cursor={t('OPEN', 'افتح')}>
        <span className="eyebrow">{t('BRAND & DIGITAL DESIGN', 'تصميم العلامات والمنتجات الرقمية')}</span>
        <strong>{t('DESIGN', 'تصميم')}</strong>
        <p>{t(<>IDENTITY<br />ART DIRECTION<br />UI / UX</>, <>هوية بصرية<br />إخراج فني<br />واجهات وتجربة مستخدم</>)}</p>
        <span className="discipline-note">{t('BRAND SYSTEMS / VISUAL LANGUAGE', 'أنظمة العلامات / اللغة البصرية')}</span>
      </a>
      <div className="fusion" aria-hidden="true">
        <Starburst />
        <span>×</span>
      </div>
      <a href={href('/development')} className="discipline code-side reveal" data-cursor={t('OPEN', 'افتح')}>
        <span className="eyebrow">{t('WEB & APP DEVELOPMENT', 'تطوير المواقع والتطبيقات')}</span>
        <strong>{t('CODE', 'برمجة')}</strong>
        <p>{t(<>FRONTEND<br />INTERACTION<br />CREATIVE DEV</>, <>واجهات أمامية<br />تفاعلات<br />تطوير إبداعي</>)}</p>
        <span className="discipline-note">{t('WEBSITES / WEB APPS / MOBILE APPS', 'مواقع / تطبيقات ويب / تطبيقات موبايل')}</span>
      </a>
      <p className="fusion-copy">{t(<>DESIGN + DEVELOPMENT.<br />ONE TEAM.</>, <>تصميم + تطوير.<br />فريق واحد.</>)}</p>
    </section>
  )
}
