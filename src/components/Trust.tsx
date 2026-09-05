import { trustContent } from '../data/company'
export function Trust() {
  if (!trustContent.clients.length && !trustContent.testimonials.length) return null
  return <div className="trust-content">{trustContent.clients.map(client => <img key={client.name} src={client.logo} alt={client.name} loading="lazy" width="160" height="80" />)}{trustContent.testimonials.map(item => <figure key={item.name}><blockquote>{item.quote}</blockquote><figcaption>{item.name} — {item.role}</figcaption></figure>)}</div>
}
