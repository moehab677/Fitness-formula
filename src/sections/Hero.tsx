import { useCopy } from '../i18n/useCopy'
import { DualCTA } from '../components/DualCTA'
import { PhotoSection } from '../components/PhotoSection'
import { Ticker } from '../components/Ticker'
import { Icon, type IconName } from '../components/Icon'

// 01 — Hero, from the approved landing-page design: display heading with the accent
// gradient on "Your life.", lead, CTA pills and the framed coach photo, followed by the
// feature cards, floating coaching HUD and stat cards from the supplied page.
export function Hero() {
  const t = useCopy().sections.hero
  return (
    <>
      <PhotoSection
        id="hero"
        photo="hero"
        alt={t.alt}
        order="text-first"
        className="relative md:pt-[72px]"
        photoOverlay={
          <>
            {/* <span className="hud" style={{ top: 26, left: 26 }}>
              <span className="dot" aria-hidden="true" /> Live coaching · Active
            </span> */}
            {/* <div className="hud-card" style={{ left: -44, bottom: 120 }}>
              <span className="ico" style={{ width: 52, height: 52, borderRadius: 15, fontSize: 26 }}>
                <Icon name="variables" />
              </span>
              <div>
                <span className="stat-l" style={{ margin: 0, fontSize: 12 }}>Stamina</span>
                <div className="hud-value">+38%</div>
              </div>
            </div> */}
            {/* <span className="hud hud-location">
              <Icon name="map" /> Cairo · Online worldwide
            </span> */}
          </>
        }
        below={
          <div className="stats">
            {(
              [
                { icon: 'user' as const, ...t.stats[0]! },
                { icon: 'clock' as const, ...t.stats[1]!, accent: true },
                { icon: 'variables' as const, ...t.stats[2]! },
                { icon: 'baseline' as const, ...t.stats[3]! },
              ] as {
                icon: IconName
                label: string
                value: string
                detail: string
                accent?: boolean
              }[]
            ).map((stat) => (
              <article key={stat.label} className="card stat">
                <span className="ico">
                  <Icon name={stat.icon} />
                </span>
                <p className="stat-l">{stat.label}</p>
                <p className={`stat-v ${stat.accent ? 'acc' : ''}`}>{stat.value}</p>
                <p className="stat-d">{stat.detail}</p>
              </article>
            ))}
          </div>
        }
      >
        <span aria-hidden="true" className="orb orb-hero" />
        <p className="chip in mb-[18px] text-label-sm label-caps">
          <span className="dot" aria-hidden="true" /> {t.pill}
        </p>
        <h1
          id="hero-heading"
          className="heading in d1 mb-[28px] text-[50px] font-bold leading-[0.92] tracking-[-0.02em] md:text-[60px] lg:text-[80px] label-caps"
        >
          {t.eyebrow}
          <br />
          <span className="acc">{t.heading}</span>
        </h1>
        <p className="in d2 max-w-prose text-body-lg text-text">{t.body}</p>
        <div className="my-[40px] mb-[44px] grid gap-[16px] grid-cols-3">
          {(
            [
              { icon: 'dumbbell', ...t.features[0] },
              { icon: 'check', ...t.features[1] },
              { icon: 'spark', ...t.features[2] },
            ] as const
          ).map((feature, index) => (
            <article
              key={feature.title}
              className={`card in d${3 + index} rounded-[20px] p-[22px]  `}
            >
              <span
                aria-hidden="true"
                className="ico mb-[16px] h-[56px] w-[56px] rounded-[16px] text-[28px]  "
              >
                <Icon name={feature.icon} />
              </span>
              <h2 className="mb-[6px] text-[14px] font-bold leading-[1.3] tracking-[0.12em] label-caps">
                {feature.title}
              </h2>
              <p className="text-body-sm text-muted ">{feature.detail}</p>
            </article>
          ))}
        </div>
        <div className="rise">
          <DualCTA source="hero" />
        </div>
      </PhotoSection>
      <Ticker />
    </>
  )
}
