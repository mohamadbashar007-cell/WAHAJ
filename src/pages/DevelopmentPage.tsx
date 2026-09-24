import { Starburst } from '../components/Starburst'
import { ProjectImage } from '../components/ProjectImage'
import { ProcessPath } from '../components/ProcessPath'
import { caseStudies } from '../data/case-studies'
import { assetPath } from '../lib/paths'
import { useLocale } from '../lib/i18n'

const capabilities = [
  ['01', 'WEBSITES', 'Corporate, editorial and campaign websites.'],
  ['02', 'WEB APPLICATIONS', 'Dashboards, portals and custom web products.'],
  ['03', 'MOBILE APPS', 'iOS and Android applications, from UX to deployment.'],
  ['04', 'DIGITAL PLATFORMS', 'Systems for content, users, services and data.'],
  ['05', 'INTERACTIVE EXPERIENCES', 'Motion, transitions and frontend interactions.'],
]

const digitalCases = [
  {
    id: 'zaman', number: '01', title: 'ZAMAN', type: 'BILINGUAL CORPORATE WEBSITE', image: assetPath('/projects/zaman.png'),
    summary: 'A bilingual corporate website for industrial supplies and food materials.',
    build: 'Responsive product catalog, Arabic and English content, navigation and PDF documents.',
    stack: ['JavaScript', 'React', 'Vite', 'CSS', 'PDF.js'], link: 'https://zaman-eg.com',
  },
  {
    id: 'segybc', number: '02', title: 'SEGYBC', type: 'INSTITUTIONAL DIGITAL PLATFORM', image: assetPath('/projects/segybc.png'),
    summary: 'A bilingual institutional platform for council news, opportunities, members and activities.',
    build: 'Content structure, Arabic and English interfaces, responsive UI, routing and motion.',
    stack: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Motion'], link: 'https://segybc.com',
  },
  {
    id: 'wesal', number: '03', title: 'WESAL', type: 'LUXURY TRAVEL EXPERIENCE', image: assetPath('/projects/wesal.png'),
    summary: 'A bilingual website for the Wesal travel brand.',
    build: 'Art direction, bilingual layouts, responsive frontend and motion.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Vite'],
  },
  {
    id: 'phonics', number: '04', title: 'PHONICS ADVENTURE', type: 'INTERACTIVE LEARNING APPLICATION', image: assetPath('/projects/phonics.png'),
    summary: 'A phonics learning application with guided levels, activities, audio and progress tracking.',
    build: 'Learning flows, audio, progress tracking, typed data and database architecture.',
    stack: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'tRPC', 'PostgreSQL'],
  },
  {
    id: 'kalema', number: '05', title: 'KALEMA', type: 'ASSESSMENT & ABILITY PLATFORM', image: assetPath('/projects/kalema.png'),
    summary: 'An Arabic-first bilingual platform for ability assessments and result reports.',
    build: 'Accounts, assessment logic, result profiles, reports and bilingual UI.',
    stack: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'PostgreSQL'], link: 'https://exams.ibnhanbal.org',
  },
]

const process = [
  ['DISCOVER', 'GOAL / AUDIENCE / SCOPE'],
  ['ARCHITECT', 'CONTENT / FLOWS / STRUCTURE'],
  ['DESIGN', 'INTERFACE / MOTION / STATES'],
  ['BUILD', 'CLEAN / REUSABLE / FAST'],
  ['VERIFY', 'ACCESSIBILITY / PERFORMANCE / LAUNCH'],
]

