import { type FormEvent, useEffect, useRef, useState } from 'react'
import { Starburst } from '../components/Starburst'
import { projects } from '../data/projects'

type FormStatus = 'idle' | 'sending' | 'sent' | 'draft' | 'error'
const contactEmail = (import.meta.env.VITE_CONTACT_EMAIL || '').trim()
const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT || '').trim()

export function ContactPage() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [draft, setDraft] = useState('')
  const [copied, setCopied] = useState(false)
  const controller = useRef<AbortController | null>(null)
  const relatedProject = projects.find(item => item.id === new URLSearchParams(window.location.search).get('project'))
  useEffect(() => () => controller.current?.abort(), [])

  const submitBrief = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return
    const form = new FormData(event.currentTarget)
    if (form.get('_gotcha')) return
    for (const field of ['name', 'brief']) {
      if (!String(form.get(field) || '').trim()) {
        const input = event.currentTarget.elements.namedItem(field) as HTMLInputElement
        input.setCustomValidity('Please enter a little detail here.'); input.reportValidity(); return
      }
    }
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
      ...(relatedProject ? [`Project reference: ${relatedProject.title}`] : []),
      '',
      'THE BRIEF',
      String(form.get('brief') || ''),
    ].join('\n')

    setDraft(body)
    setCopied(false)
    if (!endpoint) {
      setStatus('draft')
      if (contactEmail) window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      return
    }
    setStatus('sending')
    controller.current = new AbortController()
    const timer = window.setTimeout(() => controller.current?.abort(), 15000)
    try {
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(form), subject, message: body }), signal: controller.current.signal,
      })
      const result = await response.json()
      if (!response.ok || result.ok !== true) throw new Error('Request was not accepted')
      setStatus('sent')
    } catch { setStatus('error') }
    finally { window.clearTimeout(timer) }
  }

  const downloadBrief = () => {
    const url = URL.createObjectURL(new Blob([draft], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a'); link.href = url; link.download = 'WAHAJ-project-brief.txt'; link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  const copyBrief = async () => {
    try { await navigator.clipboard.writeText(draft); setCopied(true) }
    catch { setCopied(false); document.querySelector<HTMLTextAreaElement>('#brief-copy')?.select() }
  }

  return (
    <main className="inner-page contact-page">
      <section className="contact-page-hero">
        <div className="page-hero-meta reveal"><span>04 / CONTACT</span><span>NEW BUSINESS / COLLABORATIONS</span></div>
        <h1 className="reveal">LET'S MAKE<br />SOMETHING<br /><span>MATTER.</span></h1>
        <p className="reveal">Share the ambition, the challenge and where you want the brand to go. We’ll turn it into a clear starting point.</p>
        <a className="text-link contact-jump reveal" href="#brief">WRITE YOUR BRIEF ↓</a>
        <Starburst className="contact-page-mark" />
      </section>

      <section id="brief" className="brief-section section-light">
        <div className="brief-intro reveal">
          <span>PROJECT BRIEF</span><h2>TELL US<br />WHAT'S NEXT.</h2>
          <p>{endpoint ? 'Share a few details and send your brief directly to our team.' : contactEmail ? 'Share a few details, then send your brief through your email app. You can also keep a copy.' : 'Shape your idea into a project brief you can copy or download. Online enquiries are not available yet.'}</p>
          {contactEmail && <a className="text-link contact-email" href={`mailto:${contactEmail}`}>{contactEmail} ↗</a>}
          <p>Not sure about budget or timing? Leave them open. Start with what you want to make and who it is for.</p>
          <div className="brief-steps" aria-hidden="true"><span>01 / DETAILS</span><span>02 / SCOPE</span><span>03 / SEND</span></div>
        </div>
        <form className="project-brief reveal" onSubmit={submitBrief} aria-busy={status === 'sending'} onInput={event => {
          const input = event.target as HTMLInputElement
          input.setCustomValidity?.('')
          if (status !== 'sending') { setStatus('idle'); setDraft(''); setCopied(false) }
        }}>
          <fieldset disabled={status === 'sending'}>
          <div className="form-trap" aria-hidden="true"><label>Leave this empty<input name="_gotcha" tabIndex={-1} autoComplete="off" /></label></div>
          {relatedProject && <p className="brief-reference">INSPIRED BY / {relatedProject.title}</p>}
          <div className="project-brief-head"><span>NEW PROJECT / {new Date().getFullYear()}</span><strong>ALL FIELDS MARKED * ARE REQUIRED</strong></div>
          <label><span>01 / YOUR NAME *</span><input name="name" required autoComplete="name" placeholder="Name" /></label>
          <label><span>02 / COMPANY</span><input name="company" autoComplete="organization" placeholder="Company or brand" /></label>
          <label><span>03 / EMAIL *</span><input name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></label>
          <label><span>04 / PHONE</span><input name="phone" type="tel" autoComplete="tel" placeholder="Country code + number" /></label>
          <label><span>05 / PROJECT TYPE *</span><select name="type" required defaultValue=""><option value="" disabled>Select a service</option><option>Brand identity</option><option>Website</option><option>Application / platform</option><option>Video editing</option><option>Motion graphics</option><option>Creative partnership</option></select></label>
          <label><span>06 / TIMELINE</span><select name="timeline" defaultValue=""><option value="">Still exploring</option><option>As soon as possible</option><option>1–2 months</option><option>3–6 months</option></select></label>
          <label><span>07 / BUDGET</span><input name="budget" maxLength={100} placeholder="Amount and currency, if known" /></label>
          <label className="brief-message"><span>08 / THE BRIEF *</span><textarea name="brief" required placeholder="What are we making, who is it for, and what should it change?" rows={6} /></label>
          <button type="submit" disabled={status === 'sending' || status === 'sent'}><span>{status === 'sending' ? 'SENDING…' : status === 'sent' ? 'BRIEF RECEIVED' : endpoint ? 'SEND PROJECT BRIEF' : contactEmail ? 'OPEN EMAIL DRAFT' : 'PREPARE PROJECT BRIEF'}</span><i>{status === 'sent' ? '✓' : '↗'}</i></button>
          <p className="project-brief-status" role="status">{status === 'sent' ? 'Thank you. Your brief has been accepted. We’ll follow up using the email you provided.' : status === 'error' ? 'Your brief could not be sent. Your details are still here—please try again, or keep a copy below.' : status === 'draft' ? contactEmail ? 'Please finish sending in your email app. If it didn’t open, copy or download your brief below. Nothing has been sent by this website.' : 'Your brief is ready to copy or download. It has not been sent.' : endpoint ? 'We’ll use the information you submit to respond to your project enquiry.' : 'Your details stay in this page until you choose to send or save them.'}</p>
          {draft && status !== 'sent' && <div className="brief-fallback">
            <label htmlFor="brief-copy"><span>YOUR PROJECT BRIEF</span></label>
            <textarea id="brief-copy" value={draft} readOnly rows={7} />
            <div><button type="button" onClick={copyBrief}>{copied ? 'COPIED ✓' : 'COPY BRIEF'}</button><button type="button" onClick={downloadBrief}>DOWNLOAD .TXT ↓</button></div>
          </div>}
          </fieldset>
        </form>
      </section>
    </main>
  )
}
