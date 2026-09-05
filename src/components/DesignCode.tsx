import { Link } from './Link'
import { useLanguage } from '../lib/language'
import { Starburst } from './Starburst'
import { routeHref } from '../lib/paths'

export function DesignCode() {
  const { t } = useLanguage()
  return (
    <section className="design-code" aria-labelledby="design-code-title">
      <h2 id="design-code-title" className="sr-only">{t("Design and code")}</h2>
      <Link href={routeHref('/design')} className="discipline design-side reveal" data-cursor="OPEN">
        <span className="eyebrow">{t("THE EYE")}</span>
        <strong>{t("DESIGN")}</strong>
        <p>{t("IDENTITY")}<br />{t("ART DIRECTION")}<br />{t("UI / UX")}</p>
        <span className="discipline-note">{t("BRAND SYSTEMS / VISUAL LANGUAGE")}</span>
      </Link>
      <div className="fusion" aria-hidden="true">
        <Starburst />
        <span>×</span>
      </div>
      <Link href={routeHref('/development')} className="discipline code-side reveal" data-cursor="OPEN">
        <span className="eyebrow">{t("THE ENGINE")}</span>
        <strong>{t("CODE")}</strong>
        <p>{t("FRONTEND")}<br />{t("INTERACTION")}<br />{t("CREATIVE DEV")}</p>
        <span className="discipline-note">{t("DIGITAL PRODUCTS / EXPERIENCES")}</span>
      </Link>
      <p className="fusion-copy">{t("NOT A HANDOFF.")}<br />{t("ONE SHARED OBSESSION.")}</p>
    </section>
  )
}
