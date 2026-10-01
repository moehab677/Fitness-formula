import { useEffect, useRef, useState, type CSSProperties } from 'react'
import transformations from '../data/transformations.json'
import { useCopy } from '../i18n/useCopy'
import { useLocale } from '../i18n/LocaleContext'
import { Icon } from '../components/Icon'
import { SectionHeader } from '../components/SectionHeader'
import { Section, type SectionProps } from './Section'
import { useCarouselDrag } from '../hooks/useCarouselDrag'

// Initials for the avatar tile, e.g. "Ahmed Fawzy" → "AF", "A.F." → "AF".
const initials = (name: string) =>
  name
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

// Transformation stories use the reference's avatar, role, timeline, result rows and story link.
export function Transformations({ index }: SectionProps) {
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
    const update = () => setPer(window.innerWidth < 720 ? 1 : window.innerWidth < 1100 ? 2 : 3)
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

  const { containerProps } = useCarouselDrag({
    onMove: move,
    isRtl: lang === 'ar',
    trackRef,
  })

  return (
    <Section id="transformations">
      <div className="transformations-head">
        <SectionHeader
          id="transformations"
          index={index}
          label={t.label}
          heading={t.heading}
          accent={t.accent}
          tag={t.heading + ' ' + t.accent}
          className="mb-[0px]"
        />
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
        className="transformations-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label={t.carouselLabel}
        style={{ cursor: 'grab' }}
        {...containerProps}
      >
        <ul
          className="transformations-track"
          ref={trackRef}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
          style={{ '--i': slide, '--per': per } as CSSProperties}
        >
          {items.map((item, itemIndex) => (
            <li
              key={item.id}
              className="card card-hover story reveal"
              aria-roledescription="slide"
              aria-label={`${itemIndex + 1} / ${items.length}`}
            >
              <header className="story-head">
                <span aria-hidden="true" className="avatar avatar-lg">
                  {initials(item.name.en)}
                </span>
                <div className="flex-1">
                  <h3 className="story-name">{item.name[lang]}</h3>
                  <p className="text-label-sm label-caps text-dim">{item.role[lang]}</p>
                </div>
                {item.duration && (
                  <span className="dur self-start">
                    <Icon name="clock" />
                    {item.duration[lang]}
                  </span>
                )}
              </header>
              <div className="chapters">
                <div className="flex items-start gap-[16px]">
                  <span aria-hidden="true" className="ch-ico ch-warn">
                    <Icon name="warn" />
                  </span>
                  <div>
                    <p className="mb-[8px] mt-[4px] text-label-sm label-caps text-dim">
                      {t.challengeLabel}
                    </p>
                    <p className="text-body-card text-text">{item.challenge[lang]}</p>
                  </div>
                </div>
                <div className="flex items-start gap-[16px]">
                  <span aria-hidden="true" className="ch-ico">
                    <Icon name="map" />
                  </span>
                  <div>
                    <p className="mb-[8px] mt-[4px] text-label-sm label-caps text-dim">
                      {t.planLabel}
                    </p>
                    <p className="text-body-card text-text">{item.plan[lang]}</p>
                  </div>
                </div>
                <div className="flex items-start gap-[16px]">
                  <span aria-hidden="true" className="ch-ico ch-win">
                    <Icon name="trophy" />
                  </span>
                  <div className="flex-1">
                    <p className="mb-[8px] mt-[4px] text-label-sm label-caps text-dim">
                      {t.resultsLabel}
                    </p>
                    <dl className="flex flex-col gap-[8px]">
                      {item.results.map((result) => (
                        <div key={result.label.en} className="res w-fit">
                          <dt className="res-l">{result.label[lang]}</dt>
                          <dd className="res-v ms-auto text-sm">
                            {'from' in result && result.from && (
                              <>
                                <span className="res-from">{result.from[lang]}</span>
                                <Icon name="arrow" className="text-body-sm text-dim" />
                              </>
                            )}
                            {result.value[lang]}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
              {/* {item.storyUrl && (
                <a
                  href={item.storyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="story-link mt-[30px] text-label-md label-caps"
                >
                  <span>
                    {item.pronoun === 'her' ? t.readHerStory : t.readHisStory}
                    <span className="sr-only">
                      {' '}
                      — {item.name[lang]} {copy.cta.newTab}
                    </span>
                  </span>
                  <Icon name="arrow" className="text-headline-sm" />
                </a>
              )} */}
            </li>
          ))}
        </ul>
      </div>
      <div className="transformations-foot w-full flex justify-center ">
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
        {/* <p className="car-count" aria-hidden="true">
          <span>{String(slide + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
        </p> */}
      </div>
    </Section>
  )
}
