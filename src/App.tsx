import { useEffect, useState } from 'react'
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
import { CreativePage } from './pages/CreativePage'
import { DevelopmentPage } from './pages/DevelopmentPage'
import { WorkPage } from './pages/WorkPage'

const marqueeItems = ['STRATEGY', 'IDENTITY', 'INTERFACE', 'CODE', 'IMPACT']

const readRoute = () => window.location.hash.startsWith('#/') ? window.location.hash.slice(1) : '/'

function App() {
  const [route, setRoute] = useState(readRoute)
  const [path, query = ''] = route.split('?')

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.startsWith('#/')) setRoute(readRoute())
      else if (window.location.hash === '#work') setRoute('/')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
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
      else window.scrollTo({ top: 0 })
    })
    return () => cancelAnimationFrame(frame)
  }, [route, query])

  useEffect(() => {
    document.body.classList.toggle('contact-route', path === '/contact')
    return () => document.body.classList.remove('contact-route')
  }, [path])

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'WAHAJ — Design × Code',
      '/work': 'Selected Work — WAHAJ',
      '/development': 'Digital Development — WAHAJ',
      '/design': 'Design, Editing & Motion — WAHAJ',
      '/contact': 'Start a Project — WAHAJ',
    }
    document.title = titles[path] ?? titles['/']
  }, [path])

  const page = path === '/work'
    ? <WorkPage />
    : path === '/development'
      ? <DevelopmentPage />
      : path === '/design'
        ? <CreativePage />
        : path === '/contact'
          ? <ContactPage />
          : null

  if (page) {
    return (
      <>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Cursor />
        <Nav />
        <div id="main-content">{page}</div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <a className="skip-link" href="#work">Skip to selected work</a>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <div className="marquee" aria-hidden="true">
          <div>
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
              <span className="marquee-item" key={`${item}-${index}`}>{item}<Starburst /></span>
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
    </>
  )
}

export default App
