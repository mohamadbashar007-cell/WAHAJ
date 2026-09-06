import type { ImgHTMLAttributes } from 'react'
import { imageManifest } from '../data/image-manifest'
import { assetPath } from '../lib/paths'

export function ProjectImage({ src = '', alt, sizes = '(max-width: 900px) 100vw, 83vw', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const key = src.slice(src.indexOf('projects/'))
  const entry = imageManifest[key as keyof typeof imageManifest]
  return <img
    loading="lazy" decoding="async" {...props}
    src={entry ? assetPath(entry.large) : src}
    srcSet={entry ? `${assetPath(entry.small)} 640w, ${assetPath(entry.large)} ${entry.width}w` : undefined}
    sizes={entry ? sizes : undefined}
    width={entry?.width} height={entry?.height} alt={alt}
  />
}
