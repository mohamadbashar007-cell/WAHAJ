import { assetPath, routeHref } from '../lib/paths'

export type Project = {
  id: string
  number: string
  title: string
  category: string
  summary: string
  image: string
  imageAlt: string
  link?: string
  source: 'Live site' | 'Selected work'
  tone: 'light' | 'dark' | 'warm'
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'wesal',
    number: '01',
    title: 'WESAL',
    category: 'BRAND IDENTITY / DIGITAL EXPERIENCE',
    summary: 'A cinematic bilingual travel experience built around movement, warmth and the road ahead.',
    image: assetPath('/projects/wesal.png'),
    imageAlt: 'English Wesal luxury travel website shown against a mountain road at sunset',
    source: 'Selected work',
    tone: 'warm',
    featured: true,
  },
  {
    id: 'kroma-era',
    number: '02',
    title: 'KROMA ERA',
    category: 'BRAND IDENTITY / FASHION',
    summary: 'A visual identity where modern nostalgia, expressive type and editorial rhythm meet.',
    image: assetPath('/projects/kroma.webp'),
    imageAlt: 'Kroma Era fashion identity featuring an editorial image collage and custom typography',
    source: 'Selected work',
    tone: 'dark',
    featured: true,
  },
  {
    id: 'zaman',
    number: '03',
    title: 'ZAMAN',
    category: 'CORPORATE WEB / DEVELOPMENT',
    summary: 'A bilingual corporate website presenting industrial supplies and food materials with clarity and confidence.',
    image: assetPath('/projects/zaman.png'),
    imageAlt: 'Zaman corporate website with an industrial warehouse hero',
    link: 'https://zaman-eg.com',
    source: 'Live site',
    tone: 'light',
    featured: true,
  },
  {
    id: 'pain',
    number: '04',
    title: 'PAIN',
    category: 'EDITORIAL DESIGN / ART DIRECTION',
    summary: 'A university book-cover study that turns an internal feeling into a precise visual object.',
    image: assetPath('/projects/pain.webp'),
    imageAlt: 'Pain editorial book cover design with sculptural profile and red typography',
    source: 'Selected work',
    tone: 'light',
    featured: true,
  },
  {
    id: 'segybc',
    number: '05',
    title: 'SEGYBC',
    category: 'INSTITUTIONAL WEB / DEVELOPMENT',
    summary: 'A bilingual institutional platform designed to communicate economic partnership, opportunity and authority.',
    image: assetPath('/projects/segybc.png'),
    imageAlt: 'Syrian Egyptian Business Council bilingual institutional website',
    link: 'https://segybc.com',
    source: 'Live site',
    tone: 'light',
    featured: true,
  },
]

export const additionalProjects: Array<{ title: string; type: string; href: string }> = [
  { title: 'PHONICS ADVENTURE', type: 'LEARNING EXPERIENCE', href: routeHref('/development?section=phonics') },
  { title: 'KALEMA', type: 'PRODUCT EXPERIENCE', href: routeHref('/development?section=kalema') },
  { title: 'VORTEX — RETRO PROFILE', type: 'EDITORIAL / BRAND', href: routeHref('/design?section=visual-work') },
]
