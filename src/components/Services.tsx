import { Starburst } from './Starburst'
import { useLocale } from '../lib/i18n'

export function Services() {
  const { isArabic, t, href } = useLocale()
  const services = isArabic ? [
    ['01', 'توجيه العلامة', 'استراتيجية العلامة، والهوية البصرية، والإخراج الفني، ودليل الاستخدام.', '/design'],
    ['02', 'التصميم الرقمي', 'تصميم المواقع، وتجربة المستخدم، وواجهات المنتجات.', '/design?section=services'],
    ['03', 'التطوير', 'مواقع متجاوبة، وتطبيقات ويب وموبايل.', '/development'],
    ['04', 'شراكة إبداعية', 'أفكار الحملات، ومواد الإطلاق، ودعم تصميمي مستمر.', '/contact'],
  ] : [
    ['01', 'BRAND DIRECTION', 'Brand strategy, visual identity, art direction and guidelines.', '/design'],
    ['02', 'DIGITAL DESIGN', 'Web design, UI/UX and product interface design.', '/design?section=services'],
    ['03', 'DEVELOPMENT', 'Responsive websites, web applications and mobile apps.', '/development'],
    ['04', 'CREATIVE PARTNERSHIP', 'Campaign concepts, launch assets and ongoing design support.', '/contact'],
  ]
  return (
    <section id="services" className="services-section section-dark" aria-labelledby="services-title">
      <header className="services-header reveal">
        <span className="eyebrow">02 / {t('WHAT WE DO', 'ماذا نقدّم')}</span>
        <h2 id="services-title">{t(<><span>DESIGN</span> +<br />DEVELOPMENT.</>, <><span>تصميم</span> +<br />تطوير.</>)}</h2>
        <Starburst className="services-burst" />
      </header>
      <div className="services-list">
        {services.map(([number, title, description, route]) => (
          <a href={href(route)} key={number} className="service-row reveal" data-cursor={t('OPEN', 'افتح')}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
            <i aria-hidden="true">↗</i>
          </a>
        ))}
      </div>
    </section>
  )
}
