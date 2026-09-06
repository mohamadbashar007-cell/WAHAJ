// Capture the deployment root before client-side navigation changes the URL.
export const appBase = new URL(document.querySelector('base')?.getAttribute('href') || '/', window.location.href)
document.querySelector('base')?.setAttribute('href', appBase.href)
export const assetPath = (path: string) => new URL(path.replace(/^\//, ''), appBase).pathname

export const routeHref = (path: string) => {
  const url = new URL(path.replace(/^\//, ''), appBase)
  return `${url.pathname.replace(/\/?$/, '/')}${url.search}`
}

export const readRoute = () => {
  if (window.location.hash.startsWith('#/')) return window.location.hash.slice(1)
  const path = window.location.pathname.slice(appBase.pathname.length).replace(/\/$/, '')
  return `/${path}${window.location.search}`
}
