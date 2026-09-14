import { chromium } from 'playwright-core'
import { createServer } from 'node:http'
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'
import sharp from 'sharp'

const projects = JSON.parse(await readFile('src/data/behance-projects.json', 'utf8'))
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' }
const server = createServer(async (req, res) => {
  try {
    const pathname = new URL(req.url, 'http://localhost').pathname.replace(/^\/wahaj\//, '/')
    let file = path.resolve('dist', '.' + pathname)
    if (!file.startsWith(path.resolve('dist') + path.sep) && file !== path.resolve('dist')) throw Error('Invalid path')
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html')
    res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream')
    res.end(await readFile(file))
  } catch { res.writeHead(404); res.end() }
})
await new Promise(resolve => server.listen(4175, '127.0.0.1', resolve))
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true })
const page = await browser.newPage({ reducedMotion: 'reduce' })
const errors = []
page.on('pageerror', error => errors.push(error.message))
page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`) })
await mkdir('artifacts/behance-qa', { recursive: true })
try {
  for (const project of projects) {
    assert.equal(project.imageCount, project.rows.flat().length)
    for (const image of project.rows.flat()) {
      for (const file of [image.src, image.small]) {
        const metadata = await sharp(`dist/${file}`).metadata()
        assert.ok(metadata.width > 0 && metadata.height > 0)
      }
    }
  }
  for (const mount of ['', 'wahaj/']) {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      for (const project of projects) {
        await page.goto(`http://127.0.0.1:4175/${mount}design/${project.id}/`)
        await page.locator('h1').waitFor()
        assert.equal(await page.locator('.presentation-image').count(), project.imageCount)
        assert.equal(await page.locator('a[href*="behance.net"]').count(), 0)
        assert.ok((await page.title()).includes(project.title))
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
        const first = page.locator('.presentation-image').first()
        await first.click()
        await page.waitForFunction(() => document.querySelector('dialog[open] > img')?.naturalWidth > 0)
        await page.keyboard.press('ArrowRight')
        assert.match(await page.locator('.lightbox-toolbar > span').innerText(), new RegExp(`^${project.imageCount > 1 ? 2 : 1} /`))
        await page.keyboard.press('Escape')
        assert.equal(await page.locator('dialog').evaluate(el => el.open), false)
        assert.equal(await first.evaluate(el => el === document.activeElement), true)
        await page.locator('.presentation-image').last().scrollIntoViewIfNeeded()
        await page.waitForFunction(() => [...document.querySelectorAll('.presentation-image img')].at(-1)?.naturalWidth > 0)
        if (!mount && project.id === 'kroma-era') {
          await first.scrollIntoViewIfNeeded()
          await page.screenshot({ path: `artifacts/behance-qa/gallery-${width}.png` })
        }
      }
    }
  }
  await page.goto('http://127.0.0.1:4175/design/?section=visual-work')
  assert.equal(await page.locator('.portfolio-work-card').count(), projects.length)
  assert.equal(await page.locator('a[href*="personal-logo"]').count(), 0)
  assert.equal(await page.locator('a[href*="behance.net"]').count(), 0)
  await page.locator('.portfolio-work-image').first().click()
  await page.waitForURL('**/design/social-media-posts/')
  await page.goBack()
  await page.waitForURL('**/design/?section=visual-work')
  for (const [route, id] of [['wesal', 'wesal-identity'], ['kroma-era', 'kroma-era'], ['pain', 'pain']]) {
    await page.goto(`http://127.0.0.1:4175/work/${route}/`)
    assert.equal(await page.locator('.presentation-image').count(), projects.find(item => item.id === id).imageCount)
  }
  assert.deepEqual(errors, [])
  const summary = { projects: projects.length, images: projects.reduce((sum, item) => sum + item.imageCount, 0), responsiveWidths: [390, 1440], mounts: ['/', '/wahaj/'], errors }
  await writeFile('artifacts/behance-qa/results.json', JSON.stringify(summary, null, 2))
  console.log(summary)
} finally { await browser.close(); server.close() }
