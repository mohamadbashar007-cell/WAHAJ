import type { Project } from '../data/projects'
import { routeHref } from '../lib/paths'

export function ProjectPreview({ project }: { project: Project; index?: number }) {
  const internal = !project.link
  const href = internal ? routeHref(`/work/${project.id}`) : project.link!
  return (
    <article className={`project-card tone-${project.tone} reveal`}>
      <a href={href} target={internal ? undefined : '_blank'} rel={internal ? undefined : 'noreferrer'} className="project-card-link">
        <div className="project-card-image"><img src={project.image} alt={project.imageAlt} loading="lazy" width="1280" height="800" /></div>
        <div className="project-card-head"><span>{project.number}</span><div><h3>{project.title}</h3><p>{project.category}</p></div><i aria-hidden="true">{internal ? '→' : '↗'}</i></div>
        <p className="project-summary">{project.summary}</p>
        <strong className="project-action">{internal ? 'VIEW CASE STUDY' : 'VIEW LIVE SITE'} {internal ? '→' : '↗'}</strong>
      </a>
    </article>
  )
}
