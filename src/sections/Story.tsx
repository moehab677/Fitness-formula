import { useCopy } from '../i18n/useCopy'
import { Icon } from '../components/Icon'
import { ResponsiveImage } from '../components/ResponsiveImage'

// 03 — My story (reference): photo fading into the page, heading, lead, accent-bordered
// box with the guiding principle, the story text, mission line with the 2px accent rule, and the stat chips. From 1100px the
// photo sits beside the copy.
export function Story() {
  const t = useCopy().sections.story
  const [continuation, quote] = t.body
  // The Arabic lead is only the opening sentence; English already includes the continuation.
  const showContinuation = continuation && !t.lead.includes(continuation.slice(0, 24))
  // The mission line emphasises one phrase (copy: missionHighlight).
  const at = t.mission.indexOf(t.missionHighlight)
  const highlighted = at >= 0 ? t.missionHighlight : ''
  const before = at >= 0 ? t.mission.slice(0, at) : t.mission
  const after = at >= 0 ? t.mission.slice(at + highlighted.length) : ''
  return (
    <section id="story" aria-labelledby="story-heading" className="story sec">
      <div className="story-grid wrap max-lg:px-0">
        <div className="media">
          <ResponsiveImage
            assetKey="story"
            alt={t.alt}
            sizes="(min-width: 1100px) 40vw, 100vw"
            className="media-img"
          />
          <span className="scrim" aria-hidden="true" />
        </div>
        <div className="story-body max-lg:px-pad">
          <h2 id="story-heading" className="t-h2 caps">
            {t.heading}
            {t.accent && (
              <>
                {' '}
                <br />
                <span className="acc">{t.accent}</span>
              </>
            )}
          </h2>
          <p className="story-lead t-body">
            {t.lead}
            {showContinuation && <> {continuation}</>}
          </p>
          <blockquote className="quote reveal">
            <Icon name="format-quote" />
            <p className="t-h-md caps">{t.highlight}</p>
          </blockquote>
          {quote && <p className="story-text t-body reveal">{quote}</p>}
          <p className="mission t-body reveal">
            {before}
            {highlighted && <strong className="acc">{highlighted}</strong>}
            {after}
          </p>
          <ul className="chips">
            {t.stats.map((stat) => (
              <li key={stat.detail} className="chip">
                <p className="chip-v t-h-lg">{stat.value}</p>
                <p className="chip-l t-label-sm caps">{stat.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
