import { useEffect, useRef, useState, type CSSProperties } from 'react'
import transformations from '../data/transformations.json'
import { useCopy } from '../i18n/useCopy'
import { useLocale } from '../i18n/LocaleContext'
import { Icon } from '../components/Icon'
import { SectionHeader } from '../components/SectionHeader'
import { useCarouselDrag } from '../hooks/useCarouselDrag'
import { Section } from './Section'

// Transformation stories as the reference's client "dossier" cards: name, role and duration
// badge, the challenge and plan, then the measured results in accent labels. Carousel with
// square controls, swipe/drag and square dots.
export function Transformations() {
  const copy = useCopy()
  const t = copy.sections.transformations
  const lang = useLocale()
  const items = transformations.items
    .filter((item) => item.consent.granted)
    .sort((a, b) => a.order - b.order)
  const [per, setPer] = useState(3)
  const [slide, setSlide] = useState(0)
  const trackRef = useRef<HTMLUListElement>(null)
  const total = Math.max(1, items.length - per + 1)

  useEffect(() => {
    const update = () => setPer(window.innerWidth < 721 ? 1 : window.innerWidth < 1100 ? 2 : 3)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    setSlide((current) => Math.min(current, total - 1))
  }, [total])

  const move = (direction: number) => {
    setSlide((current) => (current + direction + total) % total)
  }

  const { containerProps } = useCarouselDrag({ onMove: move, isRtl: lang === 'ar', trackRef })

  return (
    <Section id="transformations">
      <div className="car-head">
        <SectionHeader id="transformations" heading={t.heading} accent={t.accent} />
        <div className="car-ctrls">
          <button
            type="button"
            className="car-btn"
            aria-label={t.previousStories}
            onClick={() => move(-1)}
          >
            <Icon name="arrow-back" />
          </button>
          <button
            type="button"
            className="car-btn car-btn-p"
            aria-label={t.nextStories}
            onClick={() => move(1)}
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
        {...containerProps}
      >
        <ul
          className="car-track"
          ref={trackRef}
          style={{ '--i': slide, '--per': per } as CSSProperties}
        >
          {items.map((item, itemIndex) => (
            <li
              key={item.id}
              className="dossier"
              aria-roledescription="slide"
              aria-label={`${itemIndex + 1} / ${items.length}`}
            >
              <header className="dossier-head">
                <div>
                  <h3 className="t-h-sm caps">{item.name[lang]}</h3>
                  <p className="dossier-role t-label-sm caps">{item.role[lang]}</p>
                </div>
                {item.duration && (
                  <span className="badge t-label-sm caps">{item.duration[lang]}</span>
                )}
              </header>
              <div className="dossier-part">
                <span className="t-label-sm caps">{t.challengeLabel}</span>
                <p className="t-body-sm">{item.challenge[lang]}</p>
              </div>
              <div className="dossier-part">
                <span className="t-label-sm caps">{t.planLabel}</span>
                <p className="t-body-sm">{item.plan[lang]}</p>
              </div>
              <dl className="metrics t-label-sm caps" aria-label={t.resultsLabel}>
                {item.results.map((result) => (
                  <div key={result.label.en}>
                    <dt>{result.label[lang]}:</dt>
                    <dd>
                      {'from' in result && result.from && (
                        <>
                          <span className="from">{result.from[lang]}</span>{' '}
                        </>
                      )}
                      {result.value[lang]}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </div>
      <div className="car-dots">
        {Array.from({ length: total }, (_, dot) => (
          <button
            key={dot}
            type="button"
            className={`car-dot${dot === slide ? ' on' : ''}`}
            aria-label={t.goToStory.replace('{n}', String(dot + 1))}
            aria-current={dot === slide ? 'true' : undefined}
            onClick={() => setSlide(dot)}
          />
        ))}
      </div>
    </Section>
  )
}
