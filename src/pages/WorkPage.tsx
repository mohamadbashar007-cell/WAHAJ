import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'
import { Starburst } from '../components/Starburst'
import { routeHref } from '../lib/paths'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export function WorkPage() {
  const filmRef = useRef<HTMLElement>(null)
  const slideRefs = useRef<Array<HTMLElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    let frame = 0

    const renderFilm = () => {
      const film = filmRef.current
      if (!film) return

      const rect = film.getBoundingClientRect()
      const travel = Math.max(film.offsetHeight - window.innerHeight, 1)
      const timeline = clamp(-rect.top / travel, 0, 1) * (projects.length - 1)
      const nextActive = clamp(Math.round(timeline), 0, projects.length - 1)
      setActiveIndex((current) => current === nextActive ? current : nextActive)

      slideRefs.current.forEach((slide, index) => {
        if (!slide) return
        const delta = index - timeline
        const distance = Math.abs(delta)
        const incoming = delta > 0
        const opacity = distance > 1.02 ? 0 : incoming ? 1 - distance : 1 - distance * .58
        const translate = incoming ? delta * 18 : delta * 4
        const scale = incoming ? 1 - distance * .12 : 1 - distance * .07
        const rotate = incoming ? distance * 7 : 0

        slide.style.opacity = String(clamp(opacity, 0, 1))
        slide.style.transform = `perspective(1200px) translateY(${translate}vh) scale(${clamp(scale, .86, 1)}) rotateX(${rotate}deg)`
        slide.style.visibility = distance > 1.05 ? 'hidden' : 'visible'
        slide.style.pointerEvents = distance < .48 ? 'auto' : 'none'
        slide.style.zIndex = String(index + 1)
      })
    }

    const requestRender = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(renderFilm)
    }

    renderFilm()
    window.addEventListener('scroll', requestRender, { passive: true })
    window.addEventListener('resize', requestRender)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestRender)
      window.removeEventListener('resize', requestRender)
    }
  }, [])

  return (
    <main className="inner-page work-page">
      <section className="page-hero work-page-hero">
        <div className="page-hero-meta reveal"><span>01 / SELECTED WORK</span><span>SCROLL CONTROLS THE FILM</span></div>
        <h1 className="reveal">THE WORK<br /><span>COMES TO YOU.</span></h1>
        <div className="page-hero-bottom reveal">
          <p>One fixed frame. Every scroll reveals the next idea, system and experience.</p>
          <span>ENTER THE FILM ↓</span>
        </div>
        <Starburst className="page-hero-mark" />
      </section>

      <section
        className="work-film"
        ref={filmRef}
        style={{ height: `${(projects.length + 1) * 100}svh` }}
        aria-label="Selected projects controlled by scroll"
      >
        <div className="work-film-stage">
          <div className="work-film-hud" aria-hidden="true">
            <span>PLAYING / SELECTED WORK</span>
            <div><i style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }} /></div>
            <strong>{String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</strong>
          </div>

          {projects.map((project, index) => {
            const card = (
              <>
                <div className="work-slide-copy">
                  <span>({project.number}) / {project.category}</span>
                  <h2>{project.title}</h2>
                  <p>{project.summary}</p>
                </div>
                <div className="work-slide-image">
                  <img src={project.image} alt={project.imageAlt} />
                  <span>{project.link ? 'VIEW LIVE ↗' : 'SELECTED WORK'}</span>
                </div>
                <div className="work-slide-counter"><span>SCROLL TO ADVANCE</span><strong>{project.number} / {String(projects.length).padStart(2, '0')}</strong></div>
              </>
            )

            return (
              <article
                className={`work-slide work-slide-${index + 1}`}
                ref={(element) => { slideRefs.current[index] = element }}
                aria-hidden={activeIndex !== index}
                key={project.id}
              >
                {project.link
                  ? <a href={project.link} target="_blank" rel="noreferrer" data-cursor="VIEW">{card}</a>
                  : <div className="work-slide-inner">{card}</div>}
              </article>
            )
          })}
        </div>
      </section>

      <section className="page-next reveal">
        <span>NEXT / HOW WE BUILD</span>
        <a href={routeHref('/development')}>EXPLORE DEVELOPMENT <i>↗</i></a>
      </section>
    </main>
  )
}
