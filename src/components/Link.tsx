import type { AnchorHTMLAttributes } from 'react'
import { useLanguage } from '../lib/language'
import { routeHref, stripBase } from '../lib/paths'
export function Link({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { language } = useLanguage()
  let localized = href
  if (href?.startsWith('/') && !href.startsWith('//')) {
    const logical = stripBase(href).replace(/^\/ar(?=\/|$)/, '') || '/'
    localized = routeHref(language === 'ar' ? '/ar' + (logical === '/' ? '' : logical) : logical)
  }
  return <a {...props} href={localized} />
}
