import { useCopy } from '../i18n/useCopy'

export function SkipLink() {
  const copy = useCopy()
  return (
    <a
      className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:start-4 focus:top-4 focus:rounded-full focus:bg-accent focus:px-[24px] focus:py-[12px] focus:text-on-accent"
      href="#main"
    >
      {copy.nav.skipLink}
    </a>
  )
}
