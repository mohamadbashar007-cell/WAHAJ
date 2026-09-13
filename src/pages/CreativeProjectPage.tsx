import { BehanceGallery, behanceProjects } from '../components/BehanceGallery'
import { routeHref } from '../lib/paths'

export function CreativeProjectPage({ id }: { id: string }) {
  const project = behanceProjects.find(item => item.id === id)
  if (!project) return null
  const next = behanceProjects[(behanceProjects.indexOf(project) + 1) % behanceProjects.length]
  return <main className="inner-page creative-project-page">
    <section className="case-hero section-dark">
      <a className="text-link" href={routeHref('/design?section=visual-work')}>← ALL DESIGN WORK</a>
      <p className="eyebrow">WAHAJ / DESIGN / MAZEN MAGDY</p>
      <h1>{project.title}</h1>
      <p className="presentation-intro">Explore the complete visual story. Select any image for a closer look.</p>
    </section>
    <BehanceGallery id={id} key={id} />
    <div className="case-next section-dark"><span className="eyebrow">NEXT DESIGN PROJECT</span><a href={routeHref(`/design/${next.id}/`)}>{next.title} ↗</a></div>
  </main>
}
