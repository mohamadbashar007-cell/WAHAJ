import { createServer } from 'vite'
import { chromium } from 'playwright-core'
import assert from 'node:assert/strict'
const server = await createServer({
  define: { 'import.meta.env.VITE_CONTACT_ENDPOINT': JSON.stringify('/api/contact'), 'import.meta.env.VITE_CONTACT_EMAIL': JSON.stringify('') },
  server: { host: '127.0.0.1', port: 4174, strictPort: true },
})
await server.listen()
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true })
const page = await browser.newPage({ reducedMotion: 'reduce' })
let mode = 'success', requests = 0, payload
await page.route('**/api/contact', async route => {
  requests++
  payload = route.request().postDataJSON()
  if (mode === 'network') return route.abort()
  if (mode === 'timeout') return // Browser aborts at the configured 15-second deadline.
  if (mode === 'success') await new Promise(resolve => setTimeout(resolve, 500))
  return route.fulfill({ status: mode === 'server' ? 500 : 200, contentType: 'application/json', body: JSON.stringify({ ok: mode === 'success' }) })
})
async function fill() {
  await page.goto('http://127.0.0.1:4174/contact/')
  await page.locator('[name=name]').fill('QA only')
  await page.locator('[name=email]').fill('qa@example.com')
  await page.locator('[name=type]').selectOption('Website')
  await page.locator('[name=brief]').fill('Local-only test; intercepted, never delivered.')
}
try {
  await fill()
  await page.locator('[name=name]').fill('   ')
  await page.locator('button[type=submit]').click()
  assert.equal(requests, 0)
  await page.locator('[name=name]').fill('QA only')
  await page.locator('button[type=submit]').click()
  assert.equal(await page.locator('[name=name]').isDisabled(), true)
  await page.getByRole('button', { name: 'BRIEF RECEIVED' }).waitFor()
  assert.equal(requests, 1)
  assert.equal(payload.name, 'QA only')
  assert.equal(await page.locator('button[type=submit]').isDisabled(), true)
  for (mode of ['server', 'rejected', 'network', 'timeout']) {
    await fill()
    await page.locator('button[type=submit]').click()
    await page.getByRole('status').filter({ hasText: 'could not be sent' }).waitFor({ timeout: 20000 })
    assert.equal(await page.locator('[name=name]').inputValue(), 'QA only')
    assert.equal(await page.locator('button[type=submit]').isDisabled(), false)
    assert.match(await page.locator('#brief-copy').inputValue(), /Local-only test/)
  }
  mode = 'success'
  await page.locator('button[type=submit]').click()
  await page.getByRole('button', { name: 'BRIEF RECEIVED' }).waitFor()
  console.log('PASS: whitespace validation, pending lock, accepted response, HTTP failure, rejected payload, network failure, timeout, preserved draft and retry. All requests intercepted locally.')
} finally { await browser.close(); await server.close() }
