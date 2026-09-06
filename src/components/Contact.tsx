import { Starburst } from './Starburst'
import { assetPath, routeHref } from '../lib/paths'

export function Contact() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-meta reveal">
        <span>04 / YOUR TURN</span>
        <span>AVAILABLE FOR SELECT PROJECTS</span>
      </div>
      <h2 id="contact-title" className="reveal">GOT SOMETHING<br />WORTH <span>MAKING?</span></h2>
      <a className="contact-link reveal" href={routeHref('/contact')} data-cursor="TALK">
        <span>LET'S TALK</span><i>↗</i><Starburst />
      </a>
      <div className="contact-logo" aria-hidden="true"><img src={assetPath('/wahaj-logo.png')} alt="" /></div>
    </section>
  )
}
