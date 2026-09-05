import { Link } from '../components/Link'
﻿import { type FormEvent, useEffect, useRef, useState } from 'react'
import { Starburst } from '../components/Starburst'
import { ContactLinks } from '../components/ContactLinks'
import { contactDetails, formEndpoint } from '../data/company'
import { useLanguage } from '../lib/language'
type Status = 'idle' | 'sending' | 'success' | 'error'
type ErrorCode = 'required' | 'email' | 'phone'
export function ContactPage() {
  const { language } = useLanguage(); const ar = language === 'ar'
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, ErrorCode>>({})
  const sending = useRef(false), feedback = useRef<HTMLDivElement>(null)
  useEffect(() => { if (status === 'success' || status === 'error') feedback.current?.focus() }, [status])
  const message = (code: ErrorCode) => code === 'required' ? (ar ? 'هذا الحقل مطلوب.' : 'This field is required.') : code === 'email' ? (ar ? 'أدخل بريداً إلكترونياً صحيحاً.' : 'Enter a valid email address.') : (ar ? 'أدخل رمز الدولة مسبوقاً بـ + ثم الرقم (من 7 إلى 15 رقماً).' : 'Include + and your country code, followed by 7–15 digits.')
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (sending.current) return
    const form = event.currentTarget, data = new FormData(form)
    const next: Record<string, ErrorCode> = {}
    for (const name of ['name', 'email', 'type', 'timeline', 'brief']) if (!String(data.get(name) || '').trim()) next[name] = 'required'
    const email = String(data.get('email') || '').trim(), phone = String(data.get('phone') || '').trim()
    data.set('email', email)
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'email'
    if (phone && !/^\+[1-9]\d{6,14}$/.test(phone.replace(/[\s()-]/g, ''))) next.phone = 'phone'
    setErrors(next)
    if (Object.keys(next).length) {
      setStatus('idle')
      requestAnimationFrame(() => { const first = form.querySelector<HTMLElement>('[aria-invalid="true"]'); first?.focus({ preventScroll: true }); first?.scrollIntoView({ block: 'center', behavior: 'instant' }) }); return
    }
    if (!formEndpoint) { setStatus('error'); return }
    sending.current = true; setStatus('sending')
    const controller = new AbortController(), timeout = setTimeout(() => controller.abort(), 20000)
    try {
      data.set('language', language)
      const response = await fetch(formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: controller.signal })
      if (!response.ok) throw new Error('Submission failed')
      const result = await response.json()
      if (!result || typeof result !== 'object' || result?.success === false || result?.ok === false || result?.errors?.length) throw new Error('Submission rejected')
      setStatus('success'); form.reset()
    } catch { setStatus('error');  }
    finally { clearTimeout(timeout); sending.current = false }
  }
  const field = (name: string, hint?: string) => ({ 'aria-invalid': Boolean(errors[name]), 'aria-describedby': [hint, errors[name] ? `${name}-error` : ''].filter(Boolean).join(' ') || undefined })
  const error = (name: string) => errors[name] && <small id={`${name}-error`}>{message(errors[name])}</small>
  return <main className="inner-page contact-page">
    <section className="contact-page-hero"><div className="page-hero-meta"><span>{ar ? '04 / تواصل معنا' : '04 / CONTACT'}</span><span>{ar ? 'الخطوة الأولى لفكرتك القادمة' : 'A CLEAR START FOR YOUR NEXT IDEA'}</span></div><h1>{ar ? <>لنصنع<br />شيئاً <span>مؤثراً.</span></> : <>LET’S MAKE<br />SOMETHING<br /><span>MATTER.</span></>}</h1><p>{ar ? 'شاركنا طموحك والتحدي والاتجاه الذي تتخيله لعلامتك. لنحدد معاً نقطة بداية واضحة.' : 'Share the ambition, the challenge and where you want the brand to go. We’ll turn it into a clear starting point.'}</p><Starburst className="contact-page-mark" /></section>
    <section className="brief-section section-light"><div className="brief-intro"><span>{ar ? 'تفاصيل المشروع' : 'PROJECT BRIEF'}</span><h2>{ar ? 'ما الخطوة القادمة؟' : <>TELL US<br />WHAT’S NEXT.</>}</h2><p>{ar ? 'صف ما تحتاجه والجمهور المستهدف والموعد المناسب. سنراجع التفاصيل ونحدد معك نطاق المشروع والخطوة التالية.' : 'Tell us what you need, who it is for and when you need it. We’ll review the details and discuss the scope and next step.'}</p><ContactLinks /></div>
      <form className="project-brief" onSubmit={submit} noValidate aria-busy={status === 'sending'}>
        {Object.keys(errors).length > 0 && <div className="form-summary" role="alert">{ar ? 'يرجى تصحيح الحقول المحددة أدناه.' : 'Please correct the highlighted fields below.'}</div>}
        <label><span>{ar ? '01 / الاسم *' : '01 / YOUR NAME *'}</span><input name="name" required maxLength={100} autoComplete="name" {...field('name')} />{error('name')}</label>
        <label><span>{ar ? '02 / الشركة' : '02 / COMPANY'}</span><input name="company" autoComplete="organization" maxLength={150} /></label>
        <label><span>{ar ? '03 / البريد الإلكتروني *' : '03 / EMAIL *'}</span><input name="email" required type="email" dir="ltr" autoComplete="email" maxLength={254} {...field('email')} />{error('email')}</label>
        <label><span>{ar ? '04 / الهاتف' : '04 / PHONE'}</span><input name="phone" type="tel" dir="ltr" autoComplete="tel" placeholder="+20 100 000 0000" maxLength={24} {...field('phone', 'phone-hint')} /><small id="phone-hint" className="field-hint">{ar ? 'أضف رمز الدولة. مثال مصر: ‎+20 100 000 0000' : 'Include the country code. Egypt: +20 100 000 0000'}</small>{error('phone')}</label>
        <label><span>{ar ? '05 / نوع المشروع *' : '05 / PROJECT TYPE *'}</span><select name="type" required defaultValue="" {...field('type')}><option value="" disabled>{ar ? 'اختر الخدمة' : 'Select a service'}</option>{[['Brand identity', 'هوية بصرية'], ['Website', 'موقع إلكتروني'], ['Application / platform', 'تطبيق / منصة'], ['Video editing', 'مونتاج'], ['Motion graphics', 'موشن جرافيك']].map(([en, arabic]) => <option key={en} value={en}>{ar ? arabic : en}</option>)}</select>{error('type')}</label>
        <label><span>{ar ? '06 / الجدول الزمني *' : '06 / TIMELINE *'}</span><select name="timeline" required defaultValue="" {...field('timeline')}><option value="" disabled>{ar ? 'اختر الموعد' : 'Select a timeline'}</option>{[['As soon as possible','في أقرب وقت'],['1–2 months','شهر إلى شهرين'],['3–6 months','3 إلى 6 أشهر'],['Exploring for now','أستكشف الخيارات']].map(([en, arabic]) => <option key={en} value={en}>{ar ? arabic : en}</option>)}</select>{error('timeline')}</label>
        <label><span>{ar ? '07 / الميزانية' : '07 / BUDGET'}</span><select name="budget" defaultValue=""><option value="" disabled>{ar ? 'اختر المناسب' : 'Select an option'}</option>{[['To be discussed','للنقاش'],['Defined budget','لدي ميزانية محددة'],['Need a proposal','أحتاج عرضاً']].map(([en, arabic]) => <option key={en} value={en}>{ar ? arabic : en}</option>)}</select></label>
        <label><span>{ar ? '08 / تفاصيل المشروع *' : '08 / THE BRIEF *'}</span><textarea name="brief" required rows={6} maxLength={8000} placeholder={ar ? 'ما الذي نعمل عليه؟ لمن؟ وما النتيجة التي تريد تحقيقها؟' : 'What are we making, who is it for, and what should it change?'} {...field('brief')} />{error('brief')}</label>
        <button type="submit" disabled={status === 'sending'}><span>{status === 'sending' ? (ar ? 'جارٍ الإرسال…' : 'SENDING…') : (ar ? 'أرسل تفاصيل المشروع' : 'SEND PROJECT BRIEF')}</span><i aria-hidden="true">→</i></button>
        <div ref={feedback} tabIndex={-1} className={`form-status ${status}`} role="status" aria-live="polite">{status === 'success' && (ar ? 'شكراً، وصلت تفاصيل مشروعك. سنراجعها ونتواصل معك لمناقشة نطاق العمل والخطوة التالية.' : 'Thank you. Your brief has been sent. We’ll review it and contact you to discuss the scope and next step.')}{status === 'error' && <>{!formEndpoint ? (ar ? 'الإرسال غير متاح حالياً. تفاصيلك ما زالت هنا؛ يمكنك نسخها والاحتفاظ بها.' : 'Submission is currently unavailable. Your details are still here; you can copy and keep your brief.') : (ar ? 'تعذر الإرسال. بياناتك محفوظة في النموذج. حاول مرة أخرى.' : 'We couldn’t send your brief. Your details remain in the form. Please try again.')}{contactDetails.email && <> <Link href={`mailto:${contactDetails.email}`}>{ar ? 'راسلنا بالبريد' : 'Email us directly'}</Link></>}</>}</div>
        <p className="privacy-note">{ar ? 'نستخدم بياناتك للرد على طلبك. اقرأ ' : 'We use your details to respond to your enquiry. Read our '}<Link href="/privacy">{ar ? 'سياسة الخصوصية' : 'privacy policy'}</Link>.</p>
      </form>
    </section>
  </main>
}
