// One-off: make the source base-path aware for GitHub Pages project sites.
// Run: node scripts/gh-pages-patch.mjs  (safe to re-run; every rule must apply)
import fs from 'node:fs'

const edit = (file, rules) => {
  let text = fs.readFileSync(file, 'utf8')
  let applied = 0
  let skipped = 0
  for (const [from, to] of rules) {
    if (to && text.includes(to)) { skipped++; continue }
    if (from instanceof RegExp) {
      if (!from.test(text)) throw new Error(`MISS in ${file}: ${String(from)}`)
      text = text.replace(from, to)
    } else {
      if (!text.includes(from)) throw new Error(`MISS in ${file}: ${from.slice(0, 70)}`)
      text = text.split(from).join(to)
    }
    applied++
  }
  fs.writeFileSync(file, text)
  console.log('patched', file, `(${applied} applied, ${skipped} already)`)
}

edit('scripts/build-routes.mjs', [
  [/const origin = '[^']+'/s, "const origin = (process.env.VITE_SITE_ORIGIN ?? 'https://wahaj-creative-studio.taghreed96kw.chatgpt.site').replace(/\\/$/, '')\nconst basePath = process.env.VITE_BASE && process.env.VITE_BASE !== '/' ? process.env.VITE_BASE.replace(/\\/$/, '') : ''"],
  [', url = origin + pathname', ', url = origin + basePath + pathname'],
  ["const image = origin + (project?.image || '/og.png')", "const image = origin + basePath + (project?.image || '/og.png')"],
  ['href="${origin}${lang', 'href="${origin}${basePath}${lang'],
  ["logo: origin + '/wahaj-logo.svg'", "logo: origin + basePath + '/wahaj-logo.svg'"],
  ['const target = old.startsWith(', 'const target = basePath + (old.startsWith('],
  ["'/ar#work' : '/#work'", "'/ar#work' : '/#work')"],
  ["for (const old of ['/work', '/ar/work']) {", "fs.copyFileSync(path.join('dist', 'index.html'), path.join('dist', '404.html'))\nfor (const old of ['/work', '/ar/work']) {"],
])

edit('src/components/Link.tsx', [
  ["import { useLanguage } from '../lib/language'", "import { useLanguage } from '../lib/language'\nimport { routeHref, stripBase } from '../lib/paths'"],
  ["    const target = href.replace(/^\\/ar(?=\\/|$)/, '') || '/'", "    const logical = stripBase(href).replace(/^\\/ar(?=\\/|$)/, '') || '/'"],
  ["    localized = language === 'ar' ? '/ar' + (target === '/' ? '' : target) : target", "    localized = routeHref(language === 'ar' ? '/ar' + (logical === '/' ? '' : logical) : logical)"],
])

edit('src/lib/router.ts', [
  ["import { useLayoutEffect, useRef, useState } from 'react'", "import { useLayoutEffect, useRef, useState } from 'react'\nimport { routeHref, stripBase } from './paths'"],
  ['    url.pathname = legacy.pathname; url.search = legacy.search; url.hash = legacy.hash', '    url.pathname = legacy.pathname; url.search = legacy.search; url.hash = legacy.hash\n    url.pathname = routeHref(url.pathname)'],
  ["  if (url.pathname.replace(/\\/$/, '') === '/work' || url.pathname === '/ar/work') { url.pathname = url.pathname.startsWith('/ar') ? '/ar' : '/'; url.hash = 'work' }", "  const logical = stripBase(url.pathname)\n  if (logical === '/work' || logical === '/ar/work') { url.pathname = routeHref(logical.startsWith('/ar') ? '/ar' : '/'); url.hash = 'work' }"],
  ['  return url.pathname + url.search + url.hash', '  return stripBase(url.pathname) + url.search + url.hash'],
  ["      if (document.documentElement.lang === 'ar' && !url.pathname.startsWith('/ar')) url.pathname = '/ar' + (url.pathname === '/' ? '' : url.pathname)", "      const logical = stripBase(url.pathname)\n      if (document.documentElement.lang === 'ar' && !logical.startsWith('/ar')) url.pathname = routeHref('/ar' + (logical === '/' ? '' : logical))"],
  ["      if (url.pathname === '/work' || url.pathname === '/ar/work') { url.pathname = url.pathname.startsWith('/ar') ? '/ar' : '/'; url.hash = 'work' }", "      const afterAr = stripBase(url.pathname)\n      if (afterAr === '/work' || afterAr === '/ar/work') { url.pathname = routeHref(afterAr.startsWith('/ar') ? '/ar' : '/'); url.hash = 'work' }"],
  ['      const pageChange = url.pathname !== location.pathname', '      const pageChange = stripBase(url.pathname) !== stripBase(location.pathname)'],
])

edit('src/App.tsx', [
  ["import { useRouter } from './lib/router'", "import { useRouter } from './lib/router'\nimport { routeHref, stripBase } from './lib/paths'"],
  ["useState<Language>(() => location.pathname.startsWith('/ar') ? 'ar' : 'en')", "useState<Language>(() => stripBase(location.pathname).startsWith('/ar') ? 'ar' : 'en')"],
  ["    const next = location.pathname.startsWith('/ar') ? 'ar' : 'en'", "    const next = stripBase(location.pathname).startsWith('/ar') ? 'ar' : 'en'"],
  ['      url.pathname = next === \'ar\' ? `/ar${path === \'/\' ? \'\' : path}` : path', '      url.pathname = routeHref(next === \'ar\' ? `/ar${path === \'/\' ? \'\' : path}` : path)'],
])

edit('src/styles.css', [["background-image:url('/wahaj-hero-mark.png');", '']])

edit('.gitignore', [['Asset 91@3x.png', 'Asset 91@3x.png\nAsset 93@3x.png']])

console.log('all patches applied')
