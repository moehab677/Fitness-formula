import type pricing from '../data/pricing.json'
import { formatNumber } from '../i18n/format'
import { useCopy } from '../i18n/useCopy'
import { useLocale } from '../i18n/LocaleContext'
import { Icon } from './Icon'
import { SecondaryCTA } from './SecondaryCTA'

type Tier = (typeof pricing.tiers)[number]

// The single session uses the dark surface card; the bundle uses the highlighted accent card.
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
      : ['مراجعات تدريجية لمدة 45 دقيقة', 'متابعة وتعديلات عبر واتساب', 'تعديلات حسب التغييرات في روتينك']
    : isEnglish
      ? [
          '45-minute focused video consultation',
          'Personalized exercise & nutrition roadmap PDF',
          'No recurring lock-in; book as needed',
        ]
      : ['جلسة استشارة مركزة لمدة 45 دقيقة', 'خطة تمارين وتغذية شخصية', 'من غير اشتراك متكرر؛ احجز عند الحاجة']
  const description = tier.highlighted
    ? isEnglish
      ? '4 structured sessions designed to build baseline strength, monitor kinetic progress, and solidify lasting behavioral routines.'
      : '٤ جلسات منظمة لبناء القوة ومتابعة تقدمك وتثبيت عادات مستمرة.'
    : isEnglish
      ? 'Full kinematic movement audit, dietary calibration, and exercise plan tailored to your exact immediate needs.'
      : 'تقييم للحركة والتغذية وخطة تمارين مناسبة لاحتياجاتك.'

  if (tier.highlighted) {
    return (
      <article className="featured reveal">
        <p className="badge text-label-sm label-caps">
          <Icon name="star" /> {isEnglish ? 'Recommended' : 'موصى به'}
        </p>
        <div className="featured-inner">
          <div className="relative">
            <div className="card-top mb-[28px]">
              <span
                aria-hidden="true"
                className="ico ico-lg border-on-accent/20 bg-on-accent/10 bg-none text-on-accent shadow-none"
              >
                <Icon name="star" />
              </span>
              <span className="pill pill-dark text-label-sm label-caps">
                {tier.note?.[lang] ?? tier.name[lang]}
              </span>
            </div>
            <p className="tag mb-[8px]">{isEnglish ? 'System continuity' : 'استمرارية النظام'}</p>
            <h3 className="heading mb-[12px] text-[40px] leading-[1.05] label-caps">
              {isEnglish ? 'Want ongoing support?' : t.bundleHeading}
            </h3>
            <p className="mb-[28px] text-body-sm opacity-85">{description}</p>
            <div className="price-row price-row-bundle">
              <span className="text-metric">{amount}</span>
              <span className="price-label">{currency} / 4 sessions</span>
            </div>
            <p className="price-note">500 EGP / session effective · 8-week validity</p>
            <ul className="list list-dark">
              {features.map((feature) => (
                <li key={feature}>
                  <span className="tick tick-dark"><Icon name="check" /></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <SecondaryCTA source="offer" variant="dark" label={isEnglish ? 'Book a session' : 'احجز جلسة'} className="relative w-full" />
        </div>
      </article>
    )
  }

  return (
    <article className="card card-hover reveal flex flex-col justify-between p-[40px]">
      <div>
        <div className="card-top mb-[28px]">
          <span aria-hidden="true" className="ico ico-lg"><Icon name="user" /></span>
          <span className="pill text-label-sm label-caps">{isEnglish ? 'Single' : 'جلسة واحدة'}</span>
        </div>
        <p className="tag mb-[8px]">{isEnglish ? 'Individual consultation' : 'استشارة فردية'}</p>
        <h3 className="heading mb-[12px] text-[40px] leading-[1.05] label-caps">
          {isEnglish ? 'Single session' : tier.name[lang]}
        </h3>
        <p className="mb-[28px] text-body-sm text-muted">{description}</p>
        <div className="price-row">
          <span className="heading text-metric">{amount}</span>
          <span className="price-label">{currency} / session</span>
        </div>
        <ul className="list">
          {features.map((feature) => (
            <li key={feature}>
              <span className="tick"><Icon name="check" /></span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <SecondaryCTA source="offer" label={isEnglish ? 'Reserve single session' : 'احجز جلسة واحدة'} className="w-full" />
    </article>
  )
}
