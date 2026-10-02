import { useActiveSection } from '../hooks/useActiveSection'
import { useLocale, useSetLocale } from '../i18n/LocaleContext'
import { useCopy } from '../i18n/useCopy'

// `segmented` is the reference's bordered "EN / AR" box (current language in the accent
// colour, the other a link); `link` is a plain text link. Both keep the reader's section.
export function LanguageSwitcher({ variant = 'link' }: { variant?: 'segmented' | 'link' }) {
  const lang = useLocale()
  const setLang = useSetLocale()
  const copy = useCopy()
  const active = useActiveSection()
  const other = lang === 'en' ? 'ar' : 'en'
  const href = `/${other}/#${active}`
  const switchTo = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    void setLang(other)
  }
  if (variant === 'segmented') {
    const codes = { en: copy.nav.codeEn, ar: copy.nav.codeAr }
    const item = (code: 'en' | 'ar') =>
      code === lang ? (
        <span aria-current="true">{codes[code]}</span>
      ) : (
        <a href={href} hrefLang={other} lang={other} onClick={switchTo}>
          {codes[code]}
          <span className="sr-only"> {copy.nav.switchLabel}</span>
        </a>
      )
    return (
      <div className="lang">
        {item('en')}
        <span aria-hidden="true">/</span>
        {item('ar')}
      </div>
    )
  }
  return (
    <a href={href} hrefLang={other} lang={other} onClick={switchTo}>
      {copy.nav.switchLabel}
    </a>
  )
}
