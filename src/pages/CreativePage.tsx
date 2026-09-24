import { behanceProjects } from '../components/BehanceGallery'
import { ProjectImage } from '../components/ProjectImage'
import { MotionReel } from '../components/MotionReel'
import { ProcessPath } from '../components/ProcessPath'
import { Starburst } from '../components/Starburst'
import { assetPath } from '../lib/paths'
import { arabicImageCount, creativeProjectArabic, useLocale } from '../lib/i18n'

const creativeServices = [
  { title: 'BRAND DESIGN', copy: 'Identity, typography, art direction and brand guidelines.', outputs: ['STRATEGY', 'IDENTITY', 'TYPOGRAPHY', 'GUIDELINES'] },
  { title: 'VIDEO EDITING', copy: 'Campaign and social edits, pacing, color, sound and transitions.', outputs: ['CAMPAIGN FILMS', 'SOCIAL CUTS', 'COLOR', 'SOUND'] },
  { title: 'MOTION GRAPHICS', copy: 'Logo animation, kinetic type, title systems and loops.', outputs: ['LOGO MOTION', 'KINETIC TYPE', 'TITLES', 'LOOPS'] },
  { title: 'DIGITAL DESIGN', copy: 'UI/UX, prototypes, design systems and interaction design.', outputs: ['UI / UX', 'PROTOTYPES', 'DESIGN SYSTEMS', 'INTERACTION'] },
]

const portfolioWork = [
  {
    id: 'durra-product-campaign',
    title: 'DURRA',
    category: 'PRODUCT CAMPAIGN / MOTION',
    image: 'projects/creative/durra-social-hero.png',
    imageAlt: 'Durra Egyptian green olives campaign with Arabic headline, olive jar and spoon',
    summary: 'Social stills and product motion for Durra’s Egyptian green olives campaign.',
    focus: ['ART DIRECTION', 'SOCIAL CAMPAIGN', 'PRODUCT MOTION'],
  },
  {
    id: 'social-media-posts',
    title: 'SOCIAL MEDIA POSTS',
    category: 'SOCIAL MEDIA DESIGN',
    image: 'projects/creative/instagram-social-posts.png',
    imageAlt: 'Social media post designs created by Mazen Magdy',
    summary: 'Instagram post designs focused on hierarchy, typography and imagery.',
    focus: ['SOCIAL DESIGN', 'LAYOUT', 'ART DIRECTION'],
  },
  {
    id: 'vortex-retro-profile',
    title: 'VORTEX — RETRO PROFILE',
    category: 'EDITORIAL / COMPANY PROFILE',
    image: 'projects/creative/vortex-retro-profile.webp',
    imageAlt: 'Retro company profile design for Vortex by Mazen Magdy',
    summary: 'A retro company profile with expressive typography and editorial layouts.',
    focus: ['EDITORIAL DESIGN', 'TYPOGRAPHY', 'LAYOUT'],
  },
  {
    id: 'pain',
    title: 'PAIN',
    category: 'BOOK COVER DESIGN',
    image: 'projects/creative/pain-book-cover.webp',
    imageAlt: 'PAIN university book cover design by Mazen Magdy',
    summary: 'A university book-cover study about an internal feeling.',
    focus: ['COVER DESIGN', 'COMPOSITION', 'TYPOGRAPHY'],
  },
  {
    id: 'wesal-identity',
    title: 'WESAL',
    category: 'LOGO IDENTITY',
    image: 'projects/creative/wesal-identity.png',
    imageAlt: 'Wesal logo identity project by Mazen Magdy',
    summary: 'A bilingual logo identity and brand applications for a travel brand.',
    focus: ['LOGO DESIGN', 'IDENTITY', 'BRAND APPLICATION'],
  },
  {
    id: 'kroma-era',
    title: 'KROMA ERA',
    category: 'CLOTHING BRAND IDENTITY',
    image: 'projects/creative/kroma-era.png',
    imageAlt: 'Kroma Era clothing brand identity by Mazen Magdy',
    summary: 'A fashion identity with custom lettering and editorial direction.',
    focus: ['BRAND IDENTITY', 'CUSTOM TYPE', 'FASHION'],
  },
  {
    id: 'vortex-company-profile',
    title: 'VORTEX COMPANY PROFILE',
    category: 'CORPORATE EDITORIAL',
    image: 'projects/creative/vortex-company-profile.png',
    imageAlt: 'Vortex company profile project by Mazen Magdy',
    summary: 'A corporate profile with structured editorial layouts.',
    focus: ['COMPANY PROFILE', 'GRID SYSTEM', 'EDITORIAL'],
  },
]

const creativeProcess = [
  ['DISCOVER', 'GOAL / AUDIENCE / CONTEXT'],
  ['DIRECTION', 'CONCEPT / TYPE / COLOR'],
  ['PRODUCTION', 'DESIGN / EDIT / MOTION'],
  ['DELIVERY', 'FILES / FORMATS / GUIDELINES'],
]

