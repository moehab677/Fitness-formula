import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useCopy } from '../i18n/useCopy'
import { useLocale } from '../i18n/LocaleContext'
import { Icon } from './Icon'
import { ResponsiveImage } from './ResponsiveImage'
import { useCarouselDrag } from '../hooks/useCarouselDrag'

const count = 8
const perView = (width: number) => (width < 720 ? 1 : width < 1100 ? 2 : 3)

export function TestimonialCarousel({ header }: { header: ReactNode }) {
  const t = useCopy().sections.results
  const lang = useLocale()
  const [per, setPer] = useState(3)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = Math.max(0, count - per) + 1
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => setPer(perView(window.innerWidth || 1440))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total)
    }, 4500)
    return () => window.clearInterval(timer)
  }, [paused, total])

  const go = useCallback(
    (direction: number) => {
      setIndex((current) => (current + direction + total) % total)
    },
    [total],
  )

  const { containerProps } = useCarouselDrag({
    onMove: go,
    isRtl: lang === 'ar',
    trackRef,
    onDragStart: () => setPaused(true),
    onDragEnd: () => setPaused(false),
  })

  return (
    <>
      <div className="car-head reveal">
        {header}
        <div className="car-ctrls">
          <button type="button" className="car-btn" aria-label={t.previous} onClick={() => go(-1)}>
            <Icon name="arrow-back" />
          </button>
          <button type="button" className="car-btn car-btn-p" aria-label={t.next} onClick={() => go(1)}>
            <Icon name="arrow" />
          </button>
        </div>
      </div>
      <div
        className="car"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ cursor: 'grab' }}
        {...containerProps}
      >
        <div className="car-track" ref={trackRef} style={{ '--i': index, '--per': per } as CSSProperties}>
          {Array.from({ length: count }, (_, i) => (
            <figure key={i} className="car-slide" aria-label={t.slideLabel.replace('{n}', String(i + 1)).replace('{total}', String(count))}>
              <div className="shot">
                <span className="shot-n">{String(i + 1).padStart(2, '0')}</span>
                <ResponsiveImage
                  assetKey={`testimonial-${i + 1}`}
                  alt={t.screenshotLabel.replace('{n}', String(i + 1))}
                  sizes="(min-width: 1100px) 33vw, (min-width: 720px) 50vw, 100vw"
                  priority={i < per}
                  className="shot-image"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
      <div className="car-foot">
        <div className="car-dots">
          {Array.from({ length: total }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`car-dot${i === index ? ' on' : ''}`}
              aria-label={t.goTo.replace('{n}', String(i + 1))}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <p className="car-count" aria-hidden="true">
          <span>{String(index + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
        </p>
      </div>
    </>
  )
}
