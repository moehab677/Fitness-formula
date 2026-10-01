import { useState, type FormEvent } from 'react'
import { site } from '../config/site'
import { useCopy } from '../i18n/useCopy'
import { submitLead } from '../lib/leadSubmit'

// Retained for the existing isolated component test; this component is no longer mounted on the landing page.
export function LeadForm() {
  const copy = useCopy()
  const t = copy.form
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'offline'>('idle')
  const [name, setName] = useState('')
  const [values, setValues] = useState({ whatsapp: '', goal: '', struggle: '', contactTime: 'anytime' })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = await submitLead({ name, ...values })
    setStatus(result)
  }

  if (status === 'success') {
    return <p role="status">{t.success.replace('{name}', name)}</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
      <label className="flex flex-col gap-[8px]">
        {t.name}
        <input className="field" name="name" value={name} onChange={(event) => setName(event.target.value)} required />
      </label>
      <label className="flex flex-col gap-[8px]">
        {t.whatsapp}
        <input className="field" name="whatsapp" value={values.whatsapp} onChange={(event) => setValues({ ...values, whatsapp: event.target.value })} required />
      </label>
      <label className="flex flex-col gap-[8px]">
        {t.goal}
        <textarea className="field" name="goal" value={values.goal} onChange={(event) => setValues({ ...values, goal: event.target.value })} required />
      </label>
      <label className="flex flex-col gap-[8px]">
        {t.struggle}
        <textarea className="field" name="struggle" value={values.struggle} onChange={(event) => setValues({ ...values, struggle: event.target.value })} required />
      </label>
      <label className="flex flex-col gap-[8px]">
        {t.contactTime}
        <select className="field" name="contactTime" value={values.contactTime} onChange={(event) => setValues({ ...values, contactTime: event.target.value })}>
          {Object.entries(t.contactTimes).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </label>
      {status === 'error' || status === 'offline' ? (
        <p role="alert">{status === 'error' ? t.errorGeneric : t.errorOffline} <a href={site.bookingUrl}>{t.fallbackText}</a></p>
      ) : null}
      <button className="btn btn-p" type="submit">{t.submit}</button>
      <p className="text-body-sm text-muted">{t.privacyNote}</p>
    </form>
  )
}
