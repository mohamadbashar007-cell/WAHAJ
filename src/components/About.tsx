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
          <img src={assetPath('/wahaj-logo-dark.png')} alt="Official WAHAJ logo" loading="lazy" />
        </div>
        <p>Based in Cairo and working everywhere, WAHAJ brings brand design and digital development together—from the first visual idea to the website or application people use.</p>
        <div className="company-pillars">
          <div><span>01</span><strong>DEFINE THE SCOPE</strong><p>Start with the audience, the goal and the work that needs to be delivered.</p></div>
          <div><span>02</span><strong>DESIGN & DEVELOP</strong><p>Connect the visual direction to the way the experience works.</p></div>
          <div><span>03</span><strong>REVIEW & HAND OVER</strong><p>Review the details and prepare the agreed files or digital experience for delivery.</p></div>
        </div>
      </div>
    </section>
  )
}
