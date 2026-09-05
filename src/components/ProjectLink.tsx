import { Link } from './Link'
﻿import type { ReactNode } from 'react'
import { useLanguage } from '../lib/language'
export function ProjectLink({ id, children }: { id?: string; children: ReactNode }) {
 const { language } = useLanguage()
 return id ? <Link className="portfolio-project-link" href={`/work/${id}`}>{children}<strong className="project-action">{language === 'ar' ? 'اكتشف المشروع' : 'VIEW PROJECT'} <span aria-hidden="true">→</span></strong></Link> : <>{children}</>
}
