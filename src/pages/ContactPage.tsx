import { type FormEvent, useState } from 'react'
import { Starburst } from '../components/Starburst'
import { routeHref } from '../lib/paths'

type Status = 'idle' | 'sending' | 'success' | 'error'
type Errors = Record<string, string>

export function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const contactEmail = String(import.meta.env.VITE_CONTACT_EMAIL || '').trim()
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const data = new FormData(form)
    const next: Errors = {}
    for (const name of ['name', 'email', 'type', 'timeline', 'brief']) if (!String(data.get(name) || '').trim()) next[name] = 'This field is required.'
    const email = String(data.get('email') || '')
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address.'
    setErrors(next)
    if (Object.keys(next).length) { const first = form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`); first?.focus(); first?.scrollIntoView({ block: 'center' }); return }
    const endpoint = String(import.meta.env.VITE_FORM_ENDPOINT || '').trim()
    if (!endpoint) { setStatus('error'); return }
    setStatus('sending')
    try { const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } }); if (!response.ok) throw new Error(); setStatus('success'); form.reset() }
    catch { setStatus('error') }
  }
  const field = (name: string) => ({ 'aria-invalid': Boolean(errors[name]), 'aria-describedby': errors[name] ? `${name}-error` : undefined })
  return <main className="inner-page contact-page">
    <section className="contact-page-hero"><div className="page-hero-meta"><span>04 / CONTACT</span><span>REPLY WITHIN 2 BUSINESS DAYS</span></div><h1>LET'S MAKE<br />SOMETHING<br /><span>MATTER.</span></h1><p>Share the ambition, the challenge and where you want the brand to go. We’ll turn it into a clear starting point.</p><Starburst className="contact-page-mark" /></section>
    <section className="brief-section section-light"><div className="brief-intro"><span>PROJECT BRIEF</span><h2>TELL US<br />WHAT'S NEXT.</h2><p>Send the essentials securely. We’ll review the brief and reply with the next step within two business days.</p>{contactEmail && <p><a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>}</div>
      <form className="project-brief" onSubmit={submit} noValidate>{Object.keys(errors).length > 0 && <div className="form-summary" role="alert">Please review the highlighted fields.</div>}
        <label><span>01 / YOUR NAME *</span><input name="name" autoComplete="name" {...field('name')} />{errors.name && <small id="name-error">{errors.name}</small>}</label>
        <label><span>02 / COMPANY</span><input name="company" autoComplete="organization" /></label>
        <label><span>03 / EMAIL *</span><input name="email" type="email" autoComplete="email" {...field('email')} />{errors.email && <small id="email-error">{errors.email}</small>}</label>
        <label><span>04 / PHONE</span><input name="phone" type="tel" autoComplete="tel" placeholder="+20 100 000 0000" /></label>
        <label><span>05 / PROJECT TYPE *</span><select name="type" defaultValue="" {...field('type')}><option value="" disabled>Select a service</option><option>Brand identity</option><option>Website</option><option>Application / platform</option><option>Video editing</option><option>Motion graphics</option></select>{errors.type && <small id="type-error">{errors.type}</small>}</label>
        <label><span>06 / TIMELINE *</span><select name="timeline" defaultValue="" {...field('timeline')}><option value="" disabled>Select a timeline</option><option>As soon as possible</option><option>1–2 months</option><option>3–6 months</option><option>Exploring for now</option></select>{errors.timeline && <small id="timeline-error">{errors.timeline}</small>}</label>
        <label><span>07 / BUDGET RANGE</span><select name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>To be discussed</option><option>Defined budget</option><option>Need a proposal</option></select></label>
        <label><span>08 / THE BRIEF *</span><textarea name="brief" rows={6} placeholder="What are we making, who is it for, and what should it change?" {...field('brief')} />{errors.brief && <small id="brief-error">{errors.brief}</small>}</label>
        <button type="submit" disabled={status === 'sending'}><span>{status === 'sending' ? 'SENDING…' : 'SEND PROJECT BRIEF'}</span><i>{status === 'success' ? '✓' : '→'}</i></button>
        <div className={`form-status ${status}`} aria-live="polite">{status === 'success' && 'Thank you. Your brief has been sent. We’ll reply within two business days.'}{status === 'error' && <>We couldn’t send your brief. Please try again{contactEmail ? <> or email us directly at <a href={`mailto:${contactEmail}`}>{contactEmail}</a></> : '.'}</>}</div>
        <p className="privacy-note">By sending this form, you agree to our <a href={routeHref('/privacy')}>privacy policy</a>.</p>
      </form>
    </section>
  </main>
}
