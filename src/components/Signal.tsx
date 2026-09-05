import { Link } from './Link'
import { useLanguage } from '../lib/language'
import { routeHref } from '../lib/paths'

const facts = [
  ['08', 'SELECTED PROJECTS'],
  ['03', 'CONNECTED DISCIPLINES'],
  ['01', 'UNIFIED CREATIVE PARTNER'],
]

export function Signal() {
  const { t } = useLanguage()
  return (
    <section id="intro" className="signal-section section-light" aria-label={t("WAHAJ in brief")}>
      <div className="signal-statement reveal">
        <span>{t("THE WAHAJ DIFFERENCE")}</span>
        <p>{t("We don’t hand ideas from one department to another. Strategy, identity and technology move together—so the final experience feels like")}<em>{t("one unmistakable brand.")}</em></p>
        <Link href={routeHref('/#work')}>{t("EXPLORE ALL WORK")}<i>↗</i></Link>
      </div>
      <div className="signal-facts reveal">
        {facts.map(([value, label]) => <div key={t(label)}><strong>{t(value)}</strong><span>{t(label)}</span></div>)}
      </div>
    </section>
  )
}
