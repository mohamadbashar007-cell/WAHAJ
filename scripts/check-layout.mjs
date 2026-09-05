import fs from 'node:fs';
import { chromium } from 'playwright-core';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:5173/');await page.evaluate(()=>document.fonts.ready);
fs.mkdirSync('artifacts',{recursive:true});
for(const width of [320,390,768,1024,1440]){
 await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:5173/');await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:`artifacts/home-${width}.png`});
 const result=await page.evaluate(()=>({width:innerWidth,horizontal:document.documentElement.scrollWidth>innerWidth,heroImages:document.querySelectorAll('.hero img').length,headings:[...document.querySelectorAll('.hero-title span')].map(e=>({text:e.textContent,w:e.getBoundingClientRect().width,x:e.getBoundingClientRect().x})),overflow:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left< -1)}).slice(0,10).map(e=>({tag:e.tagName,class:e.className,text:e.textContent.slice(0,60)}))}));console.log(JSON.stringify(result));
}
console.log('errors',errors);await browser.close();
