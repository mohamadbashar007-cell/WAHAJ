import { Link } from '../components/Link'
import { ProjectLink } from '../components/ProjectLink'
import { useLanguage } from '../lib/language'
import { ProjectImage } from '../components/ProjectImage'
import { assetPath, routeHref } from '../lib/paths'

const capabilities = [
  ['01', 'WEBSITES', 'Editorial websites, corporate platforms and conversion-focused brand experiences.'],
  ['02', 'APPLICATIONS', 'Useful, intuitive product interfaces designed around real journeys and clear outcomes.'],
  ['03', 'PLATFORMS', 'Structured systems that organize content, services, users, data and operations.'],
  ['04', 'INTERACTION', 'Motion, transitions and creative frontend details that make an experience feel alive.'],
]

const digitalCases = [
  {
    id: 'zaman', number: '01', title: 'ZAMAN', type: 'BILINGUAL CORPORATE WEBSITE', image: assetPath('/projects/zaman.webp'),
    summary: 'A clear corporate experience for industrial supplies and food materials, built to move confidently between Arabic and English.',
    build: 'Responsive product architecture, bilingual content direction, fast navigation and document-ready presentation.',
    stack: ['JavaScript', 'React', 'Vite', 'CSS', 'PDF.js'],
  },
  {
    id: 'segybc', number: '02', title: 'SEGYBC', type: 'INSTITUTIONAL DIGITAL PLATFORM', image: assetPath('/projects/segybc.webp'),
    summary: 'A bilingual platform that communicates partnership, opportunity, leadership and council activity with institutional authority.',
    build: 'Structured content system, responsive interface, multilingual journeys, motion details and scalable routing.',
    stack: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Motion'],
  },
  {
    id: 'wesal', number: '03', title: 'WESAL', type: 'LUXURY TRAVEL EXPERIENCE', image: assetPath('/projects/wesal.webp'),
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
  const { t } = useLanguage()
  return (
    <main className="inner-page development-page">
      <section className="page-hero development-hero">
        <div className="page-hero-meta reveal"><span>{t("02 / DEVELOPMENT")}</span><span>{t("WEBSITES / APPS / PLATFORMS")}</span></div>
        <h1 className="reveal">{t("DIGITAL.")}<br />{t("BUILT TO")}<br /><span>{t("WORK.")}</span></h1>
        <p className="page-hero-statement reveal">{t("Strategy, interface and engineering moving as one—from the first user flow to the final interaction.")}</p>
        <div className="page-hero-logo development-logo" aria-hidden="true" />
      </section>

      <nav className="page-jump-nav" aria-label={t("Development page sections")}>
        <span>{t("EXPLORE")}</span><Link href={routeHref('/development?section=capabilities')}>{t("CAPABILITIES")}</Link><Link href={routeHref('/development?section=digital-work')}>{t("PROJECTS")}</Link><Link href={routeHref('/development?section=process')}>{t("PROCESS")}</Link><Link href={routeHref('/contact')}>{t("START A PROJECT ↗")}</Link>
      </nav>

      <section className="capability-section section-light" id="capabilities">
        <header className="subpage-section-head reveal"><span>{t("WHAT WE BUILD")}</span><h2>{t("DIGITAL THAT")}<br />{t("DOES THE WORK.")}</h2></header>
        <div className="capability-grid">
          {capabilities.map(([number, title, copy]) => (
            <article className="capability-card reveal" key={number}>
              <span>{number}</span><h3>{t(title)}</h3><p>{t(copy)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="development-projects section-dark" id="digital-work">
        <header className="subpage-section-head reveal"><span>{t("BUILT & SHIPPED")}</span><h2>{t("FIVE DIGITAL")}<br />{t("EXPERIENCES.")}</h2></header>
        <div className="development-case-list">
          {digitalCases.map((project) => (
            <article className="development-case reveal" id={project.id} key={project.id}>
              <ProjectLink id={['zaman', 'segybc', 'wesal'].includes(project.id) ? project.id : undefined}><header><span>{project.number}</span><div><h3>{project.title}</h3><p>{t(project.type)}</p></div></header>
              <div className="development-case-image"><ProjectImage src={project.image} alt={`${project.title} project interface`} /></div>
              <div className="development-case-detail">
                <p className="case-lead">{t(project.summary)}</p>
                <div><span>{t("WHAT WE BUILT")}</span><p>{t(project.build)}</p></div>
                <div className="case-stack"><span>{t("LANGUAGES & STACK")}</span><ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></div>
              </div></ProjectLink>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section section-light" id="process">
        <header className="subpage-section-head reveal"><span>{t("THE PROCESS")}</span><h2>{t("FROM AMBITION")}<br />{t("TO RELEASE.")}</h2></header>
        <div className="process-track process-track-five">
          {process.map(([title, copy], index) => <article className="reveal" key={t(title)}><span>0{index + 1}</span><h3>{t(title)}</h3><p>{t(copy)}</p></article>)}
        </div>
      </section>

      <section className="page-next page-next-yellow reveal"><span>{t("HAVE A DIGITAL PRODUCT IN MIND?")}</span><Link href={routeHref('/contact')}>{t("START THE CONVERSATION")}<i>↗</i></Link></section>
    </main>
  )
}
