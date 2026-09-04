import { Starburst } from '../components/Starburst'
import { assetPath, routeHref } from '../lib/paths'

const creativeServices = [
  { title: 'BRAND DESIGN', copy: 'Identity systems and art direction that make the brand recognizable before the logo even appears.', outputs: ['STRATEGY', 'IDENTITY', 'TYPOGRAPHY', 'GUIDELINES'] },
  { title: 'VIDEO EDITING', copy: 'Story-led edits with intentional pacing, sound, color and transitions for campaigns and social content.', outputs: ['CAMPAIGN FILMS', 'SOCIAL CUTS', 'COLOR', 'SOUND'] },
  { title: 'MOTION GRAPHICS', copy: 'A motion language built from the identity itself—from kinetic type and logo reveals to complete title systems.', outputs: ['LOGO MOTION', 'KINETIC TYPE', 'TITLES', 'LOOPS'] },
  { title: 'DIGITAL DESIGN', copy: 'Interfaces and content systems that translate the same visual idea into a useful, responsive screen experience.', outputs: ['UI / UX', 'PROTOTYPES', 'DESIGN SYSTEMS', 'INTERACTION'] },
]

const portfolioWork = [
  {
    title: 'VORTEX SOCIAL SERIES',
    category: 'SOCIAL MEDIA DESIGN',
    image: 'projects/design/social-media-instagram.png',
    imageAlt: 'Social media posts for Instagram project cover',
    summary: 'A collection of Instagram social media posts designed for Vortex.',
    focus: ['SOCIAL MEDIA', 'LAYOUT', 'ART DIRECTION'],
  },
  {
    title: 'VORTEX RETRO PROFILE',
    category: 'COMPANY PROFILE / EDITORIAL',
    image: 'projects/design/vortex-retro-profile.png',
    imageAlt: 'Retro Vortex company profile project cover',
    summary: 'A retro-inspired company profile created for Vortex Group.',
    focus: ['EDITORIAL DESIGN', 'ARABIC TYPE', 'LAYOUT'],
  },
  {
    title: 'PAIN',
    category: 'BOOK COVER / EDITORIAL DESIGN',
    image: 'projects/design/pain-book-cover.png',
    imageAlt: 'Pain book cover design project cover',
    summary: 'A university book-cover design exploring pain through a focused editorial composition.',
    focus: ['COVER DESIGN', 'EDITORIAL', 'TYPOGRAPHY'],
  },
  {
    title: 'WESAL IDENTITY',
    category: 'LOGO / BRAND IDENTITY',
    image: 'projects/design/wesal-logo-identity.png',
    imageAlt: 'Wesal logo identity project cover',
    summary: 'A bilingual logo and visual identity for Wesal, built around movement and connection.',
    focus: ['LOGO DESIGN', 'BRAND IDENTITY', 'ARABIC TYPE'],
  },
  {
    title: 'KROMA ERA',
    category: 'FASHION / BRAND IDENTITY',
    image: 'projects/design/kroma-era.png',
    imageAlt: 'Kroma Era clothing brand identity project cover',
    summary: 'A logo and visual identity system created for the Kroma Era clothing brand.',
    focus: ['LOGO DESIGN', 'FASHION BRANDING', 'VISUAL IDENTITY'],
  },
  {
    title: 'VORTEX COMPANY PROFILE',
    category: 'COMPANY PROFILE / BRAND SYSTEM',
    image: 'projects/design/vortex-company-profile.png',
    imageAlt: 'Vortex company profile project cover',
    summary: 'A corporate profile system presenting the Vortex Group and its business divisions.',
    focus: ['EDITORIAL DESIGN', 'BRAND SYSTEM', 'INFOGRAPHICS'],
  },
]

const creativeProcess = [
  ['FIND THE IDEA', 'We identify the clearest concept the audience should feel and remember.'],
  ['BUILD THE WORLD', 'Type, color, image, composition and sound become one recognizable direction.'],
  ['MAKE IT MOVE', 'We define rhythm, transitions and behavior for film, motion and digital screens.'],
  ['DELIVER THE SYSTEM', 'Useful files, formats and rules keep every output consistent after launch.'],
]

