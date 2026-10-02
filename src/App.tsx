import { useState, useEffect, type ComponentType } from 'react'
import { LocaleProvider, type Lang } from './i18n/LocaleContext'
import { registerCopy, useCopy } from './i18n/useCopy'
import { registry } from './sections/registry'
import { SkipLink } from './components/SkipLink'
import { SiteHeader } from './components/SiteHeader'
import { ThanksPage } from './sections/pages/ThanksPage'
import type { SectionProps } from './sections/Section'
import { Hero } from './sections/Hero'
import { Problem } from './sections/Problem'
import { Story } from './sections/Story'
import { Approach } from './sections/Approach'
import { Process } from './sections/Process'
import { Transformations } from './sections/Transformations'
import { Results } from './sections/Results'
import { Offer } from './sections/Offer'
import { FinalCta } from './sections/FinalCta'
import { SiteFooter } from './sections/SiteFooter'
import { Faq } from './sections/Faq'
import { NotFor } from './sections/NotFor'

type Route = 'home' | 'thanks'
type SectionId = (typeof registry)[number]['id']

// The registry owns order, numbering and grounds (constitution V: sections are reordered
// through configuration); this map only binds each id to its component.
const sections: Record<SectionId, ComponentType<SectionProps>> = {
  hero: Hero,
  problem: Problem,
  story: Story,
  approach: Approach,
  process: Process,
  testimonials: Results,
  offer: Offer,
  transformations: Transformations,
  'not-for': NotFor,
  faq: Faq,
  'final-cta': FinalCta,
  footer: SiteFooter,
}

function Content({ route }: { route: Route }) {
  const copy = useCopy()

  useEffect(() => {
    document.title = copy.meta.title
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', copy.meta.description)
  }, [copy.meta])

  if (route === 'thanks') return <ThanksPage />
  const main = registry.filter((entry) => entry.id !== 'footer')
  const footer = registry.find((entry) => entry.id === 'footer')
  return (
    <div className="page">
      <SkipLink />
      <SiteHeader />
      <main id="main">
        {main.map((entry) => {
          const Component = sections[entry.id]
          return <Component key={entry.id} index={entry.index} ground={entry.ground} />
        })}
      </main>
      {footer && <SiteFooter />}
    </div>
  )
}

export function App({ lang, route = 'home' }: { lang: Lang; route?: Route }) {
  const [activeLang, setActiveLang] = useState(lang)
  const setLang = async (nextLang: Lang) => {
    if (nextLang === activeLang) return
    const copy =
      nextLang === 'ar' ? await import('./data/copy/ar.json') : await import('./data/copy/en.json')
    registerCopy(nextLang, copy.default)
    try {
      localStorage.setItem('tff-lang', nextLang)
    } catch {
      // Storage may be unavailable; the current page can still switch languages.
    }
    const nextPath = window.location.pathname.replace(/^\/(?:en|ar)(?=\/|$)/, `/${nextLang}`)
    const nextUrl =
      nextPath === window.location.pathname && window.location.pathname === '/'
        ? `/${nextLang}/${window.location.hash}`
        : `${nextPath}${window.location.hash}`
    window.history.pushState(null, '', nextUrl)
    document.documentElement.lang = nextLang
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr'
    setActiveLang(nextLang)
  }
  return (
    <LocaleProvider lang={activeLang} setLang={setLang}>
      <Content route={route} />
    </LocaleProvider>
  )
}
