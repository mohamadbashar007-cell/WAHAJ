import { additionalProjects, projects } from '../data/projects'
import { ProjectPreview } from './ProjectPreview'
import { useLocale } from '../lib/i18n'

export function Work() {
  const { isArabic, t, href } = useLocale()
  const additionalTypes: Record<string, string> = {
    'PHONICS ADVENTURE': 'تجربة تعليمية',
    KALEMA: 'تجربة منتج',
    'VORTEX — RETRO PROFILE': 'تحرير / علامة',
  }
  return (
    <section id="work" className="work-section section-light" aria-labelledby="work-title">
      <div className="section-intro reveal">
        <span className="eyebrow">01 / {t('SELECTED WORK', 'أعمال مختارة')}</span>
        <h2 id="work-title">{t(<>BRAND & DIGITAL<br />PROJECTS.</>, <>مشاريع العلامات<br />والمنتجات الرقمية.</>)}</h2>
        <p>{t('Identity, web and product work.', 'هويات، ومواقع، ومنتجات رقمية.')}</p>
      </div>
      <div className="project-list">
        {projects.map((project, index) => <ProjectPreview key={project.id} project={project} index={index} />)}
      </div>
      <div className="project-index reveal" aria-labelledby="more-work-title">
        <span className="eyebrow" id="more-work-title">{t('MORE PROJECTS', 'مشاريع أخرى')}</span>
        <div>
          {additionalProjects.map((project, index) => {
            const content = <>
              <span>{String(index + 6).padStart(2, '0')}</span>
              <strong>{project.title}</strong>
              <em>{isArabic ? additionalTypes[project.title] : project.type}</em>
              <i>→</i>
            </>

            return <a href={href(project.path)} key={project.title} data-cursor={t('OPEN', 'افتح')}>{content}</a>
          })}
        </div>
      </div>
    </section>
  )
}
