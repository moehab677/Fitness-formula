import { useCopy } from '../i18n/useCopy'
import { SectionHeader } from '../components/SectionHeader'
import { Icon, type IconName } from '../components/Icon'
import { useLocale } from '../i18n/LocaleContext'
import { Section, type SectionProps } from './Section'

// My Approach, from the approved design's "steps" block: accent system line behind the
// cards (desktop), gradient number tile, "Step 0n" kicker, title and approved copy. The
// design's per-step "output" chips (dossier, blueprint…) are not approved copy.
export function Approach({ index }: SectionProps) {
  const copy = useCopy()
  const lang = useLocale()
  const t = copy.sections.approach
  const stages: { title: string; body: string; output: string; icon: IconName }[] = lang === 'en'
    ? [
        { title: 'Assess', body: 'Structural movement audit, kinetic joint mobility mapping, baseline bloodwork review, and lifestyle load evaluation.', output: '360° biometric dossier', icon: 'baseline' },
        { title: 'Design', body: 'Bespoke resistance stimulus, target heart rate zones, and dietary guidelines matched exactly to your travel and dinner schedules.', output: 'Weekly blueprint', icon: 'calendar' },
        { title: 'Execute', body: 'Direct video form feedback, load volume telemetry, and micro-adjustments for unexpected work spikes or low sleep scores.', output: 'Async coaching feedback', icon: 'video' },
        { title: 'Optimize', body: 'Quarterly periodization pivots, deload cycling, and progressive autonomic conditioning to ensure perpetual athletic preservation.', output: 'Sustainable autonomy', icon: 'refresh' },
      ]
    : copy.approach.steps.map((step, i) => ({ title: step.title, body: step.body.join(' '), output: '', icon: (['baseline', 'calendar', 'video', 'refresh'][i] ?? 'check') as IconName }))
  return (
    <Section id="approach">
      <SectionHeader
        id="approach"
        index={index}
        label={t.label}
        heading={t.heading}
        accent={t.accent}
        tag="  "
        lead={t.lead}
      />
      <div className="relative">
        <span aria-hidden="true" className="steps-line line-draw" />
        <ol className="grid4 grid md:grid-cols-2 max-md:grid-cols-1 xs:grid-cols-1 gap-[32px] ">
          {stages.map((step, i) => {
            const number = String(i + 1).padStart(2, '0')
            return (
              <li key={step.title} className="card card-hover reveal z-10 p-[32px]">
                <span aria-hidden="true" className="step-n mb-[28px] text-[34px]">
                  {number}
                </span>
                <p className="mb-[8px] text-label-sm label-caps text-accent">
                  {lang === 'en' ? `Stage ${number}` : `${t.stepLabel} ${number}`}
                </p>
                <h3 className="heading mb-[12px] text-headline-lg label-caps">{step.title}</h3>
                <p className="text-body-card text-muted">{step.body}</p>
                {step.output && (
                  <p className="out">
                    <Icon name={step.icon} />
                    {step.output}
                  </p>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
