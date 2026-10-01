import { renderToString } from 'react-dom/server'
import { App } from './App'
import en from './data/copy/en.json'
import ar from './data/copy/ar.json'
import { getCopy, registerCopy } from './i18n/useCopy'
import { site } from './config/site'
import type { Lang } from './i18n/LocaleContext'
import { headScript } from './head-script'
import manifest from './generated/image-manifest.json'

registerCopy('en', en)
registerCopy('ar', ar)

export function render(lang: Lang, route: 'home' | 'thanks') {
  const page = getCopy(lang)
  const base = site.siteUrl.replace(/\/$/, '')
  const hero = manifest.hero.variants.mobile.sources.avif[0]
  const font = lang === 'ar' ? '/fonts/cairo-arabic-900.woff2' : '/fonts/manrope-latin-var.woff2'
  const head = `<title>${page.meta.title}</title><meta name="description" content="${page.meta.description}"><link rel="canonical" href="${base}/${lang}/"><link rel="alternate" hreflang="en" href="${base}/en/"><link rel="alternate" hreflang="ar" href="${base}/ar/"><link rel="alternate" hreflang="x-default" href="${base}/en/"><meta property="og:title" content="${page.meta.title}"><meta property="og:description" content="${page.meta.description}"><meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'ar_EG'}"><meta property="og:image" content="${base}${hero}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${page.meta.title}"><meta name="twitter:description" content="${page.meta.description}">${route === 'thanks' ? '<meta name="robots" content="noindex">' : `<link rel="preload" href="${font}" as="font" type="font/woff2" crossorigin><link rel="preload" href="${hero}" as="image" fetchpriority="high">`}`
  return { html: renderToString(<App lang={lang} route={route} />), head, headScript }
}
