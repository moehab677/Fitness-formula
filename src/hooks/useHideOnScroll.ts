import { useEffect, useState } from 'react'

export function useHideOnScroll() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let frame = 0
    let previousY = window.scrollY
    let accumulatedDown = 0
    const desktop = window.matchMedia('(min-width: 1200px)')
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        if (desktop.matches || y <= 64 || y < previousY) {
          accumulatedDown = 0
          setHidden(false)
        } else {
          accumulatedDown += y - previousY
          if (accumulatedDown > 8) setHidden(true)
        }
        previousY = y
      })
    }
    const reveal = () => {
      accumulatedDown = 0
      setHidden(false)
    }
    window.addEventListener('scroll', update, { passive: true })
    desktop.addEventListener('change', reveal)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      desktop.removeEventListener('change', reveal)
    }
  }, [])

  return { hidden, reveal: () => setHidden(false) }
}
