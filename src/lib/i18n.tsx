import { createContext, useContext, type ReactNode } from 'react'
import { routeHref } from './paths'

export type Locale = 'en' | 'ar'

const LocaleContext = createContext<Locale>('en')

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export function localeHref(path: string, locale: Locale) {
  if (locale === 'en') return routeHref(path)
  const normalized = path.startsWith('/') ? path : `/${path}`
  return routeHref(normalized === '/' ? '/ar/' : `/ar${normalized}`)
}

export function parseLocalizedRoute(route: string) {
  const [rawPath, query = ''] = route.split('?')
  const cleanPath = rawPath.replace(/\/$/, '') || '/'
  const locale: Locale = cleanPath === '/ar' || cleanPath.startsWith('/ar/') ? 'ar' : 'en'
  const localizedPath = locale === 'ar' ? cleanPath.slice(3) || '/' : cleanPath
  const path = localizedPath.replace(/\/$/, '') || '/'
  return { locale, path, query }
}

export function useLocale() {
  const locale = useContext(LocaleContext)
  const isArabic = locale === 'ar'
  const t = <T,>(english: T, arabic: T) => isArabic ? arabic : english
  const href = (path: string) => localeHref(path, locale)
  return { locale, isArabic, t, href }
}

export function arabicImageCount(count: number) {
  if (count === 1) return 'صورة واحدة'
  if (count === 2) return 'صورتان'
  const remainder = count % 100
  return `${count} ${remainder >= 3 && remainder <= 10 ? 'صور' : 'صورة'}`
}

export const projectArabic: Record<string, { title?: string; category: string; summary: string; imageAlt: string }> = {
  'durra-product-campaign': {
    title: 'الدرة',
    category: 'حملة منتج / موشن',
    summary: 'تصاميم ثابتة وموشن لحملة زيتون الدرة الأخضر المصري.',
    imageAlt: 'حملة زيتون الدرة الأخضر مع العبوة والنص العربي',
  },
  wesal: {
    title: 'وصال',
    category: 'هوية بصرية / تجربة رقمية',
    summary: 'هوية وموقع ثنائي اللغة لعلامة سفر وتجارب سياحية.',
    imageAlt: 'موقع وصال للسفر الفاخر أمام طريق جبلي وقت الغروب',
  },
  'kroma-era': {
    category: 'هوية بصرية / أزياء',
    summary: 'هوية أزياء بحروف مصممة خصيصًا وتكوينات تحريرية جريئة.',
    imageAlt: 'هوية كروما إيرا للأزياء مع كولاج تحريري وحروف مخصصة',
  },
  zaman: {
    title: 'زمان',
    category: 'موقع شركات / تطوير',
    summary: 'موقع شركة ثنائي اللغة للتوريدات الصناعية والمواد الغذائية.',
    imageAlt: 'واجهة موقع زمان وخلفيتها مستودع صناعي',
  },
  pain: {
    category: 'تصميم تحريري / إخراج فني',
    summary: 'دراسة تصميمية لغلاف كتاب جامعي.',
    imageAlt: 'تصميم غلاف كتاب بأيقونة نحتية وحروف حمراء',
  },
  segybc: {
    category: 'موقع مؤسسي / تطوير',
    summary: 'موقع ثنائي اللغة لمجلس الأعمال السوري المصري.',
    imageAlt: 'الموقع المؤسسي ثنائي اللغة لمجلس الأعمال السوري المصري',
  },
}

export const caseStudyArabic: Record<string, { brief: string; approach: string; deliverables: string[] }> = {
  wesal: {
    brief: 'بناء هوية وموقع فاخر للسفر باللغتين العربية والإنجليزية.',
    approach: 'تجمع الصور الدافئة والتكوينات السينمائية والخطوط ثنائية اللغة بين الهوية وإحساس الرحلة.',
    deliverables: ['هوية الشعار', 'إخراج فني رقمي', 'واجهة ثنائية اللغة', 'موقع متجاوب'],
  },
  'kroma-era': {
    brief: 'ابتكار هوية لعلامة أزياء تنطلق من الحنين بروح معاصرة.',
    approach: 'ترسم الحروف المخصصة والتكوينات التحريرية شخصية العلامة عبر الصور وتطبيقات الهوية.',
    deliverables: ['هوية بصرية', 'حروف مخصصة', 'إخراج تحريري', 'تطبيقات العلامة'],
  },
  zaman: {
    brief: 'عرض التوريدات الصناعية والمواد الغذائية في موقع شركة عربي وإنجليزي.',
    approach: 'هيكل محتوى واضح وواجهات متجاوبة تنظّم المنتجات ومعلومات الشركة بسهولة.',
    deliverables: ['موقع شركة', 'واجهة ثنائية اللغة', 'تصميمات متجاوبة', 'عرض المستندات'],
  },
  pain: {
    brief: 'تصميم غلاف كتاب جامعي يعبّر عن شعور داخلي.',
    approach: 'ملامح نحتية وتكوين هادئ وحروف حمراء تختصر الفكرة في صورة واحدة.',
    deliverables: ['دراسة غلاف', 'إخراج فني', 'تصميم حروف', 'تكوين طباعي'],
  },
  segybc: {
    brief: 'إنشاء موقع ثنائي اللغة لمجلس الأعمال السوري المصري وأنشطته.',
    approach: 'تسلسل معلومات واضح وواجهة متجاوبة ينظّمان أخبار المجلس ومحتواه.',
    deliverables: ['موقع مؤسسي', 'واجهة ثنائية اللغة', 'هيكلة المحتوى', 'تصميمات متجاوبة'],
  },
}

export const creativeProjectArabic: Record<string, string> = {
  'durra-product-campaign': 'حملة منتجات الدرة',
  'social-media-posts': 'تصاميم منصات التواصل',
  'vortex-retro-profile': 'بروفايل فورتكس — ريترو',
  pain: 'PAIN — تصميم غلاف كتاب',
  'wesal-identity': 'وصال — هوية الشعار',
  'kroma-era': 'كروما إيرا — هوية أزياء',
  'vortex-company-profile': 'بروفايل شركة فورتكس',
}
