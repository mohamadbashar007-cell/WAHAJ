import { readFile, mkdir, writeFile } from 'node:fs/promises'
const pages = JSON.parse(await readFile('src/data/page-meta.json', 'utf8'))
const original = await readFile('dist/index.html', 'utf8')
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
function render(meta, base) {
  return original
    .replace('<base href="/" />', `<base href="${base}" />`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${escape(meta.description)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(meta.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${escape(meta.description)}`)
}
for (const [route, meta] of Object.entries(pages)) {
  const parts = route.split('/').filter(Boolean)
  const directory = `dist/${parts.join('/')}`
  await mkdir(directory, { recursive: true })
  await writeFile(`${directory}/index.html`, render(meta, parts.length ? '../'.repeat(parts.length) : './'))
}
// A genuine static 404, without turning missing URLs into successful pages.
await writeFile('dist/404.html', '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Page not found — WAHAJ</title></head><body><h1>Page not found</h1><p>Please return to the site home and explore our selected work.</p></body></html>')
console.log(`Generated ${Object.keys(pages).length} static entry points for GitHub Pages.`)
