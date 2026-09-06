import { projects } from '../data/projects'
import { caseStudies } from '../data/case-studies'
import { ProjectImage } from '../components/ProjectImage'
import { assetPath, routeHref } from '../lib/paths'

export function ProjectPage({ id }: { id: string }) {
  const project = projects.find(item => item.id === id)
  const study = caseStudies[id]
  if (!project || !study) return null
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  return <main className="inner-page case-page">
    <section className="case-hero section-dark">
      <a className="text-link" href={routeHref('/?section=work')}>← ALL WORK</a>
      <p className="eyebrow">{project.category}</p>
      <h1>{project.title}</h1>
      <div className="case-hero-bottom"><p>{project.summary}</p>{project.link && <a className="text-link" href={project.link} target="_blank" rel="noreferrer">VISIT LIVE SITE ↗</a>}</div>
    </section>
    <div className="case-cover"><ProjectImage src={project.image} alt={project.imageAlt} loading="eager" sizes="100vw" /></div>
    <section className="case-story section-light">
      <div className="reveal"><span className="eyebrow">01 / THE BRIEF</span><h2>A CLEAR<br />STARTING POINT.</h2><p>{study.brief}</p></div>
      <div className="reveal"><span className="eyebrow">02 / THE APPROACH</span><h2>THE IDEA,<br />MADE VISIBLE.</h2><p>{study.approach}</p></div>
      <div className="case-deliverables reveal"><span className="eyebrow">03 / PROJECT SCOPE</span><ul>{study.deliverables.map(item => <li key={item}>{item}</li>)}</ul></div>
    </section>
    {study.gallery?.map(item => <figure className="case-gallery reveal" key={item.image}><ProjectImage src={assetPath(item.image)} alt={item.alt} sizes="100vw" /><figcaption>{item.alt}</figcaption></figure>)}
    <section className="page-next page-next-yellow reveal"><span>HAVE SOMETHING SIMILAR IN MIND?</span><a href={routeHref(`/contact/?project=${project.id}`)}>LET’S BUILD YOURS <i>↗</i></a></section>
    <div className="case-next section-dark"><span className="eyebrow">NEXT PROJECT</span><a href={routeHref(`/work/${next.id}/`)}>{next.title} ↗</a></div>
  </main>
}
