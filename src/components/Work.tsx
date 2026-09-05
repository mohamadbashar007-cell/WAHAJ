import { Link } from './Link'
import { useLanguage } from '../lib/language'
import { additionalProjects, projects } from '../data/projects'
import { ProjectPreview } from './ProjectPreview'

export function Work() {
  const { t } = useLanguage()
  return <section id="work" className="work-section section-light" aria-labelledby="work-title">
    <div className="section-intro reveal"><span className="eyebrow">{t("01 / SELECTED WORK")}</span><h2 id="work-title">{t("WORK THAT")}<br />{t("LEAVES A MARK.")}</h2><p>{t("Brand systems, interfaces and digital experiences—built as one connected idea, with the thinking and craft visible in every frame.")}</p></div>
    <div className="project-grid">{projects.map((project, index) => <ProjectPreview key={project.id} project={project} index={index} />)}</div>
    <div className="project-index reveal"><span className="eyebrow">{t("MORE PROJECTS")}</span><div>{additionalProjects.map((project, index) => <Link href={project.href} key={project.title}><span>{String(index + 6).padStart(2, '0')}</span><strong>{project.title}</strong><em>{t(project.type)}</em><i>→</i></Link>)}</div></div>
  </section>
}
