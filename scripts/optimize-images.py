from PIL import Image
from pathlib import Path
import json, math
root=Path('public')
manifest={}
for p in list((root/'projects').rglob('*')):
 if p.suffix not in ['.png','.webp','.jpg'] or 'creative' in p.parts: continue
 target=p.with_suffix('.webp')
 if target.as_posix().removeprefix('public/') in manifest: continue
 im=Image.open(p).convert('RGB')
 sizes=[]
 for width in sorted(set([480,min(960,im.width),im.width])):
  if width>im.width: continue
  dest=target.with_name(target.stem+f'-{width}.webp')
  im.resize((width,round(width*im.height/im.width)),Image.Resampling.LANCZOS).save(dest,'WEBP',quality=82,method=6)
  sizes.append({'src':'/'+dest.as_posix().removeprefix('public/'),'width':width})
 if p.suffix!='.webp': im.save(target,'WEBP',quality=84,method=6)
 manifest['/'+target.as_posix().removeprefix('public/')]={'width':im.width,'height':im.height,'variants':sizes}
Path('src/data/images.json').write_text(json.dumps(manifest,indent=2))
# Trace the supplied logo silhouette; preserve its actual lettering and mark.
im=Image.open(root/'wahaj-logo-optimized.png').convert('RGBA'); w,h=im.size
mask=im.getchannel('A'); pixels=mask.load(); edges={}
def add(a,b): edges.setdefault(a,[]).append(b)
for y in range(h):
 for x in range(w):
  if pixels[x,y]<128: continue
  if y==0 or pixels[x,y-1]<128: add((x,y),(x+1,y))
  if x==w-1 or pixels[x+1,y]<128: add((x+1,y),(x+1,y+1))
  if y==h-1 or pixels[x,y+1]<128: add((x+1,y+1),(x,y+1))
  if x==0 or pixels[x-1,y]<128: add((x,y+1),(x,y))
def simplify(points,eps=.6):
 if len(points)<3: return points
 a,b=points[0],points[-1]; dx,dy=b[0]-a[0],b[1]-a[1]; den=math.hypot(dx,dy)
 distances=[abs(dy*p[0]-dx*p[1]+b[0]*a[1]-b[1]*a[0])/den if den else math.dist(a,p) for p in points[1:-1]]
 m=max(distances,default=0)
 if m<=eps: return [a,b]
 i=distances.index(m)+1
 return simplify(points[:i+1],eps)[:-1]+simplify(points[i:],eps)
paths=[]
while edges:
 start=next(iter(edges)); point=start; chain=[point]
 while point in edges:
  nxt=edges[point].pop()
  if not edges[point]: del edges[point]
  chain.append(nxt); point=nxt
  if point==start: break
 if len(chain)>8:
  mid=len(chain)//2; poly=simplify(chain[:mid+1])[:-1]+simplify(chain[mid:])
  paths.append('M'+' '.join(f'{x},{y}' for x,y in poly)+'Z')
for name,color in [('wahaj-logo','#ffd51d'),('wahaj-logo-dark','#052f4f')]:
 (root/(name+'.svg')).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}"><path fill="{color}" fill-rule="evenodd" d="'+''.join(paths)+'"/></svg>')
print('Optimized',len(manifest),'images; logo SVG', (root/'wahaj-logo.svg').stat().st_size,'bytes')
