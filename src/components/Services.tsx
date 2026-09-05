import { Link } from './Link'
import { useLanguage } from '../lib/language'
import { routeHref } from '../lib/paths'

const services = [
  ['01', 'BRAND DIRECTION', 'Strategy, visual identity, art direction and systems that make a brand unmistakable.', routeHref('/design')],
  ['02', 'DIGITAL DESIGN', 'Web design, UI/UX and product experiences where every detail earns its place.', routeHref('/design?section=services')],
  ['03', 'DEVELOPMENT', 'Fast, responsive websites and interactive builds with craft beneath the surface.', routeHref('/development')],
  ['04', 'CREATIVE PARTNERSHIP', 'Campaign concepts, launch moments and ongoing collaboration from first spark to release.', routeHref('/contact')],
]

import { Starburst } from './Starburst'

export function Services() {
  const { t } = useLanguage()
  return (
    <section id="services" className="services-section section-dark" aria-labelledby="services-title">
      <header className="services-header reveal">
        <span className="eyebrow">{t("02 / WHAT WE DO")}</span>
        <h2 id="services-title">{t("FROM FIRST")}<br /><span>{t("SPARK")}</span>{t("TO SHIP.")}</h2>
        <Starburst className="services-burst" />
      </header>
      <div className="services-list">
        {services.map(([number, title, description, href]) => (
          <Link href={href} key={number} className="service-row reveal" data-cursor="OPEN">
            <span>{number}</span>
            <h3>{t(title)}</h3>
            <p>{t(description)}</p>
            <i aria-hidden="true">↗</i>
          </Link>
        ))}
      </div>
    </section>
  )
}
