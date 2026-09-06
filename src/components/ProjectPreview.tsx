import type { Project } from '../data/projects'
import { routeHref } from '../lib/paths'
import { ProjectImage } from './ProjectImage'

export function ProjectPreview({ project, index }: { project: Project; index: number }) {
  const content = (
    <>
      <div className="project-heading">
        <span className="project-number">({project.number})</span>
        <div>
          <h3>{project.title}</h3>
          <p>{project.category}</p>
        </div>
        <span className="project-arrow" aria-hidden="true">↗</span>
      </div>
      <div className="project-visual">
        <ProjectImage src={project.image} alt={project.imageAlt} />
        <span className="project-source">EXPLORE PROJECT ↗</span>
      </div>
      <p className="project-summary">{project.summary}</p>
    </>
  )

  return (
    <article className={`project project-${index + 1} tone-${project.tone} reveal`}>
      <a href={routeHref(`/work/${project.id}/`)} className="project-link" data-cursor="VIEW">{content}</a>
    </article>
  )
}
