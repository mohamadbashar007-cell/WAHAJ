import { Link } from './Link'
﻿import type { Project } from '../data/projects'
import { useLanguage } from '../lib/language'
import { ProjectImage } from './ProjectImage'
export function ProjectPreview({ project }: { project: Project; index?: number }) {
  const { language } = useLanguage(); const ar = language === 'ar'
  return <article className={`project-card tone-${project.tone} reveal`}><Link href={`/work/${project.id}`} className="project-card-link">
    <div className="project-card-image"><ProjectImage src={project.image} alt={ar ? project.imageAltAr : project.imageAlt} /></div>
    <div className="project-card-head"><span>{project.number}</span><div><h3 dir="ltr">{project.title}</h3><p>{ar ? project.categoryAr : project.category}</p></div><i aria-hidden="true">→</i></div>
    <p className="project-summary">{ar ? project.summaryAr : project.summary}</p><strong className="project-action">{ar ? 'اكتشف المشروع' : 'VIEW PROJECT'} <span aria-hidden="true">→</span></strong>
  </Link>{project.link && <Link className="project-live" href={project.link} target="_blank" rel="noopener noreferrer">{ar ? 'زيارة الموقع الحي' : 'VIEW LIVE SITE'} <span aria-hidden="true">↗</span><span className="sr-only"> — {project.title} ({ar ? 'تبويب جديد' : 'new tab'})</span></Link>}</article>
}