export function CreativePage() {
  return (
    <main className="inner-page creative-page">
      <section className="page-hero creative-hero">
        <div className="page-hero-meta reveal"><span>03 / CREATIVE</span><span>DESIGN / EDIT / MOTION</span></div>
        <h1 className="reveal">MAKE IT<br /><span>VISIBLE.</span><br />MAKE IT MOVE.</h1>
        <Starburst className="page-hero-mark" />
        <div className="kinetic-words" aria-hidden="true"><span>DESIGN</span><span>EDIT</span><span>MOTION</span></div>
      </section>

      <nav className="page-jump-nav" aria-label="Creative page sections">
        <span>EXPLORE</span><a href={routeHref('/design?section=services')}>SERVICES</a><a href={routeHref('/design?section=motion')}>MOTION</a><a href={routeHref('/design?section=visual-work')}>SELECTED WORK</a><a href={routeHref('/design?section=creative-process')}>PROCESS</a><a href={routeHref('/contact')}>START A PROJECT ↗</a>
      </nav>

      <section className="creative-services section-light" id="services">
        <header className="subpage-section-head reveal"><span>WHAT WE SHAPE</span><h2>ONE IDEA.<br />EVERY FORMAT.</h2></header>
        <div className="creative-service-list creative-service-detail-list">
          {creativeServices.map((service, index) => (
            <article className="reveal" key={service.title}>
              <span>0{index + 1}</span><h3>{service.title}</h3><p>{service.copy}</p>
              <ul>{service.outputs.map((output) => <li key={output}>{output}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="motion-stage section-dark" id="motion" aria-label="Motion design demonstration">
        <div className="motion-stage-copy reveal"><span>MOTION IS A BRAND VOICE</span><h2>FRAME.<br />RHYTHM.<br /><i>IMPACT.</i></h2><p>Motion is designed from the same proportions, type and energy as the identity—so every transition still feels unmistakably on-brand.</p></div>
        <div className="motion-reel reveal" aria-hidden="true">
          <div className="reel-frame frame-a"><Starburst tone="dark" /><span>01</span></div>
          <div className="reel-frame frame-b"><strong>MOVE</strong><span>02</span></div>
          <div className="reel-frame frame-c"><Starburst /><strong>WAHAJ</strong><span>03</span></div>
        </div>
      </section>

      <section className="portfolio-work section-dark" id="visual-work">
        <header className="subpage-section-head reveal"><span>WAHAJ / SELECTED WORK</span><h2>EDIT. MOVE.<br />DESIGN.</h2></header>
        <p className="portfolio-work-intro reveal">Selected design work created by our studio across identity, editorial and social media.</p>
        <div className="portfolio-work-grid">
          {portfolioWork.map((item, index) => (
            <article className="portfolio-work-card reveal" key={item.title}>
              <div className="portfolio-work-image">
                <img src={assetPath(item.image)} alt={item.imageAlt} loading="lazy" width="1280" height="800" />
                <span>0{index + 1}</span>
              </div>
              <div className="portfolio-work-meta"><span>{item.category}</span><span>WAHAJ / CREATIVE</span></div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <ul className="creative-case-tags">{item.focus.map((focus) => <li key={focus}>{focus}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="creative-process section-dark" id="creative-process">
        <header className="subpage-section-head reveal"><span>THE CREATIVE PROCESS</span><h2>FROM SIGNAL<br />TO SYSTEM.</h2></header>
        <div className="creative-process-grid">
          {creativeProcess.map(([title, copy], index) => <article className="reveal" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="page-next page-next-yellow reveal"><span>READY TO GIVE THE BRAND A VOICE?</span><a href={routeHref('/contact')}>BUILD THE NEXT IDEA <i>↗</i></a></section>
    </main>
  )
}
