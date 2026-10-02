import { useCopy } from '../i18n/useCopy'
import { FaqAccordion } from '../components/FaqAccordion'
import { SectionHeader } from '../components/SectionHeader'
import { Section } from './Section'

// FAQ: approved questions from faqs.json (published items only).
export function Faq() {
  const t = useCopy().sections.faq
  return (
    <Section id="faq">
      <SectionHeader id="faq" heading={t.heading} accent={t.accent} />
      <FaqAccordion />
    </Section>
  )
}
