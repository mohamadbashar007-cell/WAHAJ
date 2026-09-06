import { assetPath } from '../lib/paths'

export function About() {
  return (
    <section id="about" className="about-section section-light" aria-labelledby="about-title">
      <div className="about-top reveal">
        <span className="eyebrow">03 / THE COMPANY</span>
        <h2 id="about-title">ONE COMPANY.<br />FULL <span>IMPACT.</span></h2>
      </div>
      <div className="about-grid reveal">
        <div className="logo-stamp">
          <img src={assetPath('/wahaj-logo.png')} alt="Official WAHAJ logo" loading="lazy" />
        </div>
        <p>WAHAJ is an independent creative company uniting strategy, design and technology into one focused system—built to make brands visible, relevant and impossible to ignore.</p>
        <div className="company-pillars">
          <div><span>01</span><strong>STRATEGIC<br />BY DESIGN</strong></div>
          <div><span>02</span><strong>BUILT FOR<br />IMPACT</strong></div>
          <div><span>03</span><strong>ONE VISION<br />END TO END</strong></div>
        </div>
      </div>
    </section>
  )
}
