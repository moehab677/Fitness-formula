import { useCopy } from '../i18n/useCopy'
import { SectionHeader } from '../components/SectionHeader'
import { Section } from './Section'

// 02 — The problem (reference "diagnostic" cards): numbered kicker + tag, title and body.
export function Problem() {
  const t = useCopy().sections.problem
  return (
    <Section id="problem">
      <SectionHeader id="problem" heading={t.heading} accent={t.accent} lead={t.lead} />
      <ul className="stack grid-3">
        {t.items.map((item, index) => (
          <li key={item.title} className="box reveal">
            <div className="row-top">
              <span className="t-label-sm caps acc">
                {t.itemLabel} {String(index + 1).padStart(2, '0')}
              </span>
              <span className="tag t-label-sm caps">{item.tag}</span>
            </div>
            <h3 className="t-h-sm caps">{item.title}</h3>
            <p className="t-body-sm">{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
