import { useEffect, useState } from 'react'
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
import { WorkPage } from './pages/WorkPage'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { LanguageContext, type Language } from './lib/language'

const readRoute = () => `${window.location.pathname}${window.location.search}`

function App() {
  const [route, setRoute] = useState(readRoute)
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem('wahaj-language') === 'ar' ? 'ar' : 'en')
  const [path, query = ''] = route.split('?')

  useEffect(() => {
    const handleRoute = () => setRoute(readRoute())
    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href]')
      if (!anchor || anchor.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin || (url.hash && url.pathname === window.location.pathname)) return
      event.preventDefault()
      window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`)
      handleRoute()
    }
    window.addEventListener('popstate', handleRoute)
    document.addEventListener('click', handleClick)
    return () => { window.removeEventListener('popstate', handleRoute); document.removeEventListener('click', handleClick) }
  }, [])

  useEffect(() => {
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target) }
    }), { threshold: 0.08 })
    const frame = requestAnimationFrame(() => document.querySelectorAll('.reveal').forEach((element) => reveal.observe(element)))
    return () => { cancelAnimationFrame(frame); reveal.disconnect() }
  }, [route])

  useEffect(() => {
    const section = new URLSearchParams(query).get('section')
    const frame = requestAnimationFrame(() => section ? document.getElementById(section)?.scrollIntoView({ block: 'start' }) : window.scrollTo({ top: 0 }))
    return () => cancelAnimationFrame(frame)
  }, [route, query])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('wahaj-language', language)
    const titles: Record<string, string> = {
      '/': language === 'ar' ? 'وهج — استراتيجية × تصميم × تقنية' : 'WAHAJ — Strategy × Design × Technology',
      '/work': language === 'ar' ? 'أعمالنا — وهج' : 'Selected Work — WAHAJ',
      '/development': language === 'ar' ? 'التطوير الرقمي — وهج' : 'Digital Development — WAHAJ',
      '/design': language === 'ar' ? 'التصميم والموشن — وهج' : 'Design + Motion — WAHAJ',
      '/contact': language === 'ar' ? 'ابدأ مشروعاً — وهج' : 'Start a Project — WAHAJ',
      '/privacy': language === 'ar' ? 'سياسة الخصوصية — وهج' : 'Privacy — WAHAJ',
    }
    document.title = path.startsWith('/work/') ? `${path.split('/').pop()?.toUpperCase()} — WAHAJ` : titles[path] ?? titles['/']
    const description = language === 'ar' ? 'وهج شركة إبداعية مستقلة تجمع بين الاستراتيجية والتصميم والتقنية.' : 'WAHAJ is an independent creative company combining strategy, design and technology.'
    const title = document.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${window.location.origin}${path}`)
  }, [path, language])

  const projectId = path.match(/^\/work\/([^/]+)$/)?.[1]
  const page = projectId ? <CaseStudyPage projectId={projectId} />
    : path === '/work' ? <WorkPage />
    : path === '/development' ? <DevelopmentPage />
    : path === '/design' ? <CreativePage />
    : path === '/contact' ? <ContactPage />
    : path === '/privacy' ? <main className="inner-page simple-page"><section><span className="eyebrow">PRIVACY</span><h1>{language === 'ar' ? 'سياسة الخصوصية' : 'PRIVACY POLICY'}</h1><p>{language === 'ar' ? 'نستخدم المعلومات التي ترسلها عبر نموذج التواصل للرد على طلبك فقط، ولا نبيع بياناتك أو نشاركها لأغراض تسويقية.' : 'We use the information submitted through the contact form only to respond to your enquiry. We do not sell it or share it for third-party marketing.'}</p></section></main> : null

  const shell = page
    ? <><a className="skip-link" href="#main-content">{language === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}</a><Cursor /><Nav /><div id="main-content" className="page-transition" key={path}>{page}</div><Footer /></>
    : <><a className="skip-link" href="#main-content">{language === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}</a><Cursor /><Nav /><main id="main-content" className="page-transition"><Hero /><Signal /><Work /><Services /><DesignCode /><About /><Contact /></main><Footer /></>

  return <LanguageContext.Provider value={{ language, toggleLanguage: () => setLanguage((value) => value === 'en' ? 'ar' : 'en') }}>{shell}</LanguageContext.Provider>
}

export default App
