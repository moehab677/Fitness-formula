import journey from '../data/journey.json'
import { useCopy } from '../i18n/useCopy'
import { useLocale } from '../i18n/LocaleContext'
import { DualCTA } from '../components/DualCTA'
import { Icon, type IconName } from '../components/Icon'
import { SectionHeader } from '../components/SectionHeader'
import { Section, type SectionProps } from './Section'

const stepIcons: IconName[] = ['phone', 'branch', 'video', 'refresh']

// How Coaching Works, from the approved design's journey rows: large gradient step number,
// title and description from journey.json, icon tile; the dual CTAs follow immediately
// (constitution III). The design's per-step pills ("modular audit"…) are not approved copy.
export function Process({ index }: SectionProps) {
  const t = useCopy().sections.process
  const lang = useLocale()
  const steps = [...journey.steps].sort((a, b) => a.order - b.order)
  return (
    <Section id="process">
      <SectionHeader
        id="process"
        index={index}
        label={t.label}
        heading={t.heading}
        accent={t.accent}
        tag={t.tag}
        lead={t.lead}
      />
      <ol className="flex max-w-content flex-col gap-[20px]">
        {steps.map((step, i) => (
          <li
            key={step.id}
            className="card card-hover reveal flex flex-col items-start gap-[14px] px-[36px] py-[30px] md:flex-row md:items-center md:gap-[32px]"
          >
            <span aria-hidden="true" className="jnum w-24 shrink-0 text-headline-xl">
              {step.stepNumber}
            </span>
            <div className="flex-1">
              <h3 className="heading mb-[12px] text-headline-md label-caps">{step.title[lang]}</h3>
              <p className="text-body-md text-muted">{step.description[lang]}</p>
            </div>
            <span className="jmeta">
              <span aria-hidden="true" className="ico ico-md"><Icon name={stepIcons[i] ?? 'check'} /></span>
              <span className="pill text-label-sm label-caps">{t.stepTags[i]}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="reveal mt-[44px]">
        <DualCTA source="process" />
      </div>
    </Section>
  )
}
