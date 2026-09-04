import { projects } from '../data/projects'
import { routeHref } from '../lib/paths'

export function CaseStudyPage({ projectId }: { projectId: string }) {
  const index = projects.findIndex((item) => item.id === projectId)
  const project = projects[index]
  if (!project) return <main className="simple-page"><section><h1>PROJECT NOT FOUND</h1><a href={routeHref('/work')}>BACK TO WORK →</a></section></main>
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  return <main className="case-study">
    <header className="case-hero"><span>{project.number} / CASE STUDY</span><h1>{project.title}</h1><p>{project.summary}</p></header>
    <figure className="case-cover"><img src={project.image} alt={project.imageAlt} width="1600" height="1000" /><figcaption>{project.category}</figcaption></figure>
    <section className="case-facts"><div><span>CLIENT</span><strong>{project.title}</strong></div><div><span>YEAR</span><strong>SELECTED WORK</strong></div><div><span>SERVICES</span><strong>{project.category}</strong></div><div><span>WAHAJ ROLE</span><strong>STRATEGY / DESIGN / DELIVERY</strong></div></section>
    <section className="case-story"><article><span>THE CHALLENGE</span><h2>MAKE THE IDEA CLEAR BEFORE MAKING IT LOUD.</h2><p>The project needed a distinctive expression without losing clarity. We focused the experience around a single visual idea, then used hierarchy, pacing and interaction to make every decision support it.</p></article><article><span>THE APPROACH</span><h2>ONE SYSTEM, BUILT ACROSS EVERY TOUCHPOINT.</h2><p>Strategy shaped the content structure; design established a recognisable visual language; and the final delivery translated that language into practical, consistent components.</p></article><article><span>THE OUTCOME</span><h2>A COHERENT FOUNDATION FOR THE BRAND.</h2><p>The result is a clearer and more memorable experience, with a system that can extend to future communication. Measurable results can be added when verified client data is available.</p></article></section>
    {project.link && <a className="case-live button button-yellow" href={project.link} target="_blank" rel="noreferrer">VIEW LIVE SITE ↗</a>}
    <nav className="case-pagination" aria-label="Project navigation"><a href={routeHref(`/work/${previous.id}`)}>← {previous.title}</a><a href={routeHref('/contact')}>START A SIMILAR PROJECT</a><a href={routeHref(`/work/${next.id}`)}>{next.title} →</a></nav>
  </main>
}
