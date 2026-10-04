import { useEffect } from 'react'

// Soft scroll entrances: every `.reveal` element gets `.is-in` the first time it enters the
// viewport (globals.css animates the change). Re-runs when the language changes, because
// re-keyed lists mount fresh elements.
export function useReveal(dependency: unknown) {
  useEffect(() => {
    const pending = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)'))
    if (!('IntersectionObserver' in window)) {
      pending.forEach((element) => element.classList.add('is-in'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    pending.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [dependency])
}
