import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
const origin = (process.env.VITE_SITE_ORIGIN ?? 'https://wahaj-creative-studio.taghreed96kw.chatgpt.site').replace(/\/$/, '')
const basePath = process.env.VITE_BASE && process.env.VITE_BASE !== '/' ? process.env.VITE_BASE.replace(/\/$/, '') : ''
const catalog = JSON.parse(fs.readFileSync('src/data/metadata.json', 'utf8'))
const ast = ts.createSourceFile('projects.ts', fs.readFileSync('src/data/projects.ts', 'utf8'), ts.ScriptTarget.Latest, true)
function value(node) {
  if (ts.isStringLiteral(node)) return node.text
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(value)
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map(p => [p.name.text, value(p.initializer)]))
  if (ts.isCallExpression(node) && ['assetPath', 'routeHref'].includes(node.expression.getText(ast))) return value(node.arguments[0])
  throw new Error('Unsupported metadata value: ' + node.getText(ast))
}
const declaration = ast.statements.filter(ts.isVariableStatement).flatMap(s => [...s.declarationList.declarations]).find(d => d.name.getText(ast) === 'projects')
const projects = value(declaration.initializer)
const base = fs.readFileSync('dist/index.html', 'utf8')
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const urls = []
for (const language of ['en', 'ar']) {
  for (const route of [...Object.keys(catalog), ...projects.map(p => '/work/' + p.id)]) {
    const ar = language === 'ar', project = projects.find(p => route === '/work/' + p.id)
    const title = project ? `${project.title} — ${ar ? 'تفاصيل المشروع | وهج' : 'Project | WAHAJ'}` : catalog[route][ar ? 2 : 0]
    const description = project ? (ar ? project.summaryAr : project.summary) : catalog[route][ar ? 3 : 1]
    const pathname = (ar ? '/ar' : '') + (ar && route === '/' ? '' : route), url = origin + basePath + pathname
    const image = origin + basePath + (project?.image || '/og.png')
    let html = base.replace('<html lang="en">', `<html lang="${language}" dir="${ar ? 'rtl' : 'ltr'}">`).replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
    const setMeta = (key, content, property = false) => {
      const attribute = property ? 'property' : 'name', tag = `<meta ${attribute}="${key}" content="${escape(content)}" />`
      const re = new RegExp(`<meta ${attribute}="${key}"[^>]*>`)
      html = re.test(html) ? html.replace(re, tag) : html.replace('</head>', tag + '\n</head>')
    }
    setMeta('description', description);setMeta('og:title', title, true);setMeta('og:description', description, true);setMeta('og:image', image, true);setMeta('og:url', url, true);setMeta('og:locale', ar ? 'ar_EG' : 'en_US', true);setMeta('og:type', project ? 'article' : 'website', true)
    setMeta('twitter:title', title);setMeta('twitter:description', description);setMeta('twitter:image', image)
    html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`)
    for (const lang of ['en', 'ar', 'x-default']) html = html.replace('</head>', `<link rel="alternate" hreflang="${lang}" href="${origin}${basePath}${lang === 'ar' ? '/ar' : ''}${route === '/' && lang === 'ar' ? '' : route}" />\n</head>`)
    const data = project ? { '@context': 'https://schema.org', '@type': 'CreativeWork', name: project.title, description, url, image, inLanguage: language, creator: { '@type': 'Organization', name: 'WAHAJ', url: origin } } : { '@context': 'https://schema.org', '@type': 'Organization', name: 'WAHAJ', description, url: origin, logo: origin + basePath + '/wahaj-logo.svg' }
    html = html.replace(/<script type="application\/ld\+json">.*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>`)
    const output = path.join('dist', pathname, 'index.html'); fs.mkdirSync(path.dirname(output), { recursive: true }); fs.writeFileSync(output, html); if (pathname !== '/') fs.writeFileSync(path.join('dist', pathname + '.html'), html); urls.push(url)
  }
}
fs.writeFileSync('dist/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n') + '\n</urlset>\n')
fs.copyFileSync(path.join('dist', 'index.html'), path.join('dist', '404.html'))
for (const old of ['/work', '/ar/work']) {
  const target = basePath + (old.startsWith('/ar') ? '/ar#work' : '/#work')
  const file = path.join('dist', old, 'index.html');fs.mkdirSync(path.dirname(file), {recursive:true})
  const redirectHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${target}"><title>Selected Work — WAHAJ</title><link rel="canonical" href="${origin}${target}"></head><body><a href="${target}">Explore WAHAJ selected work</a></body></html>`
  fs.writeFileSync(file, redirectHtml); fs.writeFileSync(path.join('dist', old + '.html'), redirectHtml)
}
console.log(`Generated metadata for ${urls.length} routes and the legacy Work redirects.`)
