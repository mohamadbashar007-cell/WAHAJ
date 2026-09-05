import { assetPath, routeHref } from '../lib/paths'

export type Project = {
  id: string
  number: string
  title: string
  category: string
  summaryAr: string
  categoryAr: string
  imageAltAr: string
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
    summaryAr: "تجربة سفر ثنائية اللغة تستلهم دفء الرحلة وحركتها والطريق الممتد أمامنا.", categoryAr: "هوية بصرية / تجربة رقمية", imageAltAr: "واجهة موقع وصال للسفر أمام طريق جبلي وقت الغروب",
    number: '01',
    title: 'WESAL',
    category: 'BRAND IDENTITY / DIGITAL EXPERIENCE',
    summary: 'A cinematic bilingual travel experience built around movement, warmth and the road ahead.',
    image: assetPath('/projects/wesal.webp'),
    imageAlt: 'English Wesal luxury travel website shown against a mountain road at sunset',
    source: 'Selected work',
    tone: 'warm',
    featured: true,
  },
  {
    id: 'kroma-era',
    summaryAr: "هوية أزياء تجمع الحنين المعاصر والخطوط التعبيرية وإيقاع التصميم التحريري.", categoryAr: "هوية بصرية / أزياء", imageAltAr: "هوية كرومـا إيرا للأزياء مع كولاج تحريري وتصميم طباعي",
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
    summaryAr: "موقع مؤسسي ثنائي اللغة يعرض المستلزمات الصناعية والمواد الغذائية بوضوح.", categoryAr: "موقع مؤسسي / تطوير", imageAltAr: "واجهة موقع زمان المؤسسي مع صورة مستودع صناعي",
    number: '03',
    title: 'ZAMAN',
    category: 'CORPORATE WEB / DEVELOPMENT',
    summary: 'A bilingual corporate website presenting industrial supplies and food materials with clarity and confidence.',
    image: assetPath('/projects/zaman.webp'),
    imageAlt: 'Zaman corporate website with an industrial warehouse hero',
    link: 'https://zaman-eg.com',
    source: 'Live site',
    tone: 'light',
    featured: true,
  },
  {
    id: 'pain',
    summaryAr: "دراسة جامعية لغلاف كتاب تحوّل شعوراً داخلياً إلى تكوين بصري مركز.", categoryAr: "تصميم تحريري / إخراج فني", imageAltAr: "غلاف كتاب PAIN بوجه نحتي وعنوان أحمر",
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
    summaryAr: "منصة مؤسسية ثنائية اللغة تعرض الشراكة الاقتصادية والفرص وأنشطة المجلس.", categoryAr: "موقع مؤسسي / تطوير", imageAltAr: "موقع مجلس الأعمال السوري المصري ثنائي اللغة",
    number: '05',
    title: 'SEGYBC',
    category: 'INSTITUTIONAL WEB / DEVELOPMENT',
    summary: 'A bilingual institutional platform designed to communicate economic partnership, opportunity and authority.',
    image: assetPath('/projects/segybc.webp'),
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
