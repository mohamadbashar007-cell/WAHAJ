import fs from 'node:fs'
import assert from 'node:assert/strict'
import { chromium } from 'playwright-core'
import AxeBuilder from '@axe-core/playwright'
const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true})
const context = await browser.newContext({viewport:{width:1440,height:900}})
const page = await context.newPage()
page.setDefaultTimeout(6000)
const base=process.env.TEST_URL || 'http://127.0.0.1:4173', errors=[], results=[]
page.on('pageerror',error=>errors.push(error.message))
const wait=()=>page.waitForTimeout(380)
async function check(name, action){console.log(name);try{await action();results.push({name,pass:true})}catch(e){results.push({name,pass:false,error:e.message})}}
for (const lang of (process.env.SKIP_LAYOUT ? [] : ['', '/ar'])) for (const route of ['/', '/development', '/design', '/contact','/work/wesal','/work/kroma-era','/work/pain','/privacy']) {
 for(const width of [320,390,768,1024,1440]) {
  await check(`${lang || 'en'}${route} @${width}`,async()=>{
   await page.setViewportSize({width,height:900});await page.goto(base+lang+(lang&&route==='/'?'':route));await page.evaluate(()=>document.fonts.ready);await wait()
   assert.equal(await page.locator('h1').count(),1)
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false)
   const outside=await page.locator('h1,h2,h3,.hero-title span,.button,.project-brief').evaluateAll(nodes=>nodes.filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.right>innerWidth+1||r.left< -1)}).map(e=>e.textContent))
   assert.deepEqual(outside,[])
   if(route==='/'){assert.equal(await page.locator('.hero img').count(),0);assert.ok(await page.locator('#work .project-card img').count()>0)}
  })
 }
}
await page.setViewportSize({width:390,height:844});await page.goto(base+'/');await wait()
await check('Mobile menu: focus, trap, Escape, hidden links',async()=>{
 assert.equal(await page.locator('#site-menu').evaluate(e=>e.inert),true)
 await page.locator('.menu-button').click();assert.equal(await page.locator('body').evaluate(e=>getComputedStyle(e).overflow),'hidden')
 assert.equal(await page.evaluate(()=>document.activeElement.closest('nav')?.id),'site-menu')
 for(let i=0;i<12;i++){await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>!!document.activeElement.closest('header.site-header')),true)}
 await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-button').evaluate(e=>document.activeElement===e),true)
 assert.equal(await page.locator('#site-menu').evaluate(e=>e.inert),true)
})
await check('Menu navigation closes immediately and starts at top',async()=>{
 await page.locator('.menu-button').click();await page.locator('#site-menu a[href="/development"]').click();await wait()
 assert.equal(new URL(page.url()).pathname,'/development');assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'),'false');assert.equal(await page.evaluate(()=>scrollY),0)
})
await page.setViewportSize({width:1440,height:900});await page.goto(base+'/');await wait()
await check('Rapid repeated navigation renders one page',async()=>{
 await page.evaluate(()=>{document.querySelector('a[href="/development"]').click();document.querySelector('a[href="/design"]').click();document.querySelector('a[href="/contact"]').click()});await wait()
 assert.equal(new URL(page.url()).pathname,'/development');assert.equal(await page.locator('main').count(),1)
 for(const route of ['/design','/contact','/']){await page.locator(`.site-header a[href="${route}"]`).first().click();await wait();assert.equal(new URL(page.url()).pathname,route);assert.equal(await page.locator('h1').count(),1)}
})
await check('Browser back preserves scroll position',async()=>{
 await page.evaluate(()=>scrollTo({top:1400,behavior:'instant'}));await wait();const y=await page.evaluate(()=>scrollY)
 await page.locator('.site-header a[href="/contact"]').click();await wait();assert.equal(await page.evaluate(()=>scrollY),0)
 await page.goBack();await wait();assert.ok(Math.abs(await page.evaluate(()=>scrollY)-y)<3)
})
await check('Legacy Work route redirects to selected work',async()=>{
 await page.goto(base+'/work');await wait();assert.equal(new URL(page.url()).pathname,'/');assert.equal(new URL(page.url()).hash,'#work')
 assert.ok(await page.locator('#work').evaluate(e=>e.getBoundingClientRect().top)>=70)
})
await check('Direct section links offset fixed header',async()=>{
 await page.goto(base+'/development?section=phonics');await wait();const top=await page.locator('#phonics').evaluate(e=>e.getBoundingClientRect().top);assert.ok(top>=138&&top<200,`${top}`)
})
await check('Arabic persists in routes and metadata',async()=>{
 await page.goto(base+'/');await page.locator('.language-button').click();await wait();assert.equal(new URL(page.url()).pathname,'/ar');assert.equal(await page.locator('html').getAttribute('dir'),'rtl')
 await page.locator('.site-header a[href="/ar/contact"]').click();await wait();assert.equal(new URL(page.url()).pathname,'/ar/contact');assert.match(await page.title(),/وهج/)
 await page.reload();assert.equal(await page.locator('html').getAttribute('lang'),'ar')
})
await check('Skip link moves keyboard focus into content',async()=>{
 await page.goto(base+'/design');await wait();await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.className),'skip-link');await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'main-content')
})
await check('Form validation, focus and retained input',async()=>{
 await page.goto(base+'/contact');await wait();await page.locator('button[type="submit"]').click();assert.equal(await page.locator('[aria-invalid=true]').count(),5);assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('name')),'name')
 await page.locator('[name=name]').fill('Interface test');await page.locator('[name=email]').fill('invalid');await page.locator('button[type="submit"]').click();assert.equal(await page.locator('[name=name]').inputValue(),'Interface test');await page.waitForFunction(()=>document.activeElement?.getAttribute('name')==='email');assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('name')),'email')
})
await check('Reduced motion disables cursor and animation',async()=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(base+'/');assert.equal(await page.locator('.cursor').evaluate(e=>getComputedStyle(e).display),'none');assert.equal(await page.locator('.page-transition').evaluate(e=>getComputedStyle(e).animationName),'none')
})
fs.writeFileSync('artifacts/qa-results.json',JSON.stringify({results,errors},null,2));console.log(JSON.stringify({failed:results.filter(r=>!r.pass)}))
const accessibility=[]
for(const route of ['/','/development','/design','/contact','/work/wesal','/ar','/ar/contact']){
 await page.goto(base+route);await wait();const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();accessibility.push({route,violations:result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))})
}
fs.mkdirSync('artifacts',{recursive:true});fs.writeFileSync('artifacts/qa-results.json',JSON.stringify({results,accessibility,errors},null,2));
console.log(JSON.stringify({passed:results.filter(r=>r.pass).length,failed:results.filter(r=>!r.pass),accessibility,errors},null,2));await browser.close()
if(results.some(r=>!r.pass)||errors.length||accessibility.some(r=>r.violations.length))process.exitCode=1
