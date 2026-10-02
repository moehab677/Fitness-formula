import { useCopy } from '../i18n/useCopy'
import { DualCTA } from '../components/DualCTA'

// Final CTA (reference): centred band on the card surface, display-size heading with the
// accent second line, reassurance and the stacked CTAs.
export function FinalCta() {
  const t = useCopy().sections.finalCta
  return (
    <section id="final-cta" aria-labelledby="final-cta-heading" className="final sec">
      <div className="wrap">
        <h2 id="final-cta-heading" className="t-hero caps reveal">
          {t.heading} <br />
          <span className="acc">{t.accent}</span>
        </h2>
        <p className="t-body reveal">{t.reassurance}</p>
        <DualCTA source="final-cta" centered id="booking-action" />
      </div>
    </section>
  )
}
