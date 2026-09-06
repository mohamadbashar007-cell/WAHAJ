import { projects } from '../data/projects'
import { useState } from 'react'
import { ProjectImage } from '../components/ProjectImage'
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
    title: 'SOCIAL MEDIA POSTS',
    category: 'SOCIAL MEDIA DESIGN',
    image: 'projects/creative/instagram-social-posts.png',
    imageAlt: 'Social media post designs created by Mazen Magdy',
    summary: 'A collection of Instagram-ready visual compositions built around clear hierarchy, energetic typography and bold imagery.',
    focus: ['SOCIAL DESIGN', 'LAYOUT', 'ART DIRECTION'],
  },
  {
    title: 'VORTEX — RETRO PROFILE',
    category: 'EDITORIAL / COMPANY PROFILE',
    image: 'projects/creative/vortex-retro-profile.webp',
    imageAlt: 'Retro company profile design for Vortex by Mazen Magdy',
    summary: 'A retro-led company profile combining expressive typography, structured editorial layouts and a distinctive visual language.',
    focus: ['EDITORIAL DESIGN', 'TYPOGRAPHY', 'LAYOUT'],
  },
  {
    title: 'PAIN',
    category: 'BOOK COVER DESIGN',
    image: 'projects/creative/pain-book-cover.webp',
    imageAlt: 'PAIN university book cover design by Mazen Magdy',
    summary: 'A university book-cover study that translates an internal feeling into a focused editorial object.',
    focus: ['COVER DESIGN', 'COMPOSITION', 'TYPOGRAPHY'],
  },
  {
    title: 'WESAL',
    category: 'LOGO IDENTITY',
    image: 'projects/creative/wesal-identity.png',
    imageAlt: 'Wesal logo identity project by Mazen Magdy',
    summary: 'A warm identity system shaped around connection, movement and a flexible bilingual visual direction.',
    focus: ['LOGO DESIGN', 'IDENTITY', 'BRAND APPLICATION'],
  },
  {
    title: 'KROMA ERA',
    category: 'CLOTHING BRAND IDENTITY',
    image: 'projects/creative/kroma-era.png',
    imageAlt: 'Kroma Era clothing brand identity by Mazen Magdy',
    summary: 'A fashion identity where modern nostalgia, custom lettering and editorial rhythm meet.',
    focus: ['BRAND IDENTITY', 'CUSTOM TYPE', 'FASHION'],
  },
  {
    title: 'VORTEX COMPANY PROFILE',
    category: 'CORPORATE EDITORIAL',
    image: 'projects/creative/vortex-company-profile.png',
    imageAlt: 'Vortex company profile project by Mazen Magdy',
    summary: 'A structured company profile designed to present the business with clarity, consistency and a polished visual hierarchy.',
    focus: ['COMPANY PROFILE', 'GRID SYSTEM', 'EDITORIAL'],
  },
]

const creativeProcess = [
  ['FIND THE IDEA', 'We identify the clearest concept the audience should feel and remember.'],
  ['BUILD THE WORLD', 'Type, color, image, composition and sound become one recognizable direction.'],
  ['MAKE IT MOVE', 'We define rhythm, transitions and behavior for film, motion and digital screens.'],
  ['DELIVER THE SYSTEM', 'Useful files, formats and rules keep every output consistent after launch.'],
]

export function CreativePage() {
  const [motionPaused, setMotionPaused] = useState(false)
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
        <div className="motion-stage-copy reveal"><span>MOTION IS A BRAND VOICE</span><h2>FRAME.<br />RHYTHM.<br /><i>IMPACT.</i></h2><p>Motion is designed from the same proportions, type and energy as the identity—so every transition still feels unmistakably on-brand.</p><div className="motion-controls"><span>WAHAJ / IDENTITY MOTION STUDY</span><button type="button" aria-pressed={motionPaused} onClick={() => setMotionPaused(!motionPaused)}>{motionPaused ? 'PLAY MOTION' : 'PAUSE MOTION'}</button></div></div>
        <div className={`motion-reel reveal${motionPaused ? ' motion-is-paused' : ''}`} aria-hidden="true">
          <div className="reel-frame frame-a"><Starburst tone="dark" /><span>01</span></div>
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
                <ProjectImage src={assetPath(item.image)} alt={item.imageAlt} sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />
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
              <div><a href={routeHref(`/work/${project.id}/`)} data-cursor="VIEW"><ProjectImage src={project.image} alt={project.imageAlt} sizes="(max-width: 600px) 100vw, 50vw" /></a></div>
              <span>{project.category}</span><h3>{project.title}</h3><p>{project.summary}</p>
              <ul className="creative-case-tags">{project.focus.map((item) => <li key={item}>{item}</li>)}</ul>
              <a className="text-link project-detail-link" href={routeHref(`/work/${project.id}/`)}>EXPLORE PROJECT ↗</a>
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
