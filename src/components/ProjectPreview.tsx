import type { Project } from '../data/projects'

export function ProjectPreview({ project, index }: { project: Project; index: number }) {
  const content = (
    <>
      <div className="project-heading">
        <span className="project-number">({project.number})</span>
        <div>
          <h3>{project.title}</h3>
          <p>{project.category}</p>
        </div>
        <span className="project-arrow" aria-hidden="true">{project.link ? '↗' : '—'}</span>
      </div>
      <div className="project-visual">
        <img src={project.image} alt={project.imageAlt} loading={index > 0 ? 'lazy' : 'eager'} />
        <span className="project-source">{project.source}{project.link ? ' ↗' : ''}</span>
      </div>
      <p className="project-summary">{project.summary}</p>
    </>
  )

  return (
    <article className={`project project-${index + 1} tone-${project.tone} reveal`}>
      {project.link
        ? <a href={project.link} target="_blank" rel="noreferrer" className="project-link" data-cursor="VIEW">{content}</a>
        : <div className="project-link">{content}</div>}
    </article>
  )
}
