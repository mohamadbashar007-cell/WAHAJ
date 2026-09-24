import { BehanceGallery, behanceProjects } from '../components/BehanceGallery'
import { creativeProjectArabic, useLocale } from '../lib/i18n'

export function CreativeProjectPage({ id }: { id: string }) {
  const { isArabic, t, href } = useLocale()
  const project = behanceProjects.find(item => item.id === id)
  if (!project) return null
  const next = behanceProjects[(behanceProjects.indexOf(project) + 1) % behanceProjects.length]
  const title = isArabic ? (creativeProjectArabic[id] || project.title) : project.title
  const nextTitle = isArabic ? (creativeProjectArabic[next.id] || next.title) : next.title
  return <main className="inner-page creative-project-page">
    <section className="case-hero section-dark">
      <a className="text-link" href={href('/design?section=visual-work')}>{isArabic ? '→' : '←'} {t('ALL DESIGN WORK', 'كل أعمال التصميم')}</a>
      <p className="eyebrow">{t('WAHAJ / DESIGN / MAZEN MAGDY', 'وهج / تصميم / مازن مجدي')}</p>
      <h1>{title}</h1>
      <p className="presentation-intro">{id === 'durra-product-campaign' ? t('Product motion and campaign imagery created for Durra.', 'موشن منتج وصور حملة صُمّمت لصالح الدرة.') : t('Select an image to enlarge it.', 'اختر أي صورة لتكبيرها.')}</p>
    </section>
    <BehanceGallery id={id} key={id} />
    <div className="case-next section-dark"><span className="eyebrow">{t('NEXT DESIGN PROJECT', 'مشروع التصميم التالي')}</span><a href={href(`/design/${next.id}/`)}>{nextTitle} ↗</a></div>
  </main>
}
