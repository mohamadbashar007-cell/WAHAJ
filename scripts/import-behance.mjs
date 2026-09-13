import { mkdir, readFile, writeFile, access, rename } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import sharp from 'sharp'
import { promisify } from 'node:util'
const exec = promisify(execFile)

// Import only published project modules, never thumbnails or recommended work.
const cache = 'artifacts/behance'
await mkdir(cache, { recursive: true })
async function download(url, file) {
  await exec('curl.exe', ['--silent', '--show-error', '--location', '--fail', '--retry', '2', '--connect-timeout', '15', '--max-time', '90', '-A', 'Mozilla/5.0', url, '-o', file + '.tmp'])
  await rename(file + '.tmp', file)
}
async function state(url, name) {
  const file = `${cache}/${name}.html`
  try { await access(file) } catch { await download(url, file) }
  const html = await readFile(file, 'utf8')
  const match = html.match(/id="beconfig-store_state">([\s\S]*?)<\/script>/)
  if (!match) throw new Error(`Missing Behance state: ${url}`)
  return JSON.parse(match[1])
}
const profile = (await state('https://www.behance.net/mazenmagdy29', 'profile')).profile.activeSection.work
if (profile.user.profileProjects.pageInfo.hasNextPage) throw new Error('Profile pagination needs importing before continuing')
const slugs = { 242871303: 'social-media-posts', 242867009: 'vortex-retro-profile', 237818093: 'pain', 237709625: 'wesal-identity', 237263693: 'kroma-era', 235925833: 'vortex-company-profile', 235143861: 'personal-logo' }
const result = []
for (const project of profile.profileProjects) {
  const detail = (await state(project.url, project.id)).project.project
  const id = slugs[project.id]
  if (!id) throw new Error(`Assign a stable slug for ${project.name}`)
  const directory = `public/projects/behance/${id}`
  await mkdir(directory, { recursive: true })
  const rows = []
  let number = 0
  const moduleJobs = detail.modules.map(module => {
    const count = module.components?.length ?? 1
    const start = number
    number += count
    return { module, start }
  })
  let jobIndex = 0
  await Promise.all(Array.from({ length: 4 }, async () => {
  while (jobIndex < moduleJobs.length) {
    const rowIndex = jobIndex++
    const { module, start } = moduleJobs[rowIndex]
    let imageIndex = start
    const components = module.__typename === 'ImageModule' ? [module] : module.__typename === 'MediaCollectionModule' ? module.components : []
    if (!components.length) throw new Error(`Unsupported module ${module.__typename}`)
    const row = []
    for (const component of components) {
      const number = ++imageIndex
      const variants = component.imageSizes.allAvailable.filter(item => item.url)
      const best = variants.filter(item => item.type === 'WEBP').sort((a, b) => b.width - a.width)[0] ?? variants.find(item => item.url.includes('/source/')) ?? variants.sort((a, b) => b.width - a.width)[0]
      if (!best) throw new Error(`Missing image in ${project.name}`)
      const source = `${cache}/${project.id}-${number}.image`
      try { await access(source) } catch { await download(best.url, source) }
      const name = String(number).padStart(2, '0')
      const full = await sharp(source, { animated: true }).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 88 }).toFile(`${directory}/${name}.webp`)
      const small = await sharp(source, { animated: true }).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${directory}/${name}-small.webp`)
      row.push({ src: `projects/behance/${id}/${name}.webp`, small: `projects/behance/${id}/${name}-small.webp`, width: full.width, height: full.pageHeight ?? full.height, smallWidth: small.width, alt: `${project.name} — image ${number}`, source: best.url })
    }
    rows[rowIndex] = row
  }
  }))
  result.push({ id, behanceId: project.id, title: project.name, url: project.url, imageCount: number, rows })
  console.log(`${id}: ${number} images`)
}
await writeFile('src/data/behance-projects.json', JSON.stringify(result, null, 2) + '\n')
console.log(`Imported ${result.reduce((sum, project) => sum + project.imageCount, 0)} images from ${result.length} projects.`)
