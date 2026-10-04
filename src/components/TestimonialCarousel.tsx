import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useCopy } from '../i18n/useCopy'
import { useLocale } from '../i18n/LocaleContext'
import { useCarouselDrag } from '../hooks/useCarouselDrag'
import testimonials from '../data/testimonials.json'
import { Icon } from './Icon'
import { ResponsiveImage } from './ResponsiveImage'

// Slides follow the `order` field in testimonials.json (WhatsApp messages first, then the
// Facebook reviews), so reordering is a data change.
const shots = [...testimonials.items]
  .sort((a, b) => a.order - b.order)
  .flatMap((item) => item.images.map((image) => image.assetKey))
const count = shots.length
const perView = (width: number) => (width < 721 ? 1 : width < 1100 ? 2 : 3)

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
      <div className="car-head">
        {header}
        <div className="car-ctrls">
          <button type="button" className="car-btn" aria-label={t.previous} onClick={() => go(-1)}>
            <Icon name="arrow-back" />
          </button>
          <button
            type="button"
            className="car-btn car-btn-p"
            aria-label={t.next}
            onClick={() => go(1)}
          >
            <Icon name="arrow" />
          </button>
        </div>
      </div>
      <div
        className="car"
        role="region"
        aria-roledescription="carousel"
        aria-label={t.carouselLabel}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        {...containerProps}
      >
        <div
          className="car-track"
          ref={trackRef}
          style={{ '--i': index, '--per': per } as CSSProperties}
        >
          {shots.map((assetKey, i) => (
            <figure
              key={assetKey}
              className="shot"
              aria-label={t.slideLabel
                .replace('{n}', String(i + 1))
                .replace('{total}', String(count))}
            >
              <ResponsiveImage
                assetKey={assetKey}
                alt={t.screenshotLabel.replace('{n}', String(i + 1))}
                sizes="(min-width: 1100px) 33vw, (min-width: 721px) 50vw, 100vw"
                priority={i < per}
                className="shot-image"
              />
            </figure>
          ))}
        </div>
      </div>
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
    </>
  )
}
