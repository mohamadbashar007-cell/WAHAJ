import { additionalProjects, projects } from '../data/projects'
import { ProjectPreview } from './ProjectPreview'
import { assetPath } from '../lib/paths'

export function Work() {
  return (
    <section id="work" className="work-section section-light" aria-labelledby="work-title">
      <div className="section-intro reveal">
        <span className="eyebrow">01 / SELECTED WORK</span>
        <h2 id="work-title">WORK THAT<br />LEAVES A MARK.</h2>
        <p>Brand systems, interfaces and digital experiences—built as one connected idea.</p>
      </div>
      <div className="brand-axis reveal" aria-label="The WAHAJ creative process">
        <div className="brand-axis-logo"><img src={assetPath('/wahaj-logo.png')} alt="WAHAJ official logo" /></div>
        <div className="brand-axis-flow">
          <span>IDEA</span><i>→</i><span>SPARK</span><i>→</i><span>ENERGY</span><i>→</i><strong>IMPACT</strong>
        </div>
        <p>THE MARK ISN'T A DECORATION.<br />IT'S HOW WE THINK.</p>
      </div>
      <div className="project-list">
        {projects.map((project, index) => <ProjectPreview key={project.id} project={project} index={index} />)}
      </div>
      <div className="project-index reveal" aria-labelledby="more-work-title">
        <span className="eyebrow" id="more-work-title">MORE PROJECTS</span>
        <div>
          {additionalProjects.map((project, index) => {
            const content = <>
              <span>{String(index + 6).padStart(2, '0')}</span>
              <strong>{project.title}</strong>
              <em>{project.type}</em>
              <i>→</i>
            </>

            return <a href={project.href} key={project.title} data-cursor="OPEN">{content}</a>
          })}
        </div>
      </div>
    </section>
  )
}
