import { useEffect, useRef, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Cursor } from './components/Cursor'
import { DesignCode } from './components/DesignCode'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Services } from './components/Services'
import { Starburst } from './components/Starburst'
import { Work } from './components/Work'
import { ContactPage } from './pages/ContactPage'
import { CreativeProjectPage } from './pages/CreativeProjectPage'
import { behanceProjects } from './components/BehanceGallery'
import { CreativePage } from './pages/CreativePage'
import { DevelopmentPage } from './pages/DevelopmentPage'
import { ProjectPage } from './pages/ProjectPage'
import { projects } from './data/projects'
import pageMeta from './data/page-meta.json'
import { appBase, readRoute, routeHref } from './lib/paths'
import { LocaleProvider, localeHref, parseLocalizedRoute } from './lib/i18n'

const marqueeItems = ['STRATEGY', 'IDENTITY', 'INTERFACE', 'CODE', 'EDIT']
const marqueeItemsArabic = ['استراتيجية', 'هوية', 'واجهات', 'برمجة', 'مونتاج']

function App() {
  const [route, setRoute] = useState(readRoute)
  const { locale, path, query } = parseLocalizedRoute(route)
  const isArabic = locale === 'ar'
  const metaPath = isArabic ? (path === '/' ? '/ar' : `/ar${path}`) : path
  const creativeProject = path.startsWith('/design/') ? behanceProjects.find(item => item.id === path.split('/')[2]) : undefined
  const previousPath = useRef(metaPath)
  const project = path.startsWith('/work/') ? projects.find(item => item.id === path.split('/')[2]) : undefined

  useEffect(() => {
    const syncRoute = () => {
      if (window.location.hash.startsWith('#/')) {
        const legacy = window.location.hash.slice(1)
        window.history.replaceState(null, '', routeHref(legacy === '/work' ? '/?section=work' : legacy))
      }
      setRoute(readRoute())
    }
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]')
      if (!link || link.target || link.hasAttribute('download')) return
      const href = link.getAttribute('href') || ''
      if (href.startsWith('#') && !href.startsWith('#/')) {
        const target = document.getElementById(href.slice(1))
        if (target) {
          event.preventDefault()
          target.scrollIntoView({ block: 'start' })
          if (link.classList.contains('skip-link')) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }) }
        }
        return
      }
      const url = new URL(link.href)
      if (url.origin !== window.location.origin || !url.pathname.startsWith(appBase.pathname)) return
      event.preventDefault()
      if (url.href === window.location.href) {
        const section = url.searchParams.get('section')
        if (section) document.getElementById(section)?.scrollIntoView({ block: 'start' })
        else window.scrollTo({ top: 0 })
        return
      }
      window.history.pushState(null, '', url)
      syncRoute()
    }
    window.addEventListener('popstate', syncRoute)
    window.addEventListener('hashchange', syncRoute)
    document.addEventListener('click', navigate)
    syncRoute()
    return () => {
      window.removeEventListener('popstate', syncRoute)
      window.removeEventListener('hashchange', syncRoute)
      document.removeEventListener('click', navigate)
    }
  }, [])

  useEffect(() => {
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          reveal.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })

    document.querySelectorAll('.reveal').forEach((element) => reveal.observe(element))
    return () => reveal.disconnect()
  }, [route])

  useEffect(() => {
    const section = new URLSearchParams(query).get('section')
    const frame = requestAnimationFrame(() => {
      if (section) document.getElementById(section)?.scrollIntoView({ block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
      if (previousPath.current !== metaPath) {
        const main = document.querySelector('main')
        main?.setAttribute('tabindex', '-1')
        main?.focus({ preventScroll: true })
      }
      previousPath.current = metaPath
    })
    return () => cancelAnimationFrame(frame)
  }, [route, query, metaPath])

  useEffect(() => {
    document.body.classList.toggle('contact-route', path === '/contact')
    document.body.classList.toggle('arabic-route', isArabic)
    document.documentElement.lang = isArabic ? 'ar' : 'en'
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    return () => { document.body.classList.remove('contact-route', 'arabic-route') }
  }, [path, isArabic])

  useEffect(() => {
    const meta = pageMeta[metaPath as keyof typeof pageMeta]
    document.title = meta?.title ?? (isArabic ? 'الصفحة غير موجودة — وهج' : 'Page not found — WAHAJ')
    const description = meta?.description ?? (isArabic ? 'استكشف أعمال وخدمات وهج المختارة.' : 'Explore selected work and services by WAHAJ.')
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  }, [metaPath, project, isArabic])

  const page = creativeProject ? <CreativeProjectPage id={creativeProject.id} /> : project ? <ProjectPage id={project.id} /> : path === '/development'
    ? <DevelopmentPage />
      : path === '/design'
        ? <CreativePage />
        : path === '/contact'
          ? <ContactPage />
          : path !== '/' ? <main className="case-hero section-dark"><p className="eyebrow">404 / {isArabic ? 'الصفحة غير موجودة' : 'PAGE NOT FOUND'}</p><h1>{isArabic ? <>هذه الصفحة<br />غير موجودة.</> : <>PAGE NOT<br />FOUND.</>}</h1><a className="text-link" href={localeHref('/', locale)}>{isArabic ? 'العودة للرئيسية' : 'BACK TO HOME'} ↗</a></main> : null

  if (page) {
    return (
      <LocaleProvider locale={locale}>
        <a className="skip-link" href="#main-content">{isArabic ? 'تخطَّ إلى المحتوى' : 'Skip to content'}</a>
        <Cursor />
        <Nav path={path} />
        <div id="main-content">{page}</div>
        <Footer />
      </LocaleProvider>
    )
  }

  return (
    <LocaleProvider locale={locale}>
      <a className="skip-link" href="#main-content">{isArabic ? 'تخطَّ إلى المحتوى' : 'Skip to content'}</a>
      <Cursor />
      <Nav path={path} />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <div className="marquee" aria-hidden="true">
          <div>
            {[...(isArabic ? marqueeItemsArabic : marqueeItems), ...(isArabic ? marqueeItemsArabic : marqueeItems), ...(isArabic ? marqueeItemsArabic : marqueeItems)].map((item, index) => (
              <span className="marquee-item" key={`${item}-${index}`}>{item}<Starburst tone="dark" /></span>
            ))}
          </div>
        </div>
        <Work />
        <Services />
        <DesignCode />
        <About />
        <Contact />
      </main>
      <Footer />
    </LocaleProvider>
  )
}

export default App