export function DevelopmentPage() {
  const { isArabic, t, href } = useLocale()
  const localizedCapabilities = isArabic ? [
    ['01', 'المواقع', 'مواقع شركات، ومواقع تحريرية، وصفحات حملات.'],
    ['02', 'تطبيقات الويب', 'لوحات تحكم، وبوابات، ومنتجات ويب مخصصة.'],
    ['03', 'تطبيقات الموبايل', 'تطبيقات iOS وAndroid، من تجربة المستخدم حتى النشر.'],
    ['04', 'المنصات الرقمية', 'أنظمة للمحتوى والمستخدمين والخدمات والبيانات.'],
    ['05', 'التجارب التفاعلية', 'موشن وانتقالات وتفاعلات واجهات أمامية.'],
  ] : capabilities
  const digitalArabic: Record<string, { title?: string; type: string; summary: string; build: string }> = {
    zaman: { title: 'زمان', type: 'موقع شركة ثنائي اللغة', summary: 'موقع شركة ثنائي اللغة للتوريدات الصناعية والمواد الغذائية.', build: 'كتالوج منتجات متجاوب، ومحتوى عربي وإنجليزي، وتنقّل واضح، وعرض مستندات PDF.' },
    segybc: { type: 'منصة مؤسسية رقمية', summary: 'منصة مؤسسية ثنائية اللغة لأخبار المجلس وفرصه وأعضائه وأنشطته.', build: 'هيكلة المحتوى، وواجهات عربية وإنجليزية، وتصميم متجاوب، ومسارات، وحركة.' },
    wesal: { title: 'وصال', type: 'تجربة سفر فاخرة', summary: 'موقع ثنائي اللغة لعلامة وصال للسفر.', build: 'إخراج فني، وتكوينات ثنائية اللغة، وواجهة متجاوبة، وحركة.' },
    phonics: { title: 'مغامرة الأصوات', type: 'تطبيق تعليمي تفاعلي', summary: 'تطبيق لتعلّم الأصوات بمستويات وأنشطة موجهة وصوت وتتبع للتقدّم.', build: 'مسارات تعلم، وصوت، وتتبع للتقدّم، وبيانات محددة الأنواع، وبنية قاعدة بيانات.' },
    kalema: { title: 'كلمة', type: 'منصة تقييم قدرات', summary: 'منصة ثنائية اللغة تبدأ بالعربية لتقييم القدرات وإصدار تقارير النتائج.', build: 'حسابات، ومنطق تقييم، وملفات نتائج، وتقارير، وواجهة ثنائية اللغة.' },
  }
  const localizedProcess = isArabic ? [
    ['اكتشاف', 'الهدف / الجمهور / النطاق'],
    ['هندسة', 'المحتوى / المسارات / الهيكل'],
    ['تصميم', 'الواجهة / الحركة / الحالات'],
    ['تطوير', 'كود منظم / قابل لإعادة الاستخدام / سريع'],
    ['تحقّق', 'إمكانية الوصول / أداء / إطلاق'],
  ] : process
  return (
    <main className="inner-page development-page">
      <section className="page-hero development-hero">
        <div className="page-hero-meta reveal"><span>02 / {t('DEVELOPMENT', 'التطوير')}</span><span>{t('WEBSITES / WEB APPS / MOBILE APPS / PLATFORMS', 'مواقع / تطبيقات ويب / تطبيقات موبايل / منصات')}</span></div>
        <h1 className="reveal">{t(<>DIGITAL<br /><span>PRODUCTS.</span><br />DESIGNED & BUILT.</>, <>منتجات<br /><span>رقمية.</span><br />نصمّمها ونطوّرها.</>)}</h1>
        <p className="page-hero-statement reveal">{t('Strategy, UI/UX and development in one process.', 'استراتيجية وتجربة مستخدم وتصميم وتطوير ضمن عملية واحدة.')}</p>
        <Starburst className="page-hero-mark" />
      </section>

      <nav className="page-jump-nav" aria-label={t('Development page sections', 'أقسام صفحة التطوير')}>
        <span>{t('EXPLORE', 'استكشف')}</span><a href={href('/development?section=capabilities')}>{t('CAPABILITIES', 'قدراتنا')}</a><a href={href('/development?section=digital-work')}>{t('PROJECTS', 'المشاريع')}</a><a href={href('/development?section=process')}>{t('PROCESS', 'طريقة العمل')}</a><a href={href('/contact')}>{t('START A PROJECT', 'ابدأ مشروعًا')} ↗</a>
      </nav>

      <section className="capability-section section-light" id="capabilities">
        <header className="subpage-section-head reveal"><span>{t('WHAT WE BUILD', 'ما الذي نطوّره')}</span><h2>{t(<>WEB, MOBILE<br />& PLATFORMS.</>, <>مواقع، تطبيقات<br />ومنصات.</>)}</h2></header>
        <div className="capability-list">
          {localizedCapabilities.map(([number, title, copy]) => (
            <article className="capability-row reveal" key={number}>
              <span>{number}</span><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="development-projects section-dark" id="digital-work">
        <header className="subpage-section-head reveal"><span>{t('BUILT & SHIPPED', 'صمّمناها وأطلقناها')}</span><h2>{t(<>SELECTED DIGITAL<br />PROJECTS.</>, <>مشاريع رقمية<br />مختارة.</>)}</h2></header>
        <div className="development-case-list">
          {digitalCases.map((project) => {
            const localized = isArabic ? digitalArabic[project.id] : undefined
            return (
            <article className="development-case reveal" id={project.id} key={project.id}>
              <header><span>{project.number}</span><div><h3>{localized?.title || project.title}</h3><p>{localized?.type || project.type}</p></div>{project.link && <a href={project.link} target="_blank" rel="noreferrer">{t('VIEW LIVE', 'شاهد الموقع')} ↗</a>}</header>
              <div className="development-case-image"><ProjectImage src={project.image} alt={t(`${project.title} website interface`, `واجهة مشروع ${localized?.title || project.title}`)} /></div>
              <div className="development-case-detail">
                <p className="case-lead">{localized?.summary || project.summary}</p>
                <div><span>{t('WHAT WE BUILT', 'ما الذي بنيناه')}</span><p>{localized?.build || project.build}</p></div>
                <div className="case-stack"><span>{t('LANGUAGES & STACK', 'اللغات والتقنيات')}</span><ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></div>
              </div>
              {caseStudies[project.id] && <a className="text-link project-detail-link" href={href(`/work/${project.id}/`)}>{t('EXPLORE PROJECT', 'استكشف المشروع')} ↗</a>}
            </article>
          )})}
        </div>
      </section>

      <section className="process-section section-light" id="process">
        <header className="subpage-section-head reveal"><span>{t('THE PROCESS', 'طريقة العمل')}</span><h2>{t(<>FROM SCOPE<br />TO LAUNCH.</>, <>من تحديد نطاق العمل<br />إلى الإطلاق.</>)}</h2></header>
        <ProcessPath steps={localizedProcess} tone="light" />
      </section>

      <section className="page-next page-next-yellow reveal"><span>{t('WEB / MOBILE / PLATFORM', 'مواقع / موبايل / منصات')}</span><a href={href('/contact')}>{t('START A PROJECT', 'ابدأ مشروعًا')} <i>↗</i></a></section>
    </main>
  )
}
