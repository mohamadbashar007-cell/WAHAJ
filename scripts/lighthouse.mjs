import fs from 'node:fs'
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'
const chrome=await chromeLauncher.launch({chromePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',chromeFlags:['--headless','--disable-gpu']})
const summaries=[]
try{
 for(const route of ['/', '/contact', '/ar']){
  const result=await lighthouse('http://127.0.0.1:4173'+route,{port:chrome.port,output:['json','html'],onlyCategories:['performance','accessibility','best-practices','seo'],logLevel:'error'})
  const name=route==='/'?'home':route.slice(1)
  fs.writeFileSync(`artifacts/lighthouse-${name}.json`,result.report[0]);fs.writeFileSync(`artifacts/lighthouse-${name}.html`,result.report[1])
  summaries.push({route,scores:Object.fromEntries(Object.entries(result.lhr.categories).map(([key,value])=>[key,Math.round(value.score*100)])),metrics:{lcp:result.lhr.audits['largest-contentful-paint'].displayValue,cls:result.lhr.audits['cumulative-layout-shift'].displayValue},issues:Object.values(result.lhr.audits).filter(a=>a.score!==null&&a.score<.9).map(a=>({id:a.id,title:a.title,score:a.score}))});console.log(JSON.stringify(summaries.at(-1)))
 }
 fs.writeFileSync('artifacts/lighthouse-summary.json',JSON.stringify(summaries,null,2))
}finally{await chrome.kill()}
