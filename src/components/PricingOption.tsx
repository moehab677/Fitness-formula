import type pricing from '../data/pricing.json'
import { formatNumber } from '../i18n/format'
import { useCopy } from '../i18n/useCopy'
import { useLocale } from '../i18n/LocaleContext'
import { Icon } from './Icon'

type Tier = (typeof pricing.tiers)[number]

// The single session is the reference's dark standard card; the bundle is the solid accent
// card with dark ink text.
export function PricingOption({ tier }: { tier: Tier }) {
  const copy = useCopy()
  const lang = useLocale()
  const t = copy.sections.offer
  const amount = formatNumber(tier.price, lang)
  const currency = copy.currency[tier.currency as keyof typeof copy.currency] ?? tier.currency
  const isEnglish = lang === 'en'
  const features = tier.highlighted
    ? isEnglish
      ? [
          'Four 45-minute progressive reviews',
          'Full WhatsApp async telemetry & form checks',
          'Adaptive adjustments during travel or high-stress weeks',
        ]
      : [
          'مراجعات تدريجية لمدة 45 دقيقة',
          'متابعة وتعديلات عبر واتساب',
          'تعديلات حسب التغييرات في روتينك',
        ]
    : isEnglish
      ? [
          '45-minute focused video consultation',
          'Personalized exercise & nutrition roadmap PDF',
          'No recurring lock-in; book as needed',
        ]
      : [
          'جلسة استشارة مركزة لمدة 45 دقيقة',
          'خطة تمارين وتغذية شخصية',
          'من غير اشتراك متكرر؛ احجز عند الحاجة',
        ]
  const description = tier.highlighted
    ? isEnglish
      ? '4 structured sessions designed to build baseline strength, monitor kinetic progress, and solidify lasting behavioral routines.'
      : '٤ جلسات منظمة لبناء القوة ومتابعة تقدمك وتثبيت عادات مستمرة.'
    : isEnglish
      ? 'Full kinematic movement audit, dietary calibration, and exercise plan tailored to your exact immediate needs.'
      : 'تقييم للحركة والتغذية وخطة تمارين مناسبة لاحتياجاتك.'
  const list = (
    <ul className="tier-list t-label-sm caps">
      {features.map((feature) => (
        <li key={feature}>
          <Icon name="check" />
          {feature}
        </li>
      ))}
    </ul>
  )

  if (tier.highlighted) {
    const perSession = formatNumber(Math.round(tier.price / (tier.duration.count ?? 1)), lang)
    return (
      <article className="tier-hl reveal">
        <div className="tier-hl-top">
          <span className="tier-badge t-label-sm caps">
            {isEnglish ? 'Recommended' : 'موصى به'}
          </span>
          {tier.note && <span className="tier-save t-label-sm caps">{tier.note[lang]}</span>}
        </div>
        <h3 className="t-h-lg caps">
          {tier.name[lang]} — {amount} {currency}
        </h3>
        <p className="tier-hl-sub t-label-sm caps">
          {isEnglish
            ? `Want ongoing support? · ${perSession} ${currency} / session effective · 8-week validity`
            : `${t.bundleHeading} · ${perSession} ${currency} للجلسة · صالحة لمدة 8 أسابيع`}
        </p>
        <p className="tier-hl-desc t-body-sm">{description}</p>
        {list}
      </article>
    )
  }

  return (
    <article className="tier reveal">
      <div className="tier-top">
        <h3 className="t-h-sm caps">{isEnglish ? 'Single session' : tier.name[lang]}</h3>
        <p className="tier-price t-metric">
          {amount}
          <small className="caps">
            {currency} {tier.priceLabel?.[lang]}
          </small>
        </p>
      </div>
      <p className="tier-desc t-body-sm">{description}</p>
      {list}
    </article>
  )
}
