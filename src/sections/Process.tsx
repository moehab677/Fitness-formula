import journey from '../data/journey.json'
import { useCopy } from '../i18n/useCopy'
import { useLocale } from '../i18n/LocaleContext'
import { DualCTA } from '../components/DualCTA'
import { SectionHeader } from '../components/SectionHeader'
import { Section } from './Section'

// How coaching works (reference): accent-outlined cards with the large step number, then
// the two CTAs.
export function Process() {
  const t = useCopy().sections.process
  const lang = useLocale()
  const steps = [...journey.steps].sort((a, b) => a.order - b.order)
  return (
    <Section id="process">
      <SectionHeader id="process" heading={t.heading} accent={t.accent} lead={t.lead} />
      <ol className="steps">
        {steps.map((step) => (
          <li key={step.id} className="box box-accent step reveal">
            <span aria-hidden="true" className="step-n t-metric">
              {step.stepNumber}
            </span>
            <div>
              <h3 className="t-h-sm caps">{step.title[lang]}</h3>
              <p className="t-body-sm">{step.description[lang]}</p>
            </div>
          </li>
        ))}
      </ol>
      <DualCTA source="process" />
    </Section>
  )
}
