import { useRef, useState } from 'react'
import importedProjects from '../data/behance-projects.json'
import { assetPath } from '../lib/paths'
import { MotionReel } from './MotionReel'
import { arabicImageCount, creativeProjectArabic, useLocale } from '../lib/i18n'

export const behanceProjects = importedProjects

export function BehanceGallery({ id }: { id: string }) {
  const { isArabic, t } = useLocale()
  const project = behanceProjects.find(item => item.id === id)
  const dialog = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState(0)
  if (!project) return null
  const images = project.rows.flat()
  const current = images[active]
  const projectTitle = isArabic ? (creativeProjectArabic[id] || project.title) : project.title
  let offset = 0
  const step = (direction: number) => {
    setActive(index => (index + direction + images.length) % images.length)
    dialog.current?.scrollTo({ top: 0, behavior: 'instant' })
  }
  return <section className="behance-presentation" aria-label={t(`${project.title} complete gallery`, `المعرض الكامل لمشروع ${projectTitle}`)}>
    <div className="presentation-bar"><span>{t('THE COMPLETE PROJECT', 'المشروع كاملًا')} / {id === 'durra-product-campaign' ? t(`1 MOTION + ${images.length} IMAGES`, `فيديو موشن واحد + ${arabicImageCount(images.length)}`) : t(`${images.length} IMAGES`, arabicImageCount(images.length))}</span></div>
    {id === 'durra-product-campaign' && <div className="presentation-motion">
      <div className="presentation-motion-copy">
        <span>01 / {t('PRODUCT MOTION', 'موشن المنتج')}</span>
        <h2>{t(<>THE CAMPAIGN<br />IN MOTION.</>, <>الحملة<br />تتحرّك.</>)}</h2>
        <p>{t('Arabic copy, food imagery and product shots combined into a social-first reel for Durra.', 'نص عربي وصور طعام ولقطات منتج تجتمع في فيديو قصير صُمّم لمنصات التواصل لصالح الدرة.')}</p>
      </div>
      <MotionReel
        source="/projects/motion/durra-product-reel.mp4"
        poster="/projects/optimized/creative-durra-social-hero-large.webp"
        label={t('DURRA — PRODUCT REEL', 'الدرة — موشن المنتج')}
        ariaLabel={t('Durra product campaign motion reel', 'فيديو موشن لحملة منتجات الدرة')}
        variant="durra"
      />
    </div>}
    <div className="presentation-images">
      {project.rows.map((row, rowIndex) => {
        const start = offset
        offset += row.length
        return <div className={`presentation-row${row.length > 1 ? ' presentation-collection' : ''}`} key={rowIndex}>
          {row.map((item, index) => <button type="button" className="presentation-image" key={item.src} aria-label={t(`Enlarge ${item.alt}`, `تكبير صورة ${start + index + 1} من مشروع ${projectTitle}`)} onClick={() => { setActive(start + index); dialog.current?.showModal() }}>
            <img src={assetPath(item.src)} srcSet={`${assetPath(item.small)} ${item.smallWidth}w, ${assetPath(item.src)} ${item.width}w`} sizes={row.length > 1 ? '(max-width: 600px) 100vw, 50vw' : '(max-width: 1440px) 100vw, 1400px'} width={item.width} height={item.height} alt={isArabic ? `${projectTitle} — صورة ${start + index + 1}` : item.alt} loading={rowIndex === 0 ? 'eager' : 'lazy'} decoding="async" />
          </button>)}
        </div>
      })}
    </div>
    <dialog ref={dialog} className="presentation-lightbox" aria-label={t(`${project.title} image viewer`, `عارض صور ${projectTitle}`)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }} onKeyDown={event => { if (event.key === 'ArrowRight') step(isArabic ? -1 : 1); if (event.key === 'ArrowLeft') step(isArabic ? 1 : -1) }}>
      <div className="lightbox-toolbar"><span>{active + 1} / {images.length}</span><div><button onClick={() => step(-1)} aria-label={t('Previous image', 'الصورة السابقة')}>{isArabic ? '→' : '←'}</button><button onClick={() => step(1)} aria-label={t('Next image', 'الصورة التالية')}>{isArabic ? '←' : '→'}</button><button autoFocus onClick={() => dialog.current?.close()} aria-label={t('Close image viewer', 'إغلاق عارض الصور')}>{t('CLOSE', 'إغلاق')} ×</button></div></div>
      <img src={assetPath(current.src)} width={current.width} height={current.height} alt={isArabic ? `${projectTitle} — صورة ${active + 1}` : current.alt} />
    </dialog>
  </section>
}
