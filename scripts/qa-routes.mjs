import fs from 'node:fs'
import assert from 'node:assert/strict'
const base='http://127.0.0.1:4173', origin='https://wahaj-creative-studio.taghreed96kw.chatgpt.site'
const urls=[...fs.readFileSync('dist/sitemap.xml','utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1])
const records=[]
for(const url of urls){const local=url.replace(origin,base),response=await fetch(local),html=await response.text();assert.equal(response.status,200);assert.ok(html.includes(`href="${url}"`));const title=html.match(/<title>(.*?)<\/title>/)?.[1];assert.ok(title);assert.ok(html.includes('hreflang="ar"'));records.push({url,status:response.status,title})}
assert.equal(new Set(records.map(r=>r.title)).size,20)
const images=JSON.parse(fs.readFileSync('src/data/images.json','utf8'));let assets=0
for(const [src,record] of Object.entries(images))for(const variant of [{src},...record.variants]){assert.ok(fs.existsSync('public'+variant.src));const response=await fetch(base+variant.src);assert.equal(response.status,200);assert.match(response.headers.get('content-type'),/image\/webp/);assets++}
const external=[]
for(const url of ['https://zaman-eg.com','https://segybc.com'])try{const response=await fetch(url,{method:'HEAD',signal:AbortSignal.timeout(15000)});external.push({url,status:response.status})}catch(e){external.push({url,error:e.message})}
fs.writeFileSync('artifacts/routes-assets-results.json',JSON.stringify({routes:records,assets,external},null,2));console.log(JSON.stringify({routes:records.length,uniqueTitles:20,assets,external},null,2))
