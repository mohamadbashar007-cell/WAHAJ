import imageData from '../data/images.json'
const images = imageData as Record<string, { width: number; height: number; variants: { src: string; width: number }[] }>
export function ProjectImage({ src, alt, eager = false, className = '', sizes = '(max-width: 600px) calc(100vw - 40px), (max-width: 1600px) 46vw, 704px' }: { src: string; alt: string; eager?: boolean; className?: string; sizes?: string }) {
  const normalized = src.replace(/\.(png|jpg)$/, '.webp')
  const record = images[normalized]
  return <img className={className} src={normalized} srcSet={record?.variants.map(image => `${image.src} ${image.width}w`).join(', ')} sizes={record ? sizes : undefined} alt={alt} width={record?.width ?? 1280} height={record?.height ?? 800} loading={eager ? 'eager' : 'lazy'} decoding="async" />
}
