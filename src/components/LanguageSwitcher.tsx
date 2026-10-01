import { useActiveSection } from '../hooks/useActiveSection'
import { useLocale, useSetLocale } from '../i18n/LocaleContext'
import { useCopy } from '../i18n/useCopy'

// `segmented` is the design's EN | AR chip (current language marked, the other a link);
// `link` is a plain text link (footer). Both keep the reader's section when switching.
export function LanguageSwitcher({ variant = 'link' }: { variant?: 'segmented' | 'link' }) {
  const lang = useLocale()
  const setLang = useSetLocale()
  const copy = useCopy()
  const active = useActiveSection()
  const other = lang === 'en' ? 'ar' : 'en'
  const href = `/${other}/#${active}`
  if (variant === 'segmented') {
    const codes = { en: copy.nav.codeEn, ar: copy.nav.codeAr }
    const current = <span aria-current="true">{codes[lang]}</span>
    const link = (
      <a
        href={href}
        hrefLang={other}
        lang={other}
        onClick={(event) => {
          event.preventDefault()
          void setLang(other)
        }}
      >
        {codes[other]}
        <span className="sr-only"> {copy.nav.switchLabel}</span>
      </a>
    )
    return (
      <div className="lang text-label-sm label-caps">
        {lang === 'en' ? current : link}
        {lang === 'en' ? link : current}
      </div>
    )
  }
  return (
    <a
      className="flex min-h-target items-center"
      href={href}
      hrefLang={other}
      lang={other}
      onClick={(event) => {
        event.preventDefault()
        void setLang(other)
      }}
    >
      {/* The other language's name, written in that language. */}
      {copy.nav.switchLabel}
    </a>
  )
}
