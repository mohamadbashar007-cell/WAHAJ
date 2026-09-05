import fs from 'node:fs'
import assert from 'node:assert/strict'
import { chromium } from 'playwright-core'
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true})
const page=await browser.newPage({viewport:{width:390,height:844}})
let requests=0, mode='failure'
await page.route('**/__qa__/brief',async route=>{requests++;await new Promise(r=>setTimeout(r,500));await route.fulfill({status:mode==='failure'?503:200,contentType:'application/json',body:JSON.stringify({success:mode==='success'})})})
const results=[]
try {
 for(const language of ['en','ar']){
  requests=0;mode='failure';await page.goto('http://127.0.0.1:5174/'+(language==='ar'?'ar/contact':'contact'))
  await page.locator('[name=name]').fill('Local interface test');await page.locator('[name=email]').fill('qa@example.test');await page.locator('[name=phone]').fill('+20 100 000 0000')
  await page.locator('[name=type]').selectOption('Website');await page.locator('[name=timeline]').selectOption('1–2 months');await page.locator('[name=brief]').fill('Intercepted local UI test. No message is delivered.')
  await page.locator('button[type=submit]').click();assert.equal(await page.locator('button[type=submit]').isDisabled(),true)
  await page.evaluate(()=>document.querySelector('form').requestSubmit());await page.locator('.form-status.error').waitFor();assert.equal(requests,1);assert.equal(await page.locator('[name=name]').inputValue(),'Local interface test')
  mode='success';await page.locator('button[type=submit]').click();await page.locator('.form-status.success').waitFor();assert.equal(requests,2);assert.equal(await page.locator('[name=name]').inputValue(),'');await page.waitForFunction(()=>document.activeElement?.className==='form-status success');assert.equal(await page.evaluate(()=>document.activeElement.className),'form-status success')
  results.push({language,loading:true,duplicatePrevention:true,errorRetainsData:true,retry:true,success:true,network:'intercepted; no email sent'})
 }
 fs.writeFileSync('artifacts/form-results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2))
}finally{await browser.close()}
