import pricing from '../data/pricing.json'
import { useCopy } from '../i18n/useCopy'
import { useLocale } from '../i18n/LocaleContext'
import { Icon } from '../components/Icon'
import { PricingOption } from '../components/PricingOption'
import { Section } from './Section'

const bookingFormUrl = 'https://tally.so/r/VL2v1g'

// Pricing & offer (reference): heading + session pill, the standard card, the solid accent
// bundle card, the two trust rows and one full-width booking button.
export function Offer() {
  const copy = useCopy()
  const lang = useLocale()
  const t = copy.sections.offer
  const tiers = [...pricing.tiers].sort((a, b) => a.order - b.order)
  const first = tiers[0]
  return (
    <Section id="offer">
      <div className="offer-head reveal">
        <h2 id="offer-heading" className="t-h2 caps">
          {t.heading} {t.accent}
        </h2>
        {first && (
          <p className="pill">
            <span className="pill-dot" aria-hidden="true" />
            <span className="t-label-sm caps">
              {first.name[lang]} | {first.duration.label[lang]}
            </span>
          </p>
        )}
      </div>
      <div className="tiers">
        {tiers.map((tier) => (
          <PricingOption key={tier.id} tier={tier} />
        ))}
      </div>
      <ul className="trust">
        <li className="reveal">
          <Icon name="check-circle" />
          <div>
            <h3 className="t-label-sm caps">{pricing.terms[lang]}</h3>
            <p className="trust-desc">{t.termsNote}</p>
          </div>
        </li>
        <li className="reveal">
          <Icon name="shield" />
          <div>
            <h3 className="t-label-sm caps">{pricing.guarantee.title[lang]}</h3>
            <p className="trust-desc">{pricing.guarantee.description[lang]}</p>
          </div>
        </li>
      </ul>
      <a href={bookingFormUrl} data-source="offer" className="btn btn-p btn-lg offer-cta">
        <span>{pricing.cta.label[lang]}</span>
        <Icon name="arrow" />
      </a>
    </Section>
  )
}
