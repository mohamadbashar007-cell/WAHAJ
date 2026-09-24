import { assetPath } from '../lib/paths'
import { useLocale } from '../lib/i18n'

export function About() {
  const { t } = useLocale()
  return (
    <section id="about" className="about-section section-light" aria-labelledby="about-title">
      <div className="about-top reveal">
        <span className="eyebrow">03 / {t('THE COMPANY', 'الشركة')}</span>
        <h2 id="about-title">{t(<>DESIGN AND<br /><span>DEVELOPMENT.</span></>, <>تصميم<br /><span>وتطوير.</span></>)}</h2>
      </div>
      <div className="about-grid reveal">
        <div className="logo-stamp">
          <img src={assetPath('/wahaj-logo-dark.png')} alt={t('Official WAHAJ logo', 'شعار وهج الرسمي')} loading="lazy" />
        </div>
        <p>{t('WAHAJ is a Cairo-based company providing brand design and digital development for clients worldwide.', 'وهج شركة مقرّها القاهرة، تقدّم تصميم العلامات والتطوير الرقمي لعملاء من مختلف أنحاء العالم.')}</p>
        <div className="company-pillars">
          <div><span>01</span><strong>{t('DEFINE THE SCOPE', 'نحدّد نطاق العمل')}</strong><p>{t('Start with the audience, the goal and the work that needs to be delivered.', 'نبدأ بالجمهور والهدف وما يجب أن يقدّمه المشروع.')}</p></div>
          <div><span>02</span><strong>{t('DESIGN & DEVELOP', 'نصمّم ونطوّر')}</strong><p>{t('Create the visual system, interface and working product.', 'نبني النظام البصري والواجهة والمنتج الفعلي.')}</p></div>
          <div><span>03</span><strong>{t('TEST & DELIVER', 'نختبر ونسلّم')}</strong><p>{t('Review, test and prepare the final files or product for launch.', 'نراجع ونختبر ونجهّز الملفات أو المنتج النهائي للإطلاق.')}</p></div>
        </div>
      </div>
    </section>
  )
}
