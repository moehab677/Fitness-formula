import { createContext, useContext, type ReactNode } from 'react'

export type Lang = 'en' | 'ar'
type LocaleContextValue = { lang: Lang; setLang: (lang: Lang) => void }
const LocaleContext = createContext<LocaleContextValue>({ lang: 'en', setLang: () => undefined })
export function LocaleProvider({
  lang,
  setLang = () => undefined,
  children,
}: {
  lang: Lang
  setLang?: (lang: Lang) => void
  children: ReactNode
}) {
  return <LocaleContext.Provider value={{ lang, setLang }}>{children}</LocaleContext.Provider>
}
export function useLocale() {
  return useContext(LocaleContext).lang
}
export function useSetLocale() {
  return useContext(LocaleContext).setLang
}
