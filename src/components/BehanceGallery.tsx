import { useRef, useState } from 'react'
import importedProjects from '../data/behance-projects.json'
import { assetPath } from '../lib/paths'

export const behanceProjects = importedProjects

export function BehanceGallery({ id }: { id: string }) {
  const project = behanceProjects.find(item => item.id === id)
  const dialog = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState(0)
  if (!project) return null
  const images = project.rows.flat()
  const current = images[active]
  let offset = 0
  const step = (direction: number) => {
    setActive(index => (index + direction + images.length) % images.length)
    dialog.current?.scrollTo({ top: 0, behavior: 'instant' })
  }
  return <section className="behance-presentation" aria-label={`${project.title} complete gallery`}>
    <div className="presentation-bar"><span>THE COMPLETE PROJECT / {images.length} IMAGES</span></div>
    <div className="presentation-images">
      {project.rows.map((row, rowIndex) => {
        const start = offset
        offset += row.length
        return <div className={`presentation-row${row.length > 1 ? ' presentation-collection' : ''}`} key={rowIndex}>
          {row.map((item, index) => <button type="button" className="presentation-image" key={item.src} aria-label={`Enlarge ${item.alt}`} onClick={() => { setActive(start + index); dialog.current?.showModal() }}>
            <img src={assetPath(item.src)} srcSet={`${assetPath(item.small)} ${item.smallWidth}w, ${assetPath(item.src)} ${item.width}w`} sizes={row.length > 1 ? '(max-width: 600px) 100vw, 50vw' : '(max-width: 1440px) 100vw, 1400px'} width={item.width} height={item.height} alt={item.alt} loading={rowIndex === 0 ? 'eager' : 'lazy'} decoding="async" />
          </button>)}
        </div>
      })}
    </div>
    <dialog ref={dialog} className="presentation-lightbox" aria-label={`${project.title} image viewer`} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }} onKeyDown={event => { if (event.key === 'ArrowRight') step(1); if (event.key === 'ArrowLeft') step(-1) }}>
      <div className="lightbox-toolbar"><span>{active + 1} / {images.length}</span><div><button onClick={() => step(-1)} aria-label="Previous image">←</button><button onClick={() => step(1)} aria-label="Next image">→</button><button autoFocus onClick={() => dialog.current?.close()} aria-label="Close image viewer">CLOSE ×</button></div></div>
      <img src={assetPath(current.src)} width={current.width} height={current.height} alt={current.alt} />
    </dialog>
  </section>
}
