const BASE = import.meta.env.BASE_URL
const ROOT = BASE.replace(/\/$/, '')

export const assetPath = (path: string) => `${BASE}${path.replace(/^\//, '')}`

export const routeHref = (path: string) => (ROOT ? (path === '/' ? BASE : ROOT + path) : path)

export const stripBase = (pathname: string) =>
  ROOT && (pathname === ROOT || pathname.startsWith(ROOT + '/')) ? pathname.slice(ROOT.length) || '/' : pathname
