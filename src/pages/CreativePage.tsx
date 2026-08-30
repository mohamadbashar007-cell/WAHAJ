import { projects } from '../data/projects'
import { Starburst } from '../components/Starburst'
import { assetPath, routeHref } from '../lib/paths'

const creativeServices = [
  { title: 'BRAND DESIGN', copy: 'Identity systems and art direction that make the brand recognizable before the logo even appears.', outputs: ['STRATEGY', 'IDENTITY', 'TYPOGRAPHY', 'GUIDELINES'] },
  { title: 'VIDEO EDITING', copy: 'Story-led edits with intentional pacing, sound, color and transitions for campaigns and social content.', outputs: ['CAMPAIGN FILMS', 'SOCIAL CUTS', 'COLOR', 'SOUND'] },
  { title: 'MOTION GRAPHICS', copy: 'A motion language built from the identity itself—from kinetic type and logo reveals to complete title systems.', outputs: ['LOGO MOTION', 'KINETIC TYPE', 'TITLES', 'LOOPS'] },
  { title: 'DIGITAL DESIGN', copy: 'Interfaces and content systems that translate the same visual idea into a useful, responsive screen experience.', outputs: ['UI / UX', 'PROTOTYPES', 'DESIGN SYSTEMS', 'INTERACTION'] },
]

const creativeCases = [
  { id: 'kroma-era', focus: ['IDENTITY SYSTEM', 'CUSTOM TYPE', 'EDITORIAL DIRECTION'] },
  { id: 'pain', focus: ['ART DIRECTION', 'COVER DESIGN', 'PRINT LANGUAGE'] },
  { id: 'wesal', focus: ['DIGITAL ART DIRECTION', 'BILINGUAL UI', 'IMAGE DIRECTION'] },
]

const portfolioWork = [
  {
    title: 'SHOWREEL 2024',
    category: 'MOTION / POST-PRODUCTION',
    image: 'projects/creative/showreel-2024.jpg',
    imageAlt: 'A montage of frames from motion graphics and video editing projects',
    summary: 'A fast-cut collection of campaign films, branded sequences and visual effects shaped around rhythm, clarity and impact.',
    focus: ['EDITING', 'MOTION DESIGN', 'VFX', 'SOUND DESIGN'],
  },
  {
    title: 'AL-FUTTAIM',
    category: 'CORPORATE REEL',
    image: 'projects/creative/al-futtaim.jpg',
    imageAlt: 'A frame from the Al-Futtaim corporate reel',
    summary: 'A polished corporate edit that turns business moments into a confident, human and energetic visual narrative.',
    focus: ['VIDEO EDITING', 'PACING', 'COLOR', 'TITLES'],
  },
  {
    title: 'ARAMCO SAUDI',
    category: 'BRAND FILM',
    image: 'projects/creative/aramco-saudi.jpg',
    imageAlt: 'A cinematic industrial frame from the Aramco Saudi film',
    summary: 'Cinematic post-production for an industrial story, balancing people, scale and technology in one cohesive cut.',
    focus: ['EDITING', 'COLOR GRADING', 'COMPOSITING'],
  },
  {
    title: 'STRONG INDEPENDENT OM',
    category: 'BRANDED CONTENT',
    image: 'projects/creative/strong-independent.jpg',
    imageAlt: 'A branded interview frame for Strong Independent OM',
    summary: 'A personality-led format with a distinct title language, restrained motion and clean editorial pacing.',
    focus: ['ART DIRECTION', 'EDITING', 'MOTION TITLES'],
  },
  {
    title: 'WARA ALKAWALIS',
    category: 'ENTERTAINMENT FORMAT',
    image: 'projects/creative/wara-alkawalis.jpg',
    imageAlt: 'A dark promotional portrait for Wara Alkawalis',
    summary: 'A bold entertainment package built from character-led imagery, graphic cutouts and high-contrast framing.',
    focus: ['KEY VISUAL', 'EDITING', 'SHOW PACKAGE'],
  },
  {
    title: 'ABU LOKMA',
    category: 'FOOD COMEDY SHOW',
    image: 'projects/creative/abu-lokma.jpg',
    imageAlt: 'A colorful key visual for the Abu Lokma food comedy show',
    summary: 'A playful food-show identity with expressive Arabic lettering, warm color and a flexible episodic visual system.',
    focus: ['SHOW IDENTITY', 'ARABIC TYPE', 'SOCIAL CUTS'],
  },
  {
    title: 'ZEROTECH CAMPAIGN',
    category: 'SOCIAL DESIGN',
    image: 'projects/creative/zerotech-campaign.jpg',
    imageAlt: 'A collection of Zerotech social media campaign designs',
    summary: 'A broad social content system translating technical products into direct, high-impact campaign visuals.',
    focus: ['CAMPAIGN DESIGN', 'COMPOSITING', 'CONTENT SYSTEM'],
  },
  {
    title: 'HEALTHCARE & FMCG',
    category: 'SOCIAL CAMPAIGNS',
    image: 'projects/creative/healthcare-fmcg-campaign.jpg',
    imageAlt: 'A grid of healthcare and FMCG social media designs',
    summary: 'Product-first campaign art that keeps each message immediate while preserving a recognizable visual family.',
    focus: ['SOCIAL DESIGN', 'PRODUCT ART', 'COPY LAYOUT'],
  },
  {
    title: 'BIG MIND',
    category: 'CAMPAIGN ART DIRECTION',
    image: 'projects/creative/big-mind-campaign.jpg',
    imageAlt: 'A vibrant orange campaign collage for Big Mind tea',
    summary: 'A characterful campaign world combining bold Arabic headlines, product staging and a memorable color language.',
    focus: ['ART DIRECTION', 'KEY VISUALS', 'ARABIC TYPOGRAPHY'],
  },
]

