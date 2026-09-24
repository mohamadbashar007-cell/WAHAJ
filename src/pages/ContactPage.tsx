import { type FormEvent, useEffect, useRef, useState } from 'react'
import { Starburst } from '../components/Starburst'
import { projects } from '../data/projects'
import { projectArabic, useLocale } from '../lib/i18n'

type FormStatus = 'idle' | 'sending' | 'sent' | 'draft' | 'error'
const contactEmail = (import.meta.env.VITE_CONTACT_EMAIL || '').trim()
const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT || '').trim()

export function ContactPage() {
  const { isArabic, t } = useLocale()
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
        input.setCustomValidity(t('Please enter a little detail here.', 'يرجى إضافة بعض التفاصيل هنا.')); input.reportValidity(); return
      }
    }
    const name = String(form.get('name') || '')
    const company = String(form.get('company') || '')
    const subject = isArabic ? `مشروع جديد لدى وهج — ${company || name}` : `New WAHAJ project — ${company || name}`
    const body = isArabic ? [
      'وهج — موجز مشروع جديد',
      '',
      `الاسم: ${name}`,
      `الشركة: ${company}`,
      `البريد الإلكتروني: ${form.get('email') || ''}`,
      `الهاتف: ${form.get('phone') || ''}`,
      `نوع المشروع: ${form.get('type') || ''}`,
      `المدة: ${form.get('timeline') || ''}`,
      `الميزانية: ${form.get('budget') || ''}`,
      ...(relatedProject ? [`مرجع المشروع: ${projectArabic[relatedProject.id]?.title || relatedProject.title}`] : []),
      '',
      'الموجز',
      String(form.get('brief') || ''),
    ].join('\n') : [
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
    const link = document.createElement('a'); link.href = url; link.download = isArabic ? 'WAHAJ-project-brief-ar.txt' : 'WAHAJ-project-brief.txt'; link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  const copyBrief = async () => {
    try { await navigator.clipboard.writeText(draft); setCopied(true) }
    catch { setCopied(false); document.querySelector<HTMLTextAreaElement>('#brief-copy')?.select() }
  }

  return (
    <main className="inner-page contact-page">
      <section className="contact-page-hero">
        <div className="page-hero-meta reveal"><span>04 / {t('CONTACT', 'تواصل معنا')}</span><span>{t('NEW BUSINESS / COLLABORATIONS', 'مشاريع جديدة / تعاون')}</span></div>
        <h1 className="reveal">{t(<>START A<br /><span>PROJECT.</span></>, <>ابدأ<br /><span>مشروعًا.</span></>)}</h1>
        <p className="reveal">{t('Share the project, audience, scope and timeline.', 'حدّثنا عن المشروع والجمهور والنطاق والمدة المتوقعة.')}</p>
        <a className="text-link contact-jump reveal" href="#brief">{t('WRITE YOUR BRIEF', 'اكتب موجز مشروعك')} ↓</a>
        <Starburst className="contact-page-mark" />
      </section>

      <section id="brief" className="brief-section section-light">
        <div className="brief-intro reveal">
          <span>{t('PROJECT BRIEF', 'موجز المشروع')}</span><h2>{t(<>PROJECT<br />DETAILS.</>, <>تفاصيل<br />المشروع.</>)}</h2>
          <p>{endpoint ? t('Complete the form to send your project brief.', 'أكمل النموذج لإرسال موجز مشروعك.') : contactEmail ? t('Complete the form to open an email draft or save a copy.', 'أكمل النموذج لفتح مسودة بريد أو حفظ نسخة.') : t('Complete the form, then copy or download the brief.', 'أكمل النموذج ثم انسخ الموجز أو نزّله.')}</p>
          {contactEmail && <a className="text-link contact-email" href={`mailto:${contactEmail}`}>{contactEmail} ↗</a>}
          <p>{t('Budget and timeline can be left open.', 'يمكن ترك الميزانية والمدة مفتوحتين.')}</p>
        </div>
        <form className="project-brief reveal" onSubmit={submitBrief} aria-busy={status === 'sending'} onInput={event => {
          const input = event.target as HTMLInputElement
          input.setCustomValidity?.('')
          if (status !== 'sending') { setStatus('idle'); setDraft(''); setCopied(false) }
        }}>
          <fieldset disabled={status === 'sending'}>
          <div className="form-trap" aria-hidden="true"><label>{t('Leave this empty', 'اترك هذا الحقل فارغًا')}<input name="_gotcha" tabIndex={-1} autoComplete="off" /></label></div>
          {relatedProject && <p className="brief-reference">{t('INSPIRED BY', 'مستوحى من')} / {isArabic ? (projectArabic[relatedProject.id]?.title || relatedProject.title) : relatedProject.title}</p>}
          <div className="project-brief-head"><span>{t('NEW PROJECT', 'مشروع جديد')} / {new Date().getFullYear()}</span><strong>{t('ALL FIELDS MARKED * ARE REQUIRED', 'كل الحقول المعلّمة * مطلوبة')}</strong></div>
          <label><span>01 / {t('YOUR NAME', 'اسمك')} *</span><input name="name" required autoComplete="name" placeholder={t('Name', 'الاسم')} /></label>
          <label><span>02 / {t('COMPANY', 'الشركة')}</span><input name="company" autoComplete="organization" placeholder={t('Company or brand', 'الشركة أو العلامة')} /></label>
          <label><span>03 / {t('EMAIL', 'البريد الإلكتروني')} *</span><input name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></label>
          <label><span>04 / {t('PHONE', 'الهاتف')}</span><input name="phone" type="tel" autoComplete="tel" placeholder={t('Country code + number', 'رمز الدولة + الرقم')} /></label>
          <label><span>05 / {t('PROJECT TYPE', 'نوع المشروع')} *</span><select name="type" required defaultValue=""><option value="" disabled>{t('Select a service', 'اختر خدمة')}</option><option>{t('Brand identity', 'هوية بصرية')}</option><option>{t('Website', 'موقع إلكتروني')}</option><option>{t('Application / platform', 'تطبيق / منصة')}</option><option>{t('Video editing', 'مونتاج فيديو')}</option><option>{t('Motion graphics', 'موشن جرافيك')}</option><option>{t('Creative partnership', 'شراكة إبداعية')}</option></select></label>
          <label><span>06 / {t('TIMELINE', 'المدة')}</span><select name="timeline" defaultValue=""><option value="">{t('Still exploring', 'ما زلت أستكشف')}</option><option>{t('As soon as possible', 'في أقرب وقت')}</option><option>{t('1–2 months', 'شهر إلى شهرين')}</option><option>{t('3–6 months', '3–6 أشهر')}</option></select></label>
          <label><span>07 / {t('BUDGET', 'الميزانية')}</span><input name="budget" maxLength={100} placeholder={t('Amount and currency, if known', 'القيمة والعملة إن كانتا معروفتين')} /></label>
          <label className="brief-message"><span>08 / {t('THE BRIEF', 'الموجز')} *</span><textarea name="brief" required placeholder={t('What are we making, who is it for, and what should it change?', 'ما الذي سنصنعه؟ ولمن؟ وما الأثر الذي يجب أن يحققه؟')} rows={6} /></label>
          <button type="submit" disabled={status === 'sending' || status === 'sent'}><span>{status === 'sending' ? t('SENDING…', 'جارٍ الإرسال…') : status === 'sent' ? t('BRIEF RECEIVED', 'استلمنا الموجز') : endpoint ? t('SEND PROJECT BRIEF', 'أرسل موجز المشروع') : contactEmail ? t('OPEN EMAIL DRAFT', 'افتح مسودة البريد') : t('PREPARE PROJECT BRIEF', 'جهّز موجز المشروع')}</span><i>{status === 'sent' ? '✓' : '↗'}</i></button>
          <p className="project-brief-status" role="status">{status === 'sent' ? t('Thank you. Your brief has been accepted. We’ll follow up using the email you provided.', 'شكرًا لك. استلمنا موجزك وسنتواصل معك عبر البريد الذي أدخلته.') : status === 'error' ? t('Your brief could not be sent. Your details are still here—please try again, or keep a copy below.', 'تعذّر إرسال الموجز. ما زالت تفاصيلك هنا؛ حاول مرة أخرى أو احتفظ بنسخة أدناه.') : status === 'draft' ? contactEmail ? t('Please finish sending in your email app. If it didn’t open, copy or download your brief below. Nothing has been sent by this website.', 'أكمل الإرسال في تطبيق البريد. إذا لم يفتح، انسخ الموجز أو نزّله أدناه. لم يرسل الموقع شيئًا بعد.') : t('Your brief is ready to copy or download. It has not been sent.', 'موجزك جاهز للنسخ أو التنزيل ولم يُرسل بعد.') : endpoint ? t('We’ll use the information you submit to respond to your project enquiry.', 'سنستخدم المعلومات التي ترسلها للرد على استفسارك عن المشروع.') : t('Your details stay in this page until you choose to send or save them.', 'تبقى تفاصيلك في هذه الصفحة حتى تختار إرسالها أو حفظها.')}</p>
          {draft && status !== 'sent' && <div className="brief-fallback">
            <label htmlFor="brief-copy"><span>{t('YOUR PROJECT BRIEF', 'موجز مشروعك')}</span></label>
            <textarea id="brief-copy" value={draft} readOnly rows={7} />
            <div><button type="button" onClick={copyBrief}>{copied ? t('COPIED ✓', 'تم النسخ ✓') : t('COPY BRIEF', 'انسخ الموجز')}</button><button type="button" onClick={downloadBrief}>{t('DOWNLOAD .TXT', 'نزّل ملف .TXT')} ↓</button></div>
          </div>}
          </fieldset>
        </form>
      </section>
    </main>
  )
}
