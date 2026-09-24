import { BehanceGallery } from '../components/BehanceGallery'
import { projects } from '../data/projects'
import { caseStudies } from '../data/case-studies'
import { ProjectImage } from '../components/ProjectImage'
import { assetPath } from '../lib/paths'
import { caseStudyArabic, projectArabic, useLocale } from '../lib/i18n'

export function ProjectPage({ id }: { id: string }) {
  const { isArabic, t, href } = useLocale()
  const project = projects.find(item => item.id === id)
  const study = caseStudies[id]
  if (!project || !study) return null
  const galleryId = ({ wesal: 'wesal-identity', 'kroma-era': 'kroma-era', pain: 'pain' } as Record<string, string>)[id]
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  const localizedProject = isArabic ? projectArabic[id] : undefined
  const localizedStudy = isArabic ? caseStudyArabic[id] : undefined
  const title = localizedProject?.title || project.title
  const nextTitle = (isArabic ? projectArabic[next.id]?.title : undefined) || next.title
  return <main className="inner-page case-page">
    <section className="case-hero section-dark">
      <a className="text-link" href={href('/?section=work')}>{isArabic ? '→' : '←'} {t('ALL WORK', 'كل الأعمال')}</a>
      <p className="eyebrow">{localizedProject?.category || project.category}</p>
      <h1>{title}</h1>
      <div className="case-hero-bottom"><p>{localizedProject?.summary || project.summary}</p>{project.link && <a className="text-link" href={project.link} target="_blank" rel="noreferrer">{t('VISIT LIVE SITE', 'زيارة الموقع')} ↗</a>}</div>
    </section>
    <div className="case-cover"><ProjectImage src={project.image} alt={localizedProject?.imageAlt || project.imageAlt} loading="eager" sizes="100vw" /></div>
    <section className="case-story section-light">
      <div className="reveal"><span className="eyebrow">01 / {t('THE BRIEF', 'الموجز')}</span><h2>{t(<>PROJECT<br />BRIEF.</>, <>موجز<br />المشروع.</>)}</h2><p>{localizedStudy?.brief || study.brief}</p></div>
      <div className="reveal"><span className="eyebrow">02 / {t('THE APPROACH', 'المنهج')}</span><h2>{t(<>DESIGN<br />APPROACH.</>, <>منهج<br />التصميم.</>)}</h2><p>{localizedStudy?.approach || study.approach}</p></div>
      <div className="case-deliverables reveal"><span className="eyebrow">03 / {t('PROJECT SCOPE', 'نطاق المشروع')}</span><ul>{(localizedStudy?.deliverables || study.deliverables).map(item => <li key={item}>{item}</li>)}</ul></div>
    </section>
    {galleryId ? <BehanceGallery id={galleryId} key={galleryId} /> : study.gallery?.map((item, index) => <figure className="case-gallery reveal" key={item.image}><ProjectImage src={assetPath(item.image)} alt={isArabic ? `${title} — صورة ${index + 1}` : item.alt} sizes="100vw" /><figcaption>{isArabic ? `${title} — صورة من المشروع` : item.alt}</figcaption></figure>)}
    <section className="page-next page-next-yellow reveal"><span>{t('START A SIMILAR PROJECT', 'ابدأ مشروعًا مشابهًا')}</span><a href={href(`/contact/?project=${project.id}`)}>{t('SEND A BRIEF', 'أرسل موجزًا')} <i>↗</i></a></section>
    <div className="case-next section-dark"><span className="eyebrow">{t('NEXT PROJECT', 'المشروع التالي')}</span><a href={href(`/work/${next.id}/`)}>{nextTitle} ↗</a></div>
  </main>
}
