import { createContext, useContext } from 'react'
import translations from '../data/translations.json'
export type Language = 'en' | 'ar'
export const LanguageContext = createContext<{ language: Language; toggleLanguage: () => void }>({ language: 'en', toggleLanguage: () => undefined })
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  return { ...context, t: (text: string) => context.language === 'ar' ? (translations as Record<string, string>)[text] ?? text : text }
}
