// One-off: every yellow color in the site -> pure #ffff00.
import fs from 'node:fs'
const file = 'src/styles.css'
const text = fs.readFileSync(file, 'utf8')
const rules = [
  // base + mobile signal em: keep text readable with a navy highlight chip
  ['.signal-statement em{color:#6e6800;font-style:normal}', '.signal-statement em{color:#ffff00;background:var(--navy);padding:2px 12px;font-style:normal}'],
  ['.signal-statement em{color:#6e6800}', '.signal-statement em{color:#ffff00;background:var(--navy);padding:2px 12px}'],
  // focus indicators: pure yellow ring with navy halo so it stays visible anywhere
  [':focus-visible{outline:3px solid #6e6800;outline-offset:5px}', ':focus-visible{outline:3px solid #ffff00;outline-offset:3px;box-shadow:0 0 0 3px var(--navy)}'],
  ['.project-brief input:focus-visible,.project-brief select:focus-visible,.project-brief textarea:focus-visible{outline:3px solid #6e6800;outline-offset:3px}', '.project-brief input:focus-visible,.project-brief select:focus-visible,.project-brief textarea:focus-visible{outline:3px solid #ffff00;outline-offset:3px;box-shadow:0 0 0 3px var(--navy)}'],
  // decorative amber underline -> pure yellow
  ['text-decoration-color:#a89900', 'text-decoration-color:#ffff00'],
  // hover light-yellow -> pure yellow
  ['background:#fff04d', 'background:#ffff00'],
]
let out = text
for (const [from, to] of rules) {
  if (!out.includes(from)) { console.log('MISS:', from); continue }
  out = out.split(from).join(to)
  console.log('OK:', from.slice(0, 60))
}
fs.writeFileSync(file, out)
console.log('done')