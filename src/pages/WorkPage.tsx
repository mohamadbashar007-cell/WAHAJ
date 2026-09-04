import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'
import { ProjectPreview } from '../components/ProjectPreview'
import { routeHref } from '../lib/paths'

export function WorkPage() {
  const [active, setActive] = useState(0)
  const touchStart = useRef(0)
  const choose = (index: number) => setActive(Math.max(0, Math.min(projects.length - 1, index)))
  useEffect(() => {
    const keys = (event: KeyboardEvent) => { if (event.key === 'ArrowRight') choose(active + 1); if (event.key === 'ArrowLeft') choose(active - 1) }
    window.addEventListener('keydown', keys); return () => window.removeEventListener('keydown', keys)
  }, [active])
  const project = projects[active]
  const href = project.link || routeHref(`/work/${project.id}`)
  return <main className="inner-page work-page">
    <section className="compact-hero"><span className="eyebrow">01 / SELECTED WORK</span><h1>IDEAS MADE<br /><span>VISIBLE.</span></h1><p>Brand systems, interfaces and digital products shaped by one connected creative process.</p></section>
    <section className="work-browser" aria-roledescription="carousel" aria-label="Selected projects" onTouchStart={(e) => { touchStart.current = e.touches[0].clientX }} onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - touchStart.current; if (Math.abs(d) > 45) choose(active + (d < 0 ? 1 : -1)) }}>
      <div className="work-browser-toolbar"><span aria-live="polite">{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><div className="work-dots">{projects.map((item, index) => <button key={item.id} className={index === active ? 'active' : ''} onClick={() => choose(index)} aria-label={`Show ${item.title}`} aria-current={index === active ? 'true' : undefined}>{String(index + 1).padStart(2, '0')}</button>)}</div></div>
      <article className="featured-project" key={project.id}><a href={href} target={project.link ? '_blank' : undefined} rel={project.link ? 'noreferrer' : undefined}><div className="featured-copy"><span>{project.category}</span><h2>{project.title}</h2><p>{project.summary}</p><strong>{project.link ? 'VIEW LIVE SITE ↗' : 'VIEW CASE STUDY →'}</strong></div><img src={project.image} alt={project.imageAlt} width="1280" height="800" /></a></article>
      <div className="work-controls"><button onClick={() => choose(active - 1)} disabled={active === 0}>← PREVIOUS</button><button onClick={() => choose(active + 1)} disabled={active === projects.length - 1}>NEXT →</button></div>
    </section>
    <section className="mobile-work-list" aria-label="All selected projects">{projects.map((item, index) => <ProjectPreview project={item} index={index} key={item.id} />)}</section>
    <section className="page-next"><span>NEXT / HOW WE BUILD</span><a href={routeHref('/development')}>EXPLORE DEVELOPMENT <i>↗</i></a></section>
  </main>
}
