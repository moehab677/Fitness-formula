import { hydrateRoot, createRoot } from 'react-dom/client'
import { App } from './App'
import { registerCopy } from './i18n/useCopy'
import type { Lang } from './i18n/LocaleContext'
import './styles/globals.css'

/** Derive the initial language from the URL path (source of truth), the document's
 *  `lang` attribute (set by prerender), or localStorage (returning-visitor hint). */
function detectLang(): Lang {
  // 1. URL is the primary source of truth.
  const pathMatch = window.location.pathname.match(/^\/(?:ar|en)(?:\/|$)/)
  if (pathMatch) return pathMatch[0].includes('ar') ? 'ar' : 'en'

  // 2. Prerendered HTML already carries the correct lang attribute.
  if (document.documentElement.lang === 'ar') return 'ar'

  // 3. Returning-visitor preference (used by the root "/" redirect script).
  try {
    if (localStorage.getItem('tff-lang') === 'ar') return 'ar'
  } catch {
    // Storage unavailable — fall through to default.
  }

  return 'en'
}

const root = document.getElementById('root')
if (root) {
  const lang = detectLang()
  const route = document.body.dataset.route === 'thanks' ? 'thanks' : 'home'

  // Sync the document attributes immediately so the CSS token overrides
  // (`:root[lang='ar']`) and logical-property direction are active before
  // React paints.  This is a no-op when the prerendered HTML already matches.
  document.documentElement.lang = lang
  // Enables the scripted entrances (globals.css); prerendered pages already carry it.
  document.documentElement.classList.add('js')
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'

  // Persist the detected language for the root "/" redirect script.
  try {
    localStorage.setItem('tff-lang', lang)
  } catch {
    // Storage unavailable — non-critical.
  }

  // Load the matching copy bundle, then hydrate (or mount fresh on dev).
  const load = lang === 'ar' ? import('./data/copy/ar.json') : import('./data/copy/en.json')
  void load.then((copy) => {
    registerCopy(lang, copy.default)
    if (root.innerHTML.trim()) {
      hydrateRoot(root, <App lang={lang} route={route} />)
    } else {
      createRoot(root).render(<App lang={lang} route={route} />)
    }
    requestAnimationFrame(() => (document.documentElement.dataset.hydrated = 'true'))
  })
}
