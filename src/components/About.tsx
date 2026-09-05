import { Trust } from './Trust'
import { useLanguage } from '../lib/language'
import { assetPath } from '../lib/paths'

export function About() {
  const { t } = useLanguage()
  return (
    <section id="about" className="about-section section-light" aria-labelledby="about-title">
      <div className="about-top reveal">
        <span className="eyebrow">{t("03 / THE COMPANY")}</span>
        <h2 id="about-title">{t("ONE COMPANY.")}<br />{t("FULL")}<span>{t("IMPACT.")}</span></h2>
      </div>
      <div className="about-grid reveal">
        <div className="logo-stamp">
          <img src={assetPath('/wahaj-logo-dark.svg')} alt={t("Official WAHAJ logo")} loading="lazy" width="320" height="250" />
        </div>
        <p>{t("WAHAJ is an independent creative company uniting strategy, design and technology into one focused system—built to make brands visible, relevant and impossible to ignore.")}</p>
        <div className="company-pillars">
          <div><span>01</span><strong>{t("STRATEGIC")}<br />{t("BY DESIGN")}</strong></div>
          <div><span>02</span><strong>{t("BUILT FOR")}<br />{t("IMPACT")}</strong></div>
          <div><span>03</span><strong>{t("ONE VISION")}<br />{t("END TO END")}</strong></div>
        </div>
      </div>
      <Trust />
    </section>
  )
}
