import { routeHref } from '../lib/paths'

const facts = [
  ['08', 'SELECTED PROJECTS'],
  ['03', 'CONNECTED DISCIPLINES'],
  ['01', 'UNIFIED CREATIVE PARTNER'],
]

export function Signal() {
  return (
    <section id="intro" className="signal-section section-light" aria-label="WAHAJ in brief">
      <div className="signal-statement reveal">
        <span>THE WAHAJ DIFFERENCE</span>
        <p>We don’t hand ideas from one department to another. Strategy, identity and technology move together—so the final experience feels like <em>one unmistakable brand.</em></p>
        <a href={routeHref('/work')}>EXPLORE ALL WORK <i>↗</i></a>
      </div>
      <div className="signal-facts reveal">
        {facts.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </div>
    </section>
  )
}
