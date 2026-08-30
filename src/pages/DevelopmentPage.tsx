import { Starburst } from '../components/Starburst'
import { assetPath, routeHref } from '../lib/paths'

const capabilities = [
  ['01', 'WEBSITES', 'Editorial websites, corporate platforms and conversion-focused brand experiences.'],
  ['02', 'APPLICATIONS', 'Useful, intuitive product interfaces designed around real journeys and clear outcomes.'],
  ['03', 'PLATFORMS', 'Structured systems that organize content, services, users, data and operations.'],
  ['04', 'INTERACTION', 'Motion, transitions and creative frontend details that make an experience feel alive.'],
]

const digitalCases = [
  {
    id: 'zaman', number: '01', title: 'ZAMAN', type: 'BILINGUAL CORPORATE WEBSITE', image: assetPath('/projects/zaman.png'),
    summary: 'A clear corporate experience for industrial supplies and food materials, built to move confidently between Arabic and English.',
    build: 'Responsive product architecture, bilingual content direction, fast navigation and document-ready presentation.',
    stack: ['JavaScript', 'React', 'Vite', 'CSS', 'PDF.js'], link: 'https://zaman-eg.com',
  },
  {
    id: 'segybc', number: '02', title: 'SEGYBC', type: 'INSTITUTIONAL DIGITAL PLATFORM', image: assetPath('/projects/segybc.png'),
    summary: 'A bilingual platform that communicates partnership, opportunity, leadership and council activity with institutional authority.',
    build: 'Structured content system, responsive interface, multilingual journeys, motion details and scalable routing.',
    stack: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Motion'], link: 'https://segybc.com',
  },
  {
    id: 'wesal', number: '03', title: 'WESAL', type: 'LUXURY TRAVEL EXPERIENCE', image: assetPath('/projects/wesal.png'),
    summary: 'A cinematic bilingual travel website where the interface carries the pace, atmosphere and confidence of the journey.',
    build: 'Immersive art direction, bilingual layouts, fluid responsive behavior and a lightweight frontend delivery.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Vite'],
  },
  {
    id: 'phonics', number: '04', title: 'PHONICS ADVENTURE', type: 'INTERACTIVE LEARNING APPLICATION', image: assetPath('/projects/phonics.png'),
    summary: 'A playful learning product that turns phonics practice into guided levels, activities, audio and visible progress.',
    build: 'Component-based learning flows, animated feedback, structured state, typed data and a scalable application layer.',
    stack: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'tRPC', 'PostgreSQL'],
  },
  {
    id: 'kalema', number: '05', title: 'KALEMA', type: 'ASSESSMENT & ABILITY PLATFORM', image: assetPath('/projects/kalema.png'),
    summary: 'An Arabic-first, bilingual assessment platform that helps users discover strengths and understand their next steps.',
    build: 'Account journeys, assessment logic, result profiles, clear reports and a responsive bilingual interface.',
    stack: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'PostgreSQL'],
  },
]

const process = [
  ['DISCOVER', 'Audience, business goal, product scope and the exact job the experience must do.'],
  ['ARCHITECT', 'Content structure, user journeys, data model and technical foundations before visual polish.'],
  ['DESIGN', 'Interface, motion, states and responsive behavior shaped as one coherent language.'],
  ['BUILD', 'A typed, maintainable frontend with reusable components and meaningful interactions.'],
  ['VERIFY', 'Responsive, accessibility, content and performance checks before the experience goes live.'],
]

export function DevelopmentPage() {
  return (
    <main className="inner-page development-page">
      <section className="page-hero development-hero">
        <div className="page-hero-meta reveal"><span>02 / DEVELOPMENT</span><span>WEBSITES / APPS / PLATFORMS</span></div>
        <h1 className="reveal">WE BUILD<br />THE <span>SYSTEM</span><br />BEHIND THE IMPACT.</h1>
        <p className="page-hero-statement reveal">Strategy, interface and engineering moving as one—from the first user flow to the final interaction.</p>
        <Starburst className="page-hero-mark" />
      </section>

      <nav className="page-jump-nav" aria-label="Development page sections">
        <span>EXPLORE</span><a href={routeHref('/development?section=capabilities')}>CAPABILITIES</a><a href={routeHref('/development?section=digital-work')}>PROJECTS</a><a href={routeHref('/development?section=process')}>PROCESS</a><a href={routeHref('/contact')}>START A PROJECT ↗</a>
      </nav>

      <section className="capability-section section-light" id="capabilities">
        <header className="subpage-section-head reveal"><span>WHAT WE BUILD</span><h2>DIGITAL THAT<br />DOES THE WORK.</h2></header>
        <div className="capability-grid">
          {capabilities.map(([number, title, copy]) => (
            <article className="capability-card reveal" key={number}>
              <span>{number}</span><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="development-projects section-dark" id="digital-work">
        <header className="subpage-section-head reveal"><span>BUILT & SHIPPED</span><h2>FIVE DIGITAL<br />EXPERIENCES.</h2></header>
        <div className="development-case-list">
          {digitalCases.map((project) => (
            <article className="development-case reveal" id={project.id} key={project.id}>
              <header><span>{project.number}</span><div><h3>{project.title}</h3><p>{project.type}</p></div>{project.link && <a href={project.link} target="_blank" rel="noreferrer">VIEW LIVE ↗</a>}</header>
              <div className="development-case-image"><img src={project.image} alt={`${project.title} project shown in English`} /></div>
              <div className="development-case-detail">
                <p className="case-lead">{project.summary}</p>
                <div><span>WHAT WE BUILT</span><p>{project.build}</p></div>
                <div className="case-stack"><span>LANGUAGES & STACK</span><ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section section-light" id="process">
        <header className="subpage-section-head reveal"><span>THE PROCESS</span><h2>FROM AMBITION<br />TO RELEASE.</h2></header>
        <div className="process-track process-track-five">
          {process.map(([title, copy], index) => <article className="reveal" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="page-next page-next-yellow reveal"><span>HAVE A DIGITAL PRODUCT IN MIND?</span><a href={routeHref('/contact')}>START THE CONVERSATION <i>↗</i></a></section>
    </main>
  )
}
