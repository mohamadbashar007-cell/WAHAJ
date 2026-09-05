import { useLayoutEffect, useRef, useState } from 'react'
import { routeHref, stripBase } from './paths'

function normalizeLocation() {
  const url = new URL(window.location.href)
  if (url.hash.startsWith('#/')) {
    const legacy = new URL(url.hash.slice(1), url.origin)
    url.pathname = legacy.pathname; url.search = legacy.search; url.hash = legacy.hash
    url.pathname = routeHref(url.pathname)
  }
  const logical = stripBase(url.pathname)
  if (logical === '/work' || logical === '/ar/work') { url.pathname = routeHref(logical.startsWith('/ar') ? '/ar' : '/'); url.hash = 'work' }
  if (url.href !== window.location.href) history.replaceState(history.state, '', url)
  return stripBase(url.pathname) + url.search + url.hash
}
export function useRouter() {
  const [route, setRoute] = useState(normalizeLocation)
  const [transitioning, setTransitioning] = useState(false)
  const destination = useRef<{ back: boolean; y?: number; initial?: boolean }>({ back: false, initial: true })
  const locked = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useLayoutEffect(() => {
    const oldRestoration = history.scrollRestoration
    history.scrollRestoration = 'manual'
    const saveScroll = () => history.replaceState({ ...history.state, scrollY: window.scrollY }, '')
    const commit = (back: boolean, y?: number) => {
      destination.current = { back, y }; setRoute(normalizeLocation()); window.dispatchEvent(new Event('wahaj:navigate'))
    }
    const click = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null
      if (!anchor || event.defaultPrevented || event.button !== 0 || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const url = new URL(anchor.href, location.href)
      if (url.origin !== location.origin || !['http:', 'https:'].includes(url.protocol)) return
      event.preventDefault()
      if (locked.current) return
      const logical = stripBase(url.pathname)
      if (document.documentElement.lang === 'ar' && !logical.startsWith('/ar')) url.pathname = routeHref('/ar' + (logical === '/' ? '' : logical))
      const afterAr = stripBase(url.pathname)
      if (afterAr === '/work' || afterAr === '/ar/work') { url.pathname = routeHref(afterAr.startsWith('/ar') ? '/ar' : '/'); url.hash = 'work' }
      if (url.href === location.href) {
        const target = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : document.getElementById('main-content')
        target?.focus({ preventScroll: true }); target?.scrollIntoView({ block: 'start', behavior: 'instant' }); window.dispatchEvent(new Event('wahaj:navigate')); return
      }
      saveScroll()
      const pageChange = stripBase(url.pathname) !== stripBase(location.pathname)
      locked.current = pageChange; setTransitioning(pageChange)
      history.pushState({}, '', url); commit(false)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => { locked.current = false; setTransitioning(false) }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 320)
    }
    const pop = () => { clearTimeout(timer.current); locked.current = false; setTransitioning(false); commit(true, history.state?.scrollY) }
    addEventListener('popstate', pop); addEventListener('scroll', saveScroll, { passive: true }); document.addEventListener('click', click)
    return () => { clearTimeout(timer.current); history.scrollRestoration = oldRestoration; removeEventListener('popstate', pop); removeEventListener('scroll', saveScroll); document.removeEventListener('click', click) }
  }, [])
  useLayoutEffect(() => {
    const url = new URL(route, location.origin)
    const section = url.searchParams.get('section') || decodeURIComponent(url.hash.slice(1))
    const target = section ? document.getElementById(section) : document.getElementById('main-content')
    if (destination.current.back) window.scrollTo({ top: destination.current.y ?? 0, behavior: 'instant' })
    else if (section && target) target.scrollIntoView({ block: 'start', behavior: 'instant' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
    if (!destination.current.back && (!destination.current.initial || section)) { target?.setAttribute('tabindex', '-1'); target?.focus({ preventScroll: true }) }
  }, [route])
  return { route, path: new URL(route, location.origin).pathname.replace(/^\/ar(?=\/|$)/, '').replace(/\/$/, '') || '/', transitioning }
}
