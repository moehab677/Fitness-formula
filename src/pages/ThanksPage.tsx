import { useEffect, useRef } from 'react'
import { site } from '../config/site'
import { useLocale } from '../i18n/LocaleContext'
import { useCopy } from '../i18n/useCopy'

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
    <main id="main" className="page min-h-screen">
      <div className="container-canvas py-[128px]">
        <h1 className="heading text-headline-xl label-caps">{copy.thanks.heading}</h1>
        <p className="mt-[24px] text-body-lg text-text">
          {copy.thanks.body}
          <span ref={nameRef} hidden />
        </p>
        <div className="mt-[40px] flex flex-wrap items-center gap-[16px]">
          <a className="btn btn-g text-label-lg label-caps" href={`/${lang}/`}>
            {copy.nav.logoAlt}
          </a>
          <a
            className="btn btn-p text-label-lg label-caps"
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.cta.secondary}
          </a>
        </div>
      </div>
    </main>
  )
}
