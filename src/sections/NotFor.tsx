import { useCopy } from '../i18n/useCopy'
import { Icon } from '../components/Icon'
import { SectionHeader } from '../components/SectionHeader'
import { Section } from './Section'

// Who this isn't for: cancel-marked reasons that expand like the FAQ, closed by who it
// does suit.
export function NotFor() {
  const t = useCopy().sections.notFor
  return (
    <Section id="not-for">
      <SectionHeader id="not-for" heading={t.heading} lead={t.lead} />
      <p className="not-for-intro t-h-sm caps reveal">{t.intro}</p>
      <ul className="stack grid-2">
        {t.items.map((item) => (
          <li key={item.title} className="box excl reveal">
            <details>
              <summary>
                <Icon name="cancel" />
                <h3 className="t-h-sm caps">{item.title}</h3>
                <span aria-hidden="true" className="excl-plus">
                  +
                </span>
              </summary>
              <div className="excl-body">
                {item.body.map((paragraph) => (
                  <p key={paragraph} className="t-body-sm">
                    {paragraph}
                  </p>
                ))}
              </div>
            </details>
          </li>
        ))}
      </ul>
      <p className="not-for-close t-body reveal">{t.closing}</p>
    </Section>
  )
}
