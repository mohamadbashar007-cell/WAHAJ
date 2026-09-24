import { Starburst } from './Starburst'
import { assetPath } from '../lib/paths'
import { useLocale } from '../lib/i18n'

export function Contact() {
  const { t, href } = useLocale()
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-meta reveal">
        <span>04 / {t('CONTACT', 'تواصل معنا')}</span>
        <span>{t('AVAILABLE FOR SELECT PROJECTS', 'متاحون لمشاريع مختارة')}</span>
      </div>
      <h2 id="contact-title" className="reveal">{t(<>START A<br /><span>PROJECT.</span></>, <>ابدأ<br /><span>مشروعًا.</span></>)}</h2>
      <a className="contact-link reveal" href={href('/contact')} data-cursor={t('TALK', 'تواصل')}>
        <span>{t("LET'S TALK", 'لنتحدّث')}</span><i>↗</i><Starburst tone="dark" />
      </a>
      <div className="contact-logo" aria-hidden="true"><img src={assetPath('/wahaj-logo-dark.png')} alt="" /></div>
    </section>
  )
}
