import { useCopy } from '../i18n/useCopy'
import { SectionLabel } from '../components/SectionLabel'
import { TestimonialCarousel } from '../components/TestimonialCarousel'
import { Section, type SectionProps } from './Section'

export function Results({ index }: SectionProps) {
  const t = useCopy().sections.results
  const header = (
    <div className="head mb-[0px] max-w-head">
      <h2 id="testimonials-heading" className="heading mb-[20px] text-[42px] font-bold leading-[0.98] tracking-[-0.015em] md:text-[56px] lg:text-[72px] label-caps">
        {t.heading} <span className="acc">{t.accent}</span>
      </h2>
      <p className="text-body-lg text-muted">{t.lead}</p>
    </div>
  )
  return (
    <Section id="testimonials">
      {/* <SectionLabel index={index} label={t.label} tag="In their own words" /> */}
      <TestimonialCarousel header={header} />
    </Section>
  )
}
