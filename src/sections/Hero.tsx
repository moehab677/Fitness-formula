import { useCopy } from '../i18n/useCopy'
import { DualCTA } from '../components/DualCTA'
import { Icon } from '../components/Icon'
import { ResponsiveImage } from '../components/ResponsiveImage'

// 01 — Hero (reference): full-bleed coach photo fading into the page through a gradient
// scrim. On phones the copy sits at the top over the photo (reference), with a one-line
// feature strip and the CTA; the coach shows below. From 1100px the photo moves beside the copy.
export function Hero() {
  const t = useCopy().sections.hero
  return (
    <section id="hero" aria-labelledby="hero-heading" className="hero sec">
      <div className="hero-grid">
        <div className="media">
          <ResponsiveImage
            assetKey="hero"
            alt={t.alt}
            sizes="(min-width: 1100px) 42vw, 100vw"
            priority
            className="media-img"
          />
          <span className="scrim" aria-hidden="true" />
        </div>
        <div className="hero-body wrap">
          <h1 id="hero-heading" className="t-hero caps">
            {t.eyebrow} <span className="acc">{t.heading}</span>
          </h1>
          <p className="hero-lead t-body">{t.body}</p>
          <ul className="feats">
            {t.features.map((feature) => (
              <li key={feature.title} className="feat t-label-sm caps">
                {feature.title}
              </li>
            ))}
          </ul>
          <DualCTA source="hero" />
          <a href="#problem" className="scroll-hint">
            <span className="t-label-sm caps">{t.scrollHint}</span>
            <Icon name="chevron-down" />
          </a>
        </div>
      </div>
    </section>
  )
}
