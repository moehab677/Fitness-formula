import { useState } from 'react'
import { useLocale } from '../i18n/LocaleContext'
import faqs from '../data/faqs.json'

const publishedFaqs = faqs.items.filter((item) => item.published).sort((a, b) => a.order - b.order)

// Answers are plain text: blank lines separate paragraphs, and a block whose lines all start
// with "- " renders as a bulleted list (no markup in content, per the content rules).
function Answer({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((block) => {
        const lines = block.split('\n')
        if (lines.every((line) => line.startsWith('- ')))
          return (
            <ul key={block} className="flex list-disc flex-col gap-xs ps-lg">
              {lines.map((line) => (
                <li key={line}>{line.slice(2)}</li>
              ))}
            </ul>
          )
        return <p key={block}>{block}</p>
      })}
    </>
  )
}

// Accessible accordion in the reference style: hairline-divided rows, uppercase question
// and an accent "+" that turns 45° into "×" when open.
export function FaqAccordion() {
  const lang = useLocale()
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div className="faq">
      {publishedFaqs.map((item) => {
        const expanded = open === item.id
        return (
          <div key={item.id} data-faq-item={item.id} className="faq-item">
            <h3>
              <button
                id={`faq-q-${item.id}`}
                type="button"
                aria-expanded={expanded}
                aria-controls={`faq-a-${item.id}`}
                onClick={() => setOpen(expanded ? null : item.id)}
                className="faq-q t-h-sm caps"
              >
                {item.question[lang]}
                <span aria-hidden="true" className="faq-plus">
                  +
                </span>
              </button>
            </h3>
            <div
              id={`faq-a-${item.id}`}
              role="region"
              aria-labelledby={`faq-q-${item.id}`}
              data-faq-panel=""
              aria-hidden={!expanded}
              className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out"
              style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="faq-a t-body-sm">
                  <Answer text={item.answer[lang]} />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
