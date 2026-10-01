import { useEffect, useRef, useState, type FocusEvent } from 'react'
import { useCopy } from '../i18n/useCopy'
import { Icon } from './Icon'
import { LanguageSwitcher } from './LanguageSwitcher'
import { PrimaryCTA } from './PrimaryCTA'

// The compact nav keeps language and the primary CTA visible at every width. The menu button
// opens the anchor links in a dropdown below 1100px.
export function SiteHeader() {
  const copy = useCopy()
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerHidden, setHeaderHidden] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const lastScrollY = useRef(0)
  const links = [
    ['story', copy.nav.story],
    ['approach', copy.nav.approach],
    // ['process', copy.nav.process],
    ['offer', copy.nav.offer],
    ['transformations', copy.nav.transformations],
  ]
  const linkList = links.map(([id, label]) => (
    <a
      key={id}
      href={`#${id}`}
      onClick={() => setMenuOpen(false)}
      className="nav-link text-label-md label-caps"
    >
      {label}
    </a>
  ))

  // While open: Escape (focus back on the toggle), a tap outside the header, or growing into
  // the desktop layout closes the panel.
  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      close()
      toggleRef.current?.focus()
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) close()
    }
    const desktop = window.matchMedia('(min-width: 1100px)')
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    desktop.addEventListener('change', close)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      desktop.removeEventListener('change', close)
    }
  }, [menuOpen])

  // Keep the navigation out of the way while scrolling down, then restore it as soon as
  // the reader scrolls back up. The expanded mobile menu always keeps the header visible.
  useEffect(() => {
    lastScrollY.current = window.scrollY
    const onScroll = () => {
      const current = window.scrollY
      const delta = current - lastScrollY.current
      if (current < 96 || delta < -4 || menuOpen) setHeaderHidden(false)
      else if (delta > 4 && current > 96) setHeaderHidden(true)
      lastScrollY.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  // Tabbing past the last panel item closes it rather than leaving it over the page.
  const onBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget
    if (next instanceof Node && !event.currentTarget.contains(next)) setMenuOpen(false)
  }

  return (
    <header
      ref={headerRef}
      className="site-header nav-shell"
      data-hidden={headerHidden && !menuOpen ? 'true' : undefined}
      onBlur={onBlur}
    >
      <div className="container-canvas relative">
        <div className="nav">
          <a href="/" className="flex min-h-target items-center gap-[12px] text-ink">
            <span className="brand-mark text-headline-sm text-on-accent" aria-hidden="true">
              <img src="/logo.png" alt="logo" />
            </span>
            <span className="brand-wordmark">{copy.nav.wordmark}</span>
          </a>
          <nav aria-label={copy.nav.primaryLabel} className="hidden gap-[6px] lg:flex">
            {linkList}
          </nav>
          <div className="flex items-center gap-[6px] md:gap-[10px]">
            <div className="flex">
              <LanguageSwitcher variant="segmented" />
            </div>
            <PrimaryCTA
              source="header"
              compact
              className="inline-flex h-[46px] w-[46px] justify-center px-[0px] md:w-auto md:justify-start md:px-[24px]"
            />
            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? copy.nav.menuClose : copy.nav.menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div id="site-menu" className="menu-panel lg:hidden">
            <nav aria-label={copy.nav.primaryLabel} className="flex flex-col">
              {linkList}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
