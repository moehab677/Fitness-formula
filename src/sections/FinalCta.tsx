import { useCopy } from '../i18n/useCopy'
import { DualCTA } from '../components/DualCTA'
import type { SectionProps } from './Section'

// Final CTA, in the approved design's centred panel (ambient glow, chip, display heading,
// lead and CTA pills. The supplied page ends this panel after the CTA row.
export function FinalCta({ index }: SectionProps) {
  const t = useCopy().sections.finalCta
  return (
    <section id="final-cta" aria-labelledby="final-cta-heading" className="section">
      <div className="container-canvas">
        <div className="final reveal">
          <span aria-hidden="true" className="orb orb-final" />
          <div className="relative">
            {/* <p className="chip mb-[32px] text-label-sm label-caps">
              <span className="dot" aria-hidden="true" />
              {String(index).padStart(2, '0')} — {t.label}
            </p> */}
            <h2
              id="final-cta-heading"
              className="heading mx-auto mb-[28px] mt-[32px] max-w-content text-[56px] font-extrabold leading-[0.92] tracking-[-0.02em] md:text-[84px] lg:text-[112px] label-caps"
            >
              {t.heading}
              <br />
              <span className="acc">{t.accent}</span>
            </h2>
            <p className="mx-auto mb-[44px] max-w-prose text-body-lg text-text">{t.reassurance}</p>
            <DualCTA source="final-cta" centered id="booking-action" />
            {/* <div className="seats">
              <span className="seat-bar" aria-hidden="true">
                {Array.from({ length: 12 }, (_, i) => <i key={i} className={i < 2 ? 'f' : ''} />)}
              </span>
              Active capacity: 2 of 12 seats available this cycle
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