const creativeProcess = [
  ['FIND THE IDEA', 'We identify the clearest concept the audience should feel and remember.'],
  ['BUILD THE WORLD', 'Type, color, image, composition and sound become one recognizable direction.'],
  ['MAKE IT MOVE', 'We define rhythm, transitions and behavior for film, motion and digital screens.'],
  ['DELIVER THE SYSTEM', 'Useful files, formats and rules keep every output consistent after launch.'],
]

export function CreativePage() {
  const visualProjects = creativeCases.map((creativeCase) => ({
    ...projects.find((project) => project.id === creativeCase.id)!,
    focus: creativeCase.focus,
  }))

  return (
    <main className="inner-page creative-page">
      <section className="page-hero creative-hero">
        <div className="page-hero-meta reveal"><span>03 / CREATIVE</span><span>DESIGN / EDIT / MOTION</span></div>
        <h1 className="reveal">MAKE IT<br /><span>VISIBLE.</span><br />MAKE IT MOVE.</h1>
        <Starburst className="page-hero-mark" />
        <div className="kinetic-words" aria-hidden="true"><span>DESIGN</span><span>EDIT</span><span>MOTION</span></div>
      </section>

      <nav className="page-jump-nav" aria-label="Creative page sections">
        <span>EXPLORE</span><a href={routeHref('/design?section=services')}>SERVICES</a><a href={routeHref('/design?section=motion')}>MOTION</a><a href={routeHref('/design?section=visual-work')}>SELECTED WORK</a><a href={routeHref('/design?section=brand-systems')}>BRAND SYSTEMS</a><a href={routeHref('/design?section=creative-process')}>PROCESS</a><a href={routeHref('/contact')}>START A PROJECT ↗</a>
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
          <div className="reel-frame frame-a"><Starburst /><span>01</span></div>
          <div className="reel-frame frame-b"><strong>MOVE</strong><span>02</span></div>
          <div className="reel-frame frame-c"><Starburst /><strong>WAHAJ</strong><span>03</span></div>
        </div>
      </section>

      <section className="portfolio-work section-dark" id="visual-work">
        <header className="subpage-section-head reveal"><span>SELECTED WORK</span><h2>EDIT. MOVE.<br />DESIGN.</h2></header>
        <p className="portfolio-work-intro reveal">A focused selection across post-production, motion graphics, campaign art direction and social design.</p>
        <div className="portfolio-work-grid">
          {portfolioWork.map((item, index) => (
            <article className="portfolio-work-card reveal" key={item.title}>
              <div className="portfolio-work-image">
                <img src={assetPath(item.image)} alt={item.imageAlt} loading="lazy" />
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

      <section className="visual-work section-light" id="brand-systems">
        <header className="subpage-section-head reveal"><span>BRAND &amp; DIGITAL</span><h2>SELECTED<br />SYSTEMS.</h2></header>
        <div className="visual-work-grid">
          {visualProjects.map((project) => (
            <article className="reveal" key={project.id}>
              <div><img src={project.image} alt={project.imageAlt} /></div>
              <span>{project.category}</span><h3>{project.title}</h3><p>{project.summary}</p>
              <ul className="creative-case-tags">{project.focus.map((item) => <li key={item}>{item}</li>)}</ul>
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
