import metadata from '../data/metadata.json'
﻿import { useEffect } from 'react'
import { projects } from '../data/projects'
import type { Language } from './language'
const BASE_PATH = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '')
export const siteOrigin = (import.meta.env.VITE_SITE_ORIGIN ?? 'https://wahaj-creative-studio.taghreed96kw.chatgpt.site').replace(/\/$/, '')
export const pageMetadata = metadata as Record<string, string[]>
export function useSeo(path: string, language: Language) {
  useEffect(() => {
    const project = projects.find(item => path === `/work/${item.id}`)
    const record = pageMetadata[path]
    const ar = language === 'ar'
    const title = project ? `${project.title} — ${ar ? 'تفاصيل المشروع | وهج' : 'Project | WAHAJ'}` : record?.[ar ? 2 : 0] ?? (ar ? 'الصفحة غير موجودة — وهج' : 'Page not found — WAHAJ')
    const description = project ? (ar ? project.summaryAr : project.summary) : record?.[ar ? 3 : 1] ?? ''
    const canonical = `${siteOrigin}${BASE_PATH}${ar ? '/ar' : ''}${path === '/' && ar ? '' : path}`
    document.title = title
    const meta = (key: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name'
      let node = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
      if (!node) { node = document.createElement('meta'); node.setAttribute(attribute, key); document.head.append(node) }
      node.content = content
    }
    meta('description', description); meta('og:title', title, true); meta('og:description', description, true); meta('og:url', canonical, true); meta('og:locale', ar ? 'ar_EG' : 'en_US', true)
    meta('twitter:title', title); meta('twitter:description', description)
    const image = `${siteOrigin}${BASE_PATH}${project?.image ?? '/og.png'}`
    meta('og:image', image, true); meta('twitter:image', image); meta('og:type', project ? 'article' : 'website', true)
    meta('robots', record || project ? 'index,follow' : 'noindex,follow')
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical)
    for (const lang of ['en', 'ar', 'x-default']) {
      let link = document.querySelector<HTMLLinkElement>(`link[hreflang="${lang}"]`)
      if (!link) { link = document.createElement('link'); link.rel = 'alternate'; link.hreflang = lang; document.head.append(link) }
      link.href = `${siteOrigin}${BASE_PATH}${lang === 'ar' ? '/ar' : ''}${path === '/' && lang === 'ar' ? '' : path}`
    }
    const structured = document.querySelector('script[type="application/ld+json"]')
    if (structured) structured.textContent = JSON.stringify(project ? { '@context': 'https://schema.org', '@type': 'CreativeWork', name: project.title, description, url: canonical, image, inLanguage: language, creator: { '@type': 'Organization', name: 'WAHAJ', url: siteOrigin } } : { '@context': 'https://schema.org', '@type': 'Organization', name: 'WAHAJ', url: siteOrigin, logo: `${siteOrigin}${BASE_PATH}/wahaj-logo.svg`, description, knowsAbout: ['Brand identity', 'Web development', 'Motion graphics'] })
  }, [path, language])
}
