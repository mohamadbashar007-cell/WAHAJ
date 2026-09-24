import { assetPath } from '../lib/paths'

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
    summary: 'A bilingual travel brand identity and website.',
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
    summary: 'A fashion identity with custom typography and editorial layouts.',
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
    summary: 'A bilingual corporate website for industrial supplies and food materials.',
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
    summary: 'A university book-cover design study.',
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
    summary: 'A bilingual website for the Syrian Egyptian Business Council.',
    image: assetPath('/projects/segybc.png'),
    imageAlt: 'Syrian Egyptian Business Council bilingual institutional website',
    link: 'https://segybc.com',
    source: 'Live site',
    tone: 'light',
    featured: true,
  },
]

export const additionalProjects: Array<{ title: string; type: string; path: string }> = [
  { title: 'PHONICS ADVENTURE', type: 'LEARNING EXPERIENCE', path: '/development?section=phonics' },
  { title: 'KALEMA', type: 'PRODUCT EXPERIENCE', path: '/development?section=kalema' },
  { title: 'VORTEX — RETRO PROFILE', type: 'EDITORIAL / BRAND', path: '/design?section=visual-work' },
]
