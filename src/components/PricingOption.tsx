import pricing from '../data/pricing.json'
import { formatNumber } from '../i18n/format'
import { useCopy } from '../i18n/useCopy'
import { useLocale } from '../i18n/LocaleContext'
import { Icon } from './Icon'

type Tier = (typeof pricing.tiers)[number]

// The single session is the reference's dark standard card; the bundle is the solid accent
// card with dark ink text. All text comes from pricing.json and the offer copy.
export function PricingOption({ tier }: { tier: Tier }) {
  const copy = useCopy()
  const lang = useLocale()
  const t = copy.sections.offer
  const amount = formatNumber(tier.price, lang)
  const currency = copy.currency[tier.currency as keyof typeof copy.currency] ?? tier.currency
  const features: { en: string; ar: string }[] = tier.features
  const list = features.length > 0 && (
    <>
      <p className="tier-includes t-label-sm caps">{t.includesLabel}</p>
      <ul className="tier-list t-label-sm caps">
        {features.map((feature) => (
          <li key={feature.en}>
            <Icon name="check" />
            {feature[lang]}
          </li>
        ))}
      </ul>
    </>
  )

  if (tier.highlighted) {
    return (
      <article className="tier-hl reveal">
        <div className="tier-hl-top">
          <span className="tier-badge t-label-sm caps">{t.bundleHeading}</span>
          {tier.note && <span className="tier-save t-label-sm caps">{tier.note[lang]}</span>}
        </div>
        <h3 className="t-h-lg caps">
          {tier.name[lang]} — {amount} {currency}
        </h3>
        <p className="tier-hl-desc t-body-sm">{tier.description[lang]}</p>
        <p className="tier-hl-sub t-label-sm caps">{pricing.terms[lang]}</p>
        {list}
      </article>
    )
  }

  return (
    <article className="tier reveal">
      <div className="tier-top">
        <h3 className="t-h-sm caps">{tier.name[lang]}</h3>
        <p className="tier-price t-metric">
          {amount}
          <small className="caps">
            {currency} {tier.priceLabel?.[lang]}
          </small>
        </p>
      </div>
      <p className="tier-desc t-body-sm">{tier.description[lang]}</p>
      {list}
    </article>
  )
}
