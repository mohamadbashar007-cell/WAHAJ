import { Link } from './components/Link'
﻿import { useEffect, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Cursor } from './components/Cursor'
import { DesignCode } from './components/DesignCode'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Services } from './components/Services'
import { Signal } from './components/Signal'
import { Work } from './components/Work'
import { ContactPage } from './pages/ContactPage'
import { CreativePage } from './pages/CreativePage'
import { DevelopmentPage } from './pages/DevelopmentPage'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { LanguageContext, type Language } from './lib/language'
import { useRouter } from './lib/router'
import { useSeo } from './lib/seo'

function App() {
  const { route, path, transitioning } = useRouter()
  const [language, setLanguage] = useState<Language>(() => location.pathname.startsWith('/ar') ? 'ar' : 'en')
  useEffect(() => {
    const next = location.pathname.startsWith('/ar') ? 'ar' : 'en'
    setLanguage(next); document.documentElement.lang = next; document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'
    try { localStorage.setItem('wahaj-language', next) } catch { /* Storage is optional. */ }
  }, [route])
  useSeo(path, language)
  useEffect(() => {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target) }
    }), { threshold: 0.04 })
    document.querySelectorAll('.reveal').forEach(element => reveal.observe(element))
    return () => reveal.disconnect()
  }, [route, language])
  const ar = language === 'ar'
  const projectId = path.match(/^\/work\/([^/]+)$/)?.[1]
  const page = projectId ? <CaseStudyPage projectId={projectId} />
    : path === '/development' ? <DevelopmentPage />
    : path === '/design' ? <CreativePage />
    : path === '/contact' ? <ContactPage />
    : path === '/privacy' ? <main className="inner-page simple-page"><section><span className="eyebrow">{ar ? 'الخصوصية' : 'PRIVACY'}</span><h1>{ar ? 'سياسة الخصوصية' : 'PRIVACY POLICY'}</h1><p>{ar ? 'نستخدم اسمك وبريدك وتفاصيل مشروعك للرد على طلبك ومناقشة التعاون. لا نبيع بياناتك ولا نستخدمها للتسويق لدى جهات أخرى.' : 'We use your name, email and project details to respond to your enquiry and discuss working together. We do not sell your information or use it for third-party marketing.'}</p><p>{ar ? 'عند تفعيل خدمة النماذج، تعالج الخدمة بيانات الطلب لإيصالها إلى وهج. لا ترسل معلومات حساسة أو كلمات مرور. نحتفظ بتفضيل اللغة على جهازك فقط. يمكنك طلب تصحيح بياناتك أو حذفها عبر صفحة التواصل.' : 'When a form service is connected, it processes the enquiry to deliver it to WAHAJ. Please do not include sensitive information or passwords. Your language preference is stored only on your device. Contact us to request correction or deletion of your enquiry.'}</p><Link className="button button-yellow" href="/contact">{ar ? 'تواصل معنا' : 'CONTACT US'} ↗</Link></section></main>
    : path === '/' ? <main><Hero /><Signal /><Work /><Services /><DesignCode /><About /><Contact /></main>
    : <main className="simple-page"><section><span className="eyebrow">404</span><h1>{ar ? 'الصفحة غير موجودة' : 'PAGE NOT FOUND'}</h1><p>{ar ? 'قد يكون الرابط تغير. اكتشف أعمالنا من الصفحة الرئيسية.' : 'This link may have moved. Explore our projects from the homepage.'}</p><Link className="button button-yellow" href="/">{ar ? 'الرئيسية' : 'BACK TO HOME'} ↗</Link></section></main>
  const toggleLanguage = () => {
    const next = ar ? 'en' : 'ar'
    const url = new URL(location.href)
    url.pathname = next === 'ar' ? `/ar${path === '/' ? '' : path}` : path
    history.replaceState({ ...history.state, scrollY: window.scrollY }, '', url)
    setLanguage(next); window.dispatchEvent(new PopStateEvent('popstate'))
  }
  return <LanguageContext.Provider value={{ language, toggleLanguage }}>
    <Link className="skip-link" href="#main-content">{ar ? 'انتقل إلى المحتوى' : 'Skip to content'}</Link><Cursor /><Nav />
    <div id="main-content" tabIndex={-1} className={`page-transition${transitioning ? ' is-transitioning' : ''}`} key={path}>{page}</div><Footer />
    <span className="sr-only" role="status" aria-live="polite">{document.title}</span>
  </LanguageContext.Provider>
}
export default App
