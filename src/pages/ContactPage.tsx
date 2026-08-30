import { type FormEvent, useState } from 'react'
import { Starburst } from '../components/Starburst'

type FormStatus = 'idle' | 'opening' | 'ready'

export function ContactPage() {
  const [status, setStatus] = useState<FormStatus>('idle')

  const prepareEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const contactEmail = (import.meta.env.VITE_CONTACT_EMAIL || '').trim()
    const name = String(form.get('name') || '')
    const company = String(form.get('company') || '')
    const subject = `New WAHAJ project — ${company || name}`
    const body = [
      'WAHAJ — NEW PROJECT BRIEF',
      '',
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${form.get('email') || ''}`,
      `Phone: ${form.get('phone') || ''}`,
      `Project type: ${form.get('type') || ''}`,
      `Timeline: ${form.get('timeline') || ''}`,
      `Budget: ${form.get('budget') || ''}`,
      '',
      'THE BRIEF',
      String(form.get('brief') || ''),
    ].join('\n')

    setStatus('opening')
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.setTimeout(() => setStatus('ready'), 450)
  }

  return (
    <main className="inner-page contact-page">
      <section className="contact-page-hero">
        <div className="page-hero-meta reveal"><span>04 / CONTACT</span><span>NEW BUSINESS / COLLABORATIONS</span></div>
        <h1 className="reveal">LET'S MAKE<br />SOMETHING<br /><span>MATTER.</span></h1>
        <p className="reveal">Share the ambition, the challenge and where you want the brand to go. We’ll turn it into a clear starting point.</p>
        <Starburst className="contact-page-mark" />
      </section>

      <section className="brief-section section-light">
        <div className="brief-intro reveal">
          <span>PROJECT BRIEF</span><h2>TELL US<br />WHAT'S NEXT.</h2>
          <p>Fill in the essentials. On submit, your email app opens with a structured project brief ready to send.</p>
          <div className="brief-steps" aria-hidden="true"><span>01 / DETAILS</span><span>02 / SCOPE</span><span>03 / SEND</span></div>
        </div>
        <form className="project-brief reveal" onSubmit={prepareEmail}>
          <div className="project-brief-head"><span>NEW PROJECT / {new Date().getFullYear()}</span><strong>ALL FIELDS MARKED * ARE REQUIRED</strong></div>
          <label><span>01 / YOUR NAME *</span><input name="name" required autoComplete="name" placeholder="Name" /></label>
          <label><span>02 / COMPANY</span><input name="company" autoComplete="organization" placeholder="Company or brand" /></label>
          <label><span>03 / EMAIL *</span><input name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></label>
          <label><span>04 / PHONE</span><input name="phone" type="tel" autoComplete="tel" placeholder="Country code + number" /></label>
          <label><span>05 / PROJECT TYPE *</span><select name="type" required defaultValue=""><option value="" disabled>Select a service</option><option>Brand identity</option><option>Website</option><option>Application / platform</option><option>Video editing</option><option>Motion graphics</option><option>Creative partnership</option></select></label>
          <label><span>06 / TIMELINE *</span><select name="timeline" required defaultValue=""><option value="" disabled>Select a timeline</option><option>As soon as possible</option><option>1–2 months</option><option>3–6 months</option><option>Exploring for now</option></select></label>
          <label><span>07 / BUDGET RANGE</span><select name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>To be discussed</option><option>Defined budget</option><option>Need a proposal</option></select></label>
          <label className="brief-message"><span>08 / THE BRIEF *</span><textarea name="brief" required placeholder="What are we making, who is it for, and what should it change?" rows={6} /></label>
          <button type="submit" disabled={status === 'opening'}><span>{status === 'idle' ? 'PREPARE EMAIL' : status === 'opening' ? 'OPENING EMAIL…' : 'EMAIL DRAFT READY'}</span><i>{status === 'ready' ? '✓' : '↗'}</i></button>
          <p className="project-brief-status" aria-live="polite">{status === 'ready' ? 'Your email draft is ready in your default mail app.' : 'Your information stays in your browser until you choose to send.'}</p>
        </form>
      </section>
    </main>
  )
}
