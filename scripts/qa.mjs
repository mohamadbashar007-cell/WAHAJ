import { chromium } from 'playwright-core'
import { createServer } from 'node:http'
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'

await mkdir('artifacts/refinement', { recursive: true })
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2' }
const server = createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/wahaj\//, '/')
    let file = path.resolve('dist', `.${pathname}`)
    if (!file.startsWith(path.resolve('dist') + path.sep) && file !== path.resolve('dist')) throw new Error('Invalid path')
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html')
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream')
    res.end(await readFile(file))
  } catch { res.statusCode = 404; res.end('Not found') }
})
await new Promise(resolve => server.listen(4173, '127.0.0.1', resolve))
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
const errors = []
page.on('pageerror', error => errors.push(error.message))
const results = []
const routes = ['', 'development/', 'design/', 'contact/', 'work/wesal/', 'work/kroma-era/', 'work/zaman/', 'work/pain/', 'work/segybc/']
try {
  for (const mount of ['', 'wahaj/']) {
    for (const route of routes) {
      await page.goto(`http://127.0.0.1:4173/${mount}${route}`)
      await page.locator('h1').waitFor()
      assert.ok(!(await page.title()).includes('not found'), `${mount}${route} title`)
      assert.equal(await page.locator('html').getAttribute('lang'), 'en')
      const invalidAsset = await page.locator('img').evaluateAll(images => images.filter(img => img.complete && img.naturalWidth === 0).map(img => img.src))
      assert.deepEqual(invalidAsset, [], `${mount}${route} images`)
      results.push({ route: `/${mount}${route}`, title: await page.title() })
    }
  }
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    for (const route of routes) {
      await page.goto(`http://127.0.0.1:4173/${route}`)
      await page.locator('h1').waitFor()
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
      if (overflow) console.log(await page.locator('body *').evaluateAll(elements => elements.filter(el => el.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(el).position !== 'absolute').map(el => ({ tag: el.tagName, class: el.className, right: el.getBoundingClientRect().right, width: el.getBoundingClientRect().width })).slice(0, 25)))
      assert.equal(overflow, false, `Overflow at ${width}: ${route}`)
      if (['', 'work/wesal/', 'contact/'].includes(route) && [390, 1440].includes(width)) {
        await page.screenshot({ path: `artifacts/refinement/${route.replaceAll('/', '-') || 'home'}-${width}.png` })
      }
    }
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('http://127.0.0.1:4173/')
  await page.getByRole('button', { name: 'MENU' }).click()
  assert.equal(await page.locator('body').evaluate(el => el.classList.contains('menu-open')), true)
  await page.keyboard.press('Escape')
  assert.equal(await page.getByRole('button', { name: 'MENU' }).getAttribute('aria-expanded'), 'false')
  assert.equal(await page.getByRole('button', { name: 'MENU' }).evaluate(el => document.activeElement === el), true)
  await page.getByRole('button', { name: 'MENU' }).click()
  await page.waitForFunction(() => document.activeElement === document.querySelector('#site-menu a'))
  await page.locator('#site-menu a').last().focus()
  await page.keyboard.press('Tab')
  assert.equal(await page.getByRole('button', { name: 'CLOSE' }).evaluate(el => document.activeElement === el), true)
  await page.locator('#site-menu').getByRole('link', { name: 'DEVELOPMENT', exact: true }).click()
  await page.waitForURL('**/development/')
  assert.equal(await page.locator('body').evaluate(el => el.classList.contains('menu-open')), false)
  await page.goBack()
  await page.waitForURL('http://127.0.0.1:4173/')
  await page.goto('http://127.0.0.1:4173/wahaj/#/design')
  await page.waitForURL('**/wahaj/design/')
  await page.reload()
  assert.match(await page.title(), /Design, Editing/)
  await page.goto('http://127.0.0.1:4173/work/wesal/')
  await page.getByRole('link', { name: 'LET’S BUILD YOURS' }).click()
  await page.waitForURL('**/contact/?project=wesal')
  await page.getByRole('link', { name: 'WRITE YOUR BRIEF' }).click()
  assert.ok(page.url().includes('/contact/'))
  assert.ok(await page.locator('#brief').evaluate(el => el.getBoundingClientRect().top >= 70 && el.getBoundingClientRect().top < 160))
  assert.match(await page.locator('.brief-reference').textContent(), /WESAL/)
  await page.locator('[name=name]').fill('Local QA')
  await page.locator('[name=email]').fill('qa@example.com')
  await page.locator('[name=type]').selectOption('Website')
  await page.locator('[name=brief]').fill('A local test brief. No request should be sent.')
  await page.locator('button[type=submit]').click()
  await page.locator('#brief-copy').waitFor()
  assert.match(await page.locator('[role=status]').textContent(), /not been sent/)
  assert.match(await page.locator('#brief-copy').inputValue(), /Project reference: WESAL/)
  await page.locator('.brief-section').scrollIntoViewIfNeeded()
  await page.screenshot({ path: 'artifacts/refinement/contact-form-390.png' })
  const download = page.waitForEvent('download')
  await page.getByRole('button', { name: 'DOWNLOAD .TXT' }).click()
  assert.equal((await download).suggestedFilename(), 'WAHAJ-project-brief.txt')
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('http://127.0.0.1:4173/')
  await page.mouse.move(700, 400)
  assert.equal(await page.locator('.cursor').evaluate(el => getComputedStyle(el).display), 'grid')
  assert.equal(await page.locator('body').evaluate(el => getComputedStyle(el).cursor), 'none')
  await page.locator('.hero-cta').hover()
  assert.equal(await page.locator('.cursor').evaluate(el => el.classList.contains('is-active')), true)
  await page.waitForTimeout(1100)
  await page.screenshot({ path: 'artifacts/refinement/home-motion-1440.png' })
  await page.goto('http://127.0.0.1:4173/design/')
  await page.getByRole('button', { name: 'PAUSE MOTION' }).click()
  assert.equal(await page.locator('.frame-a').evaluate(el => getComputedStyle(el).animationPlayState), 'paused')
  await page.getByRole('button', { name: 'PLAY MOTION' }).click()
  assert.equal(await page.locator('.frame-a').evaluate(el => getComputedStyle(el).animationPlayState), 'running')
  assert.deepEqual(errors, [])
  await writeFile('artifacts/refinement/qa-results.json', JSON.stringify({ entries: results, widths: [320, 390, 768, 1440], menu: 'passed', legacyLinks: 'passed', projectEnquiry: 'passed', draftDownload: 'passed', coloredCursor: 'passed', errors }, null, 2))
  console.log('PASS: 18 static entries, 36 responsive layouts, menu/focus, legacy links, project enquiry, draft/download and colored cursor.')
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)) }
