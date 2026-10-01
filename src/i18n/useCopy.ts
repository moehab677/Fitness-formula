import type en from '../data/copy/en.json'
import { useLocale, type Lang } from './LocaleContext'

// _meta holds per-language review status and is not rendered.
export type Copy = Omit<typeof en, '_meta'>

// Copy is registered per language rather than imported as one object, so the browser bundle
// carries only the current page's language (entry-client loads it before hydrating). The
// prerender and tests register both.
const registry: Partial<Record<Lang, Copy>> = {}

export function registerCopy(lang: Lang, copy: Copy) {
  registry[lang] = copy
}

export function getCopy(lang: Lang): Copy {
  const copy = registry[lang]
  if (!copy) throw new Error(`Copy for "${lang}" is not registered`)
  return copy
}

export function useCopy() {
  return getCopy(useLocale())
}
