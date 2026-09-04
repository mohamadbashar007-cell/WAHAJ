import { createContext, useContext } from 'react'

export type Language = 'en' | 'ar'
export const LanguageContext = createContext<{ language: Language; toggleLanguage: () => void }>({ language: 'en', toggleLanguage: () => undefined })
export const useLanguage = () => useContext(LanguageContext)
