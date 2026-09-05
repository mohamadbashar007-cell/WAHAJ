import { Link } from '../components/Link'
﻿import { projects } from '../data/projects'
import { caseContent } from '../data/caseStudies'
import { ProjectImage } from '../components/ProjectImage'
import { useLanguage } from '../lib/language'
export function CaseStudyPage({ projectId }: { projectId: string }) {
  const { language } = useLanguage(); const ar = language === 'ar'; const lang = ar ? 1 : 0
  const index = projects.findIndex(item => item.id === projectId), project = projects[index]
  if (!project) return <main className="simple-page"><section><h1>{ar ? 'المشروع غير موجود' : 'PROJECT NOT FOUND'}</h1><Link href="/#work">{ar ? 'العودة للأعمال' : 'BACK TO SELECTED WORK'} →</Link></section></main>
  const content = caseContent[project.id]
  const previous = projects[(index - 1 + projects.length) % projects.length], next = projects[(index + 1) % projects.length]
  return <main className="case-study">
    <header className="case-hero"><Link className="case-back" href="/#work">{ar ? 'العودة للأعمال' : 'SELECTED WORK'} ↗</Link><span>{project.number} / {ar ? 'تفاصيل المشروع' : 'PROJECT OVERVIEW'}</span><h1 dir="ltr">{project.title}</h1><p>{ar ? project.summaryAr : project.summary}</p></header>
    <figure className="case-cover"><ProjectImage src={project.image} alt={ar ? project.imageAltAr : project.imageAlt} eager sizes="(max-width: 1600px) 92vw, 1440px" /><figcaption>{ar ? project.categoryAr : project.category}</figcaption></figure>
    <section className="case-facts" aria-label={ar ? 'معلومات المشروع' : 'Project details'}><div><span>{ar ? 'المشروع / العلامة' : 'PROJECT / BRAND'}</span><strong dir="ltr">{project.title}</strong></div><div><span>{ar ? 'الخدمات' : 'SERVICES'}</span><strong>{ar ? project.categoryAr : project.category}</strong></div><div><span>{ar ? 'دور وهج' : 'WAHAJ ROLE'}</span><strong>{content.role[lang]}</strong></div></section>
    <section className="case-story">{[[ar ? 'التحدي' : 'THE CHALLENGE', content.challenge], [ar ? 'الفكرة والقرارات' : 'DESIGN DECISIONS', content.approach], [ar ? 'ما تم تقديمه' : 'THE DELIVERY', content.delivery]].map(([heading, copy], i) => <article key={i}><span>0{i + 1}</span><h2>{heading as string}</h2><p>{(copy as [string, string])[lang]}</p></article>)}</section>
    {content.gallery?.map(item => <figure className="case-cover" key={item.src}><ProjectImage src={item.src} alt={ar ? item.altAr : item.alt} sizes="92vw" /><figcaption>{ar ? item.altAr : item.alt}</figcaption></figure>)}
    {content.stack && <section className="case-technologies"><h2>{ar ? 'التقنيات المستخدمة' : 'BUILT WITH'}</h2><ul>{content.stack.map(item => <li key={item} dir="ltr">{item}</li>)}</ul></section>}
    {project.link && <Link className="case-live button button-yellow" href={project.link} target="_blank" rel="noopener noreferrer">{ar ? 'زيارة الموقع الحي' : 'VIEW LIVE SITE'} ↗</Link>}
    <nav className="case-pagination" aria-label={ar ? 'التنقل بين المشاريع' : 'Project navigation'}><Link href={`/work/${previous.id}`}><small>{ar ? 'المشروع السابق' : 'PREVIOUS PROJECT'}</small>{previous.title}</Link><Link href="/contact">{ar ? 'ابدأ مشروعاً مشابهاً' : 'START A SIMILAR PROJECT'} ↗</Link><Link href={`/work/${next.id}`}><small>{ar ? 'المشروع التالي' : 'NEXT PROJECT'}</small>{next.title}</Link></nav>
  </main>
}
