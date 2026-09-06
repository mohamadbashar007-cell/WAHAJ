import { routeHref } from '../lib/paths'

const services = [
  ['01', 'BRAND DIRECTION', 'Strategy, visual identity, art direction and systems that make a brand unmistakable.', routeHref('/design')],
  ['02', 'DIGITAL DESIGN', 'Web design, UI/UX and product experiences where every detail earns its place.', routeHref('/design?section=services')],
  ['03', 'DEVELOPMENT', 'Fast, responsive websites and interactive builds with craft beneath the surface.', routeHref('/development')],
  ['04', 'CREATIVE PARTNERSHIP', 'Campaign concepts, launch moments and ongoing collaboration from first spark to release.', routeHref('/contact')],
]

import { Starburst } from './Starburst'

export function Services() {
  return (
    <section id="services" className="services-section section-dark" aria-labelledby="services-title">
      <header className="services-header reveal">
        <span className="eyebrow">02 / WHAT WE DO</span>
        <h2 id="services-title">FROM FIRST<br /><span>SPARK</span> TO SHIP.</h2>
        <Starburst className="services-burst" />
      </header>
      <div className="services-list">
        {services.map(([number, title, description, href]) => (
          <a href={href} key={number} className="service-row reveal" data-cursor="OPEN">
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
            <i aria-hidden="true">↗</i>
          </a>
        ))}
      </div>
    </section>
  )
}
