import { useCopy } from '../i18n/useCopy'
import { Icon } from '../components/Icon'
import { PhotoSection } from '../components/PhotoSection'
// import { SectionLabel } from '../components/SectionLabel'
import type { SectionProps } from './Section'

// My Story follows the reference's tall framed photo, quote, axiom panel, field HUD, and stat minis.
export function Story({ index }: SectionProps) {
  const t = useCopy().sections.story
  return (
    <PhotoSection
      id="story"
      photo="story"
      alt={t.alt}
      order="photo-first"
      aspect="tall"
      photoReflect={false}
      // eyebrow={<SectionLabel index={index} label={t.label} tag="Philosophical anchor" />}
      photoOverlay={
        <span className="hud story-hud">
          <Icon name="baseline" /> {t.fieldLog}
        </span>
      }
    >
      <div className="axiom reveal">
        <span className="ico ico-lg">
          <Icon name="quote" />
        </span>
        <div>
          <p className="kicker mb-[6px]">{t.axiomLabel}</p>
          <p className="heading text-[38px] leading-[1] label-caps">{t.highlight}</p>
        </div>
      </div>

      {/* <p aria-hidden="true" className="quote-mark">
        “
      </p>
      <h2
        id="story-heading"
        className="heading reveal mb-[20px] text-[42px] font-bold leading-[0.98] tracking-[-0.015em] md:text-[56px] lg:text-[72px] label-caps"
      >
        {t.heading}
        {t.accent && (
          <>
            {' '}
            <span className="acc">{t.accent}</span>
          </>
        )}
      </h2> */}
      <p className="lead reveal text-text">{t.lead}</p>
      {/* <div className="axiom reveal">
        <span className="ico ico-lg">
          <Icon name="quote" />
        </span>
        <div>
          <p className="kicker mb-[6px]">{t.axiomLabel}</p>
          <p className="heading text-[38px] leading-[1] label-caps">{t.highlight}</p>
        </div>
      </div> */}
      <p className="lead reveal italic text-muted">{t.mission}</p>
      <ul className="minis">
        {t.stats.map((stat, index) => (
          <li key={index} className="card mini">
            <p className="mini-v acc">{stat.value}</p>
            <p className="tag">{stat.detail}</p>
          </li>
        ))}
      </ul>
      {/* <ul className="minis">
        <li className="card mini">
          <p className="mini-v acc">5+ yrs</p>
          <p className="tag">Training Experience</p>
        </li>
        <li className="card mini">
          <p className="mini-v">40 +</p>
          <p className="tag">Clients Coached</p>
        </li>
        <li className="card mini">
          <p className="mini-v">98.2%</p>
          <p className="tag">Client Retention</p>
        </li>
      </ul> */}
    </PhotoSection>
  )
}
