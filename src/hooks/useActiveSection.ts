import { useEffect, useState } from 'react'

export function useActiveSection() {
  const [active, setActive] = useState('hero')
  useEffect(() => {
    const targets = [...document.querySelectorAll<HTMLElement>('main section[id], #footer')]
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target instanceof HTMLElement) setActive(visible[0].target.id)
      },
      { rootMargin: '-64px 0px -50% 0px' },
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])
  return active
}
