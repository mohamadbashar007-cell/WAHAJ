export const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const routeHref = (path: string) => `#${path}`
