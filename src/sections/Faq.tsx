import { useCopy } from '../i18n/useCopy'
import { FaqAccordion } from '../components/FaqAccordion'
import { SectionHeader } from '../components/SectionHeader'
import { Section, type SectionProps } from './Section'

// FAQ: approved questions from faqs.json (published items only), in the design's FAQ cards.
export function Faq({ index }: SectionProps) {
  const t = useCopy().sections.faq
  return (
    <Section id="faq">
      <SectionHeader id="faq" index={index} label={t.label} heading={t.heading} accent={t.accent} />
      <FaqAccordion />
    </Section>
  )
}
