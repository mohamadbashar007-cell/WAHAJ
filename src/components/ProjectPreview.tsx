import type { Project } from '../data/projects'
import { ProjectImage } from './ProjectImage'
import { projectArabic, useLocale } from '../lib/i18n'

export function ProjectPreview({ project, index }: { project: Project; index: number }) {
  const { isArabic, t, href } = useLocale()
  const localized = isArabic ? projectArabic[project.id] : undefined
  const content = (
    <>
      <div className="project-heading">
        <span className="project-number">({project.number})</span>
        <div>
          <h3>{localized?.title || project.title}</h3>
          <p>{localized?.category || project.category}</p>
        </div>
        <span className="project-arrow" aria-hidden="true">↗</span>
      </div>
      <div className="project-visual">
        <ProjectImage src={project.image} alt={localized?.imageAlt || project.imageAlt} />
        <span className="project-source">{t('EXPLORE PROJECT', 'استكشف المشروع')} ↗</span>
      </div>
      <p className="project-summary">{localized?.summary || project.summary}</p>
    </>
  )

  return (
    <article className={`project project-${index + 1} tone-${project.tone} reveal`}>
      <a href={href(project.detailPath || `/work/${project.id}/`)} className="project-link" data-cursor={t('VIEW', 'شاهد')}>{content}</a>
    </article>
  )
}
