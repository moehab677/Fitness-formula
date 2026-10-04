import { useCopy } from '../i18n/useCopy'
import { SectionHeader } from '../components/SectionHeader'
import { Section } from './Section'

// Coaching approach (reference "delivery sequence"): steps joined by a 2px accent rule with
// square nodes — vertical on mobile, horizontal from 1100px.
export function Approach() {
  const copy = useCopy()
  const t = copy.sections.approach
  const stages = copy.approach.steps.map((step) => ({
    title: step.title,
    body: step.body.join(' '),
  }))
  return (
    <Section id="approach">
      <SectionHeader id="approach" heading={t.heading} accent={t.accent} lead={t.lead} />
      <ol className="tl">
        {stages.map((step, i) => {
          const number = String(i + 1).padStart(2, '0')
          return (
            <li key={step.title} className="tl-step reveal">
              <span className="tl-node" aria-hidden="true" />
              <span className="t-label-sm caps">
                {t.stepLabel} {number}
              </span>
              <h3 className="t-h-md caps">{step.title}</h3>
              <p className="t-body-sm">{step.body}</p>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
