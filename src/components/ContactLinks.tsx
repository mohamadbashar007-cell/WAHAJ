import { Link } from './Link'
﻿import { contactDetails } from '../data/company'
import { useLanguage } from '../lib/language'
export function ContactLinks() {
  const { language } = useLanguage()
  const entries = [[contactDetails.email, `mailto:${contactDetails.email}`, false], [language === 'ar' ? 'واتساب' : 'WhatsApp', contactDetails.whatsapp ? `https://wa.me/${contactDetails.whatsapp}` : '', true], ['Instagram', contactDetails.instagram, true], ['Behance', contactDetails.behance, true]] as const
  if (!entries.some(([, href]) => href && href !== 'mailto:')) return null
  return <div className="contact-alternatives">{entries.filter(([, href]) => href && href !== 'mailto:').map(([label, href, external]) => <Link key={href} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{label} {external && <span aria-hidden="true">↗</span>}</Link>)}</div>
}
