import { useCopy } from '../i18n/useCopy'
import { TestimonialCarousel } from '../components/TestimonialCarousel'
import { SectionHeader } from '../components/SectionHeader'
import { Section } from './Section'

// Testimonials: the clients' original message screenshots in the reference carousel frame.
export function Results() {
  const t = useCopy().sections.results
  return (
    <Section id="testimonials">
      <TestimonialCarousel
        header={
          <SectionHeader id="testimonials" heading={t.heading} accent={t.accent} lead={t.lead} />
        }
      />
    </Section>
  )
}
