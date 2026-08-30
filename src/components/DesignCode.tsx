import { Starburst } from './Starburst'
import { routeHref } from '../lib/paths'

export function DesignCode() {
  return (
    <section className="design-code" aria-labelledby="design-code-title">
      <h2 id="design-code-title" className="sr-only">Design and code</h2>
      <a href={routeHref('/design')} className="discipline design-side reveal" data-cursor="OPEN">
        <span className="eyebrow">THE EYE</span>
        <strong>DESIGN</strong>
        <p>IDENTITY<br />ART DIRECTION<br />UI / UX</p>
        <span className="discipline-note">BRAND SYSTEMS / VISUAL LANGUAGE</span>
      </a>
      <div className="fusion" aria-hidden="true">
        <Starburst />
        <span>×</span>
      </div>
      <a href={routeHref('/development')} className="discipline code-side reveal" data-cursor="OPEN">
        <span className="eyebrow">THE ENGINE</span>
        <strong>CODE</strong>
        <p>FRONTEND<br />INTERACTION<br />CREATIVE DEV</p>
        <span className="discipline-note">DIGITAL PRODUCTS / EXPERIENCES</span>
      </a>
      <p className="fusion-copy">NOT A HANDOFF.<br />ONE SHARED OBSESSION.</p>
    </section>
  )
}
