import { useEffect, useRef } from 'react'
import { site } from '../../config/site'
import { useLocale } from '../../i18n/LocaleContext'
import { useCopy } from '../../i18n/useCopy'

export function ThanksPage() {
  const copy = useCopy()
  const lang = useLocale()
  const nameRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const name = new URLSearchParams(window.location.search).get('name')
    if (name && nameRef.current) {
      nameRef.current.textContent = ` ${name}`
      nameRef.current.hidden = false
    }
  }, [])
  return (
    <main id="main" className="page">
      <div className="thanks wrap">
        <h1 className="t-h2 caps">{copy.thanks.heading}</h1>
        <p className="t-body-lg">
          {copy.thanks.body}
          <span ref={nameRef} hidden />
        </p>
        <div className="btns">
          <a className="btn btn-g" href={`/${lang}/`}>
            {copy.nav.logoAlt}
          </a>
          <a className="btn btn-p" href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
            {copy.cta.secondary}
          </a>
        </div>
      </div>
    </main>
  )
}
