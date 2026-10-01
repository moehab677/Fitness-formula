import pricing from '../data/pricing.json'
import { useCopy } from '../i18n/useCopy'
import { useLocale } from '../i18n/LocaleContext'
import { Icon } from '../components/Icon'
import { PricingOption } from '../components/PricingOption'
import { SectionHeader } from '../components/SectionHeader'
import { Section, type SectionProps } from './Section'

// Pricing follows the reference's two offer cards, terms and guarantee cards.
export function Offer({ index }: SectionProps) {
  const copy = useCopy()
  const lang = useLocale()
  const t = copy.sections.offer
  const tiers = [...pricing.tiers].sort((a, b) => a.order - b.order)
  return (
    <Section id="offer">
      <SectionHeader
        id="offer"
        index={index}
        label={t.label}
        heading={t.heading}
        accent={t.accent}
        tag={t.label}
        lead={
          <span className="offer-lead">
            <Icon name="clock" /> {tiers[0]!.name[lang]} · {tiers[0]!.duration.label[lang]}
          </span>
        }
      />
      <div className="grid items-stretch gap-[28px] md:grid-cols-2">
        {tiers.map((tier) => (
          <PricingOption key={tier.id} tier={tier} />
        ))}
      </div>
      <ul className="trust">
        <li className="card card-hover reveal flex items-start gap-[22px] p-[30px]">
          <span aria-hidden="true" className="ico ico-lg">
            <Icon name="block" />
          </span>
          <div>
            <h3 className="heading mb-[12px] text-headline-sm label-caps">{pricing.terms[lang]}</h3>
            <p className="text-body-md text-muted">
              {t.termsNote}
            </p>
          </div>
        </li>
        <li className="card card-hover reveal flex items-start gap-[22px] p-[30px]">
          <span aria-hidden="true" className="ico ico-lg">
            <Icon name="shield" />
          </span>
          <div>
            <h3 className="heading mb-[12px] text-headline-sm label-caps">
              {pricing.guarantee.title[lang]}
            </h3>
            <p className="text-body-md text-muted">{pricing.guarantee.description[lang]}</p>
          </div>
        </li>
      </ul>
    </Section>
  )
}
