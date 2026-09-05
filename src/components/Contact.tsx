import { Link } from './Link'
import { useLanguage } from '../lib/language'
import { Starburst } from './Starburst'
import { routeHref } from '../lib/paths'

export function Contact() {
  const { t } = useLanguage()
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-meta reveal">
        <span>{t("04 / YOUR TURN")}</span>
        <span>{t("AVAILABLE FOR SELECT PROJECTS")}</span>
      </div>
      <h2 id="contact-title" className="reveal">{t("YOUR NEXT IDEA.")}<br /><span>{t("STARTS HERE.")}</span></h2>
      <Link className="contact-link reveal" href={routeHref('/contact')} data-cursor="TALK">
        <span>{t("LET'S TALK")}</span><i>↗</i><Starburst tone="dark" />
      </Link>
    </section>
  )
}
