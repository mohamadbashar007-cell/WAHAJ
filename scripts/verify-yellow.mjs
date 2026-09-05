// Verify every yellow on live pages renders as pure #ffff00 (rgb(255,255,0))
import { chromium } from 'playwright-core'

const base = process.env.BASE_URL ?? 'http://127.0.0.1:4199'
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const fails = []
const expect = (label, actual, wanted) => {
  const ok = actual === wanted
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}: ${actual}${ok ? '' : ` (expected ${wanted})`}`)
  if (!ok) fails.push(label)
}
const rgb = (sel, prop) => page.$eval(sel, (el, p) => getComputedStyle(el)[p], prop)

await page.goto(base + '/', { waitUntil: 'networkidle' })

// 1. hero headline glow word
expect('hero .glow color', await rgb('.hero-title .glow', 'color'), 'rgb(255, 255, 0)')
// 2. hero CTA button background
expect('hero CTA bg', await rgb('.button-yellow', 'backgroundColor'), 'rgb(255, 255, 0)')
// 3. signal statement <em> highlight: pure yellow text on navy chip
expect('signal em color', await rgb('.signal-statement em', 'color'), 'rgb(255, 255, 0)')
expect('signal em chip bg (navy for readability)', await rgb('.signal-statement em', 'backgroundColor'), 'rgb(0, 40, 72)')
// 4. global focus ring (keyboard Tab)
await page.keyboard.press('Tab')
const focusColor = await page.evaluate(() => {
  const el = document.activeElement
  const cs = getComputedStyle(el)
  return cs.outlineColor
})
console.log(`${focusColor === 'rgb(255, 255, 0)' ? 'PASS' : 'FAIL'} focus outline color: ${focusColor}`)
if (focusColor !== 'rgb(255, 255, 0)') fails.push('focus outline')
// 5. link underline decoration color (about/creative links use text-decoration)
const deco = await page.evaluate(() => {
  const el = document.querySelector('.signal-statement a') ?? document.querySelector('a')
  return el ? getComputedStyle(el).textDecorationColor : 'none'
})
console.log(`INFO first-link text-decoration-color: ${deco}`)
// 6. yellow tint divider rgba
const factsBorder = await rgb('.signal-facts div', 'borderTopColor')
console.log(`INFO facts border: ${factsBorder}`)

// 5b. about heading underline decoration (was #a89900)
const deco2 = await rgb('.about-top h2 span', 'textDecorationColor')
console.log(`${deco2 === 'rgb(255, 255, 0)' ? 'PASS' : 'FAIL'} about h2 underline: ${deco2}`)
if (deco2 !== 'rgb(255, 255, 0)') fails.push('about underline')

// screenshots: about heading area + home
await page.screenshot({ path: 'artifacts/yellow-pure-home.png', fullPage: false })

// 6. work chip on the design page (yellow tag over portfolio images)
await page.goto(base + '/design', { waitUntil: 'networkidle' })
const chip = await rgb('.portfolio-work-image > span', 'backgroundColor')
console.log(`${chip === 'rgb(255, 255, 0)' ? 'PASS' : 'FAIL'} design chip bg: ${chip}`)
if (chip !== 'rgb(255, 255, 0)') fails.push('design chip')
await page.screenshot({ path: 'artifacts/yellow-pure-design.png' })

await browser.close()
console.log(fails.length ? `RESULT: ${fails.length} fail(s)` : 'RESULT: ALL PURE YELLOW ✔')
process.exit(fails.length ? 1 : 0)