export function CreativePage() {
  const { isArabic, t, href } = useLocale()
  const localizedServices = isArabic ? [
    { title: 'تصميم العلامات', copy: 'هوية، وخطوط، وإخراج فني، وأدلة استخدام العلامة.', outputs: ['استراتيجية', 'هوية', 'خطوط', 'دليل استخدام'] },
    { title: 'مونتاج الفيديو', copy: 'مونتاج للحملات والتواصل، وإيقاع، وألوان، وصوت، وانتقالات.', outputs: ['أفلام حملات', 'محتوى قصير', 'ألوان', 'صوت'] },
    { title: 'موشن جرافيك', copy: 'تحريك شعارات، ونصوص حركية، وأنظمة عناوين، ومقاطع حركة متكررة.', outputs: ['تحريك شعار', 'نصوص حركية', 'عناوين', 'مقاطع حركة متكررة'] },
    { title: 'التصميم الرقمي', copy: 'تجربة وواجهة مستخدم، ونماذج أولية، وأنظمة تصميم، وتفاعلات.', outputs: ['واجهة وتجربة', 'نماذج أولية', 'أنظمة تصميم', 'تفاعلات'] },
  ] : creativeServices
  const portfolioArabic: Record<string, { category: string; imageAlt: string; summary: string; focus: string[] }> = {
    'durra-product-campaign': { category: 'حملة منتج / موشن', imageAlt: 'حملة زيتون الدرة الأخضر مع العبوة والنص العربي', summary: 'تصاميم ثابتة وموشن لحملة زيتون الدرة الأخضر المصري.', focus: ['إخراج فني', 'حملة تواصل', 'موشن منتج'] },
    'social-media-posts': { category: 'تصميم منصات التواصل', imageAlt: 'مجموعة تصاميم لمنصات التواصل', summary: 'تصاميم إنستغرام تركّز على التسلسل البصري والخط والصورة.', focus: ['تصميم لمنصات التواصل', 'تكوين', 'إخراج فني'] },
    'vortex-retro-profile': { category: 'تحرير / بروفايل شركة', imageAlt: 'تصميم بروفايل ريترو لشركة فورتكس', summary: 'بروفايل شركة بطابع ريترو وخطوط تعبيرية وتكوينات تحريرية.', focus: ['تصميم تحريري', 'خطوط', 'تكوين'] },
    pain: { category: 'تصميم غلاف كتاب', imageAlt: 'تصميم غلاف كتاب PAIN', summary: 'دراسة غلاف كتاب جامعي تتناول شعورًا داخليًا.', focus: ['تصميم غلاف', 'تكوين', 'خطوط'] },
    'wesal-identity': { category: 'هوية شعار', imageAlt: 'مشروع هوية شعار وصال', summary: 'هوية شعار ثنائية اللغة وتطبيقات لعلامة سفر.', focus: ['تصميم شعار', 'هوية', 'تطبيقات العلامة'] },
    'kroma-era': { category: 'هوية علامة أزياء', imageAlt: 'هوية علامة كروما إيرا للأزياء', summary: 'هوية أزياء بحروف مخصصة واتجاه تحريري.', focus: ['هوية بصرية', 'حروف مخصصة', 'أزياء'] },
    'vortex-company-profile': { category: 'تصميم تحريري للشركات', imageAlt: 'مشروع بروفايل شركة فورتكس', summary: 'بروفايل شركة بتكوينات تحريرية منظمة.', focus: ['بروفايل شركة', 'نظام شبكي', 'تحرير'] },
  }
  const localizedProcess = isArabic ? [
    ['اكتشاف', 'الهدف / الجمهور / السياق'],
    ['التوجّه الإبداعي', 'الفكرة / الخط / اللون'],
    ['إنتاج', 'تصميم / مونتاج / موشن'],
    ['تسليم', 'ملفات / صيغ / أدلة'],
  ] : creativeProcess
  return (
    <main className="inner-page creative-page">
      <section className="page-hero creative-hero">
        <div className="page-hero-meta reveal"><span>03 / {t('CREATIVE', 'الإبداع')}</span><span>{t('DESIGN / EDIT / MOTION', 'تصميم / مونتاج / موشن')}</span></div>
        <h1 className="reveal">{t(<>DESIGN.<br /><span>EDIT.</span><br />MOTION.</>, <>تصميم.<br /><span>مونتاج.</span><br />موشن.</>)}</h1>
        <Starburst className="page-hero-mark" />
        <div className="kinetic-words" aria-hidden="true"><span>{t('DESIGN', 'تصميم')}</span><span>{t('EDIT', 'مونتاج')}</span><span>{t('MOTION', 'موشن')}</span></div>
      </section>

      <nav className="page-jump-nav" aria-label={t('Creative page sections', 'أقسام صفحة التصميم')}>
        <span>{t('EXPLORE', 'استكشف')}</span><a href={href('/design?section=services')}>{t('SERVICES', 'الخدمات')}</a><a href={href('/design?section=motion')}>{t('MOTION', 'موشن')}</a><a href={href('/design?section=visual-work')}>{t('SELECTED WORK', 'أعمال مختارة')}</a><a href={href('/design?section=creative-process')}>{t('PROCESS', 'طريقة العمل')}</a><a href={href('/contact')}>{t('START A PROJECT', 'ابدأ مشروعًا')} ↗</a>
      </nav>

      <section className="creative-services section-light" id="services">
        <header className="subpage-section-head reveal"><span>{t('SERVICES', 'الخدمات')}</span><h2>{t(<>BRAND, VIDEO<br />& DIGITAL.</>, <>علامات، فيديو<br />وتصميم رقمي.</>)}</h2></header>
        <div className="creative-service-list creative-service-detail-list">
          {localizedServices.map((service, index) => (
            <article className="reveal" key={service.title}>
              <span>0{index + 1}</span><h3>{service.title}</h3><p>{service.copy}</p>
              <ul>{service.outputs.map((output) => <li key={output}>{output}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="motion-stage section-dark" id="motion" aria-label={t('Motion design demonstration', 'عرض تصميم موشن')}>
        <div className="motion-stage-copy reveal"><span>{t('WAHAJ IN MOTION', 'وهج في حركة')}</span><h2>{t(<>FRAME.<br />RHYTHM.<br /><i>MOTION.</i></>, <>كادر.<br />إيقاع.<br /><i>حركة.</i></>)}</h2><p>{t('Our identity, energy and visual language brought to life through motion.', 'هويتنا وطاقتنا ولغتنا البصرية تتحوّل إلى حركة.')}</p><div className="motion-controls"><span>{t('WAHAJ / BRAND MOTION / SHOWREEL', 'وهج / موشن الهوية / عرض')}</span></div></div>
        <MotionReel />
      </section>

      <section className="portfolio-work section-dark" id="visual-work">
        <header className="subpage-section-head reveal"><span>{t('SELECTED WORK', 'أعمال مختارة')}</span><h2>{t(<>EDIT. MOVE.<br />DESIGN.</>, <>مونتاج. حركة.<br />تصميم.</>)}</h2></header>
        <p className="portfolio-work-intro reveal">{t('Post-production, motion graphics, campaign art direction and social design.', 'مرحلة ما بعد الإنتاج، وموشن جرافيك، وإخراج فني للحملات، وتصميم لمنصات التواصل.')}</p>
        <div className="portfolio-work-grid">
          {portfolioWork.map((item, index) => {
            const localized = isArabic ? portfolioArabic[item.id] : undefined
            return (
            <article className="portfolio-work-card reveal" key={item.title}>
              <a className="portfolio-work-image" href={href(`/design/${item.id}/`)} data-cursor={t('VIEW', 'شاهد')}>
                <ProjectImage src={assetPath(item.image)} alt={localized?.imageAlt || item.imageAlt} sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />
                <span>0{index + 1}</span>
              </a>
              <div className="portfolio-work-meta"><span>{localized?.category || item.category}</span><span>{t('WAHAJ / CREATIVE', 'وهج / إبداع')}</span></div>
              <h3><a href={href(`/design/${item.id}/`)}>{isArabic ? creativeProjectArabic[item.id] : item.title}</a></h3>
              <p>{localized?.summary || item.summary}</p>
              <ul className="creative-case-tags">{(localized?.focus || item.focus).map((focus) => <li key={focus}>{focus}</li>)}</ul>
              <a className="text-link project-detail-link" href={href(`/design/${item.id}/`)}>{t('EXPLORE PROJECT', 'استكشف المشروع')} / {item.id === 'durra-product-campaign' ? t('1 MOTION + ', 'موشن واحد + ') : ''}{isArabic ? arabicImageCount(behanceProjects.find(project => project.id === item.id)?.imageCount ?? 0) : `${behanceProjects.find(project => project.id === item.id)?.imageCount} IMAGES`} ↗</a>
            </article>
          )})}
        </div>
      </section>

      <section className="creative-process section-dark" id="creative-process">
        <header className="subpage-section-head reveal"><span>{t('THE CREATIVE PROCESS', 'العملية الإبداعية')}</span><h2>{t(<>FROM IDEA<br />TO DELIVERY.</>, <>من الفكرة<br />إلى التسليم.</>)}</h2></header>
        <ProcessPath steps={localizedProcess} tone="dark" />
      </section>

      <section className="page-next page-next-yellow reveal"><span>{t('NEED DESIGN OR MOTION?', 'تحتاج تصميمًا أو موشن؟')}</span><a href={href('/contact')}>{t('START A PROJECT', 'ابدأ مشروعًا')} <i>↗</i></a></section>
    </main>
  )
}
