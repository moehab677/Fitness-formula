import { useCopy } from '../i18n/useCopy'
import { SectionHeader } from '../components/SectionHeader'
import { useLocale } from '../i18n/LocaleContext'
import { Section } from './Section'

// Coaching approach (reference "delivery sequence"): steps joined by a 2px accent rule with
// square nodes — vertical on mobile, horizontal from 1100px.
export function Approach() {
  const copy = useCopy()
  const lang = useLocale()
  const t = copy.sections.approach
  const stages: { title: string; body: string }[] =
    lang === 'en'
      ? [
          {
            title: 'Assess',
            body: 'Structural movement audit, kinetic joint mobility mapping, baseline bloodwork review, and lifestyle load evaluation.',
          },
          {
            title: 'Design',
            body: 'Bespoke resistance stimulus, target heart rate zones, and dietary guidelines matched exactly to your travel and dinner schedules.',
          },
          {
            title: 'Execute',
            body: 'Direct video form feedback, load volume telemetry, and micro-adjustments for unexpected work spikes or low sleep scores.',
          },
          {
            title: 'Optimize',
            body: 'Quarterly periodization pivots, deload cycling, and progressive autonomic conditioning to ensure perpetual athletic preservation.',
          },
        ]
      : copy.approach.steps.map((step) => ({ title: step.title, body: step.body.join(' ') }))
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
                {lang === 'en' ? `Stage ${number}` : `${t.stepLabel} ${number}`}
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
