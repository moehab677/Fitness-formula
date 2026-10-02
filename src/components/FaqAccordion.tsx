import { useState } from 'react'
import { useLocale } from '../i18n/LocaleContext'
import faqs from '../data/faqs.json'
import { Icon } from './Icon'

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

// Accessible accordion (US6) in the approved design's FAQ style: one rounded card per
// question, accent "+" tile that turns into "×". Answers are pre-rendered open so they are
// readable without scripts; the `.js` rule in globals.css collapses them before first paint.
export function FaqAccordion() {
  const lang = useLocale()
  const [open, setOpen] = useState<string | null>(publishedFaqs[0]?.id ?? null)
  return (
    <div className="flex max-w-content  flex-col gap-[16px]">
      {publishedFaqs.map((item) => {
        const expanded = open === item.id
        return (
          <div
            key={item.id}
            data-faq-item={item.id}
            data-open={expanded ? '' : undefined}
            className="faq-item reveal"
          >
            <h3>
              <button
                id={`faq-q-${item.id}`}
                type="button"
                aria-expanded={expanded}
                aria-controls={`faq-a-${item.id}`}
                onClick={() => setOpen(expanded ? null : item.id)}
                className="heading flex min-h-target w-full items-center justify-between gap-[24px] px-[14px] py-[14px] text-start text-headline-sm max-md:text-[18px] label-caps transition-colors duration-hover hover:text-accent md:px-[32px]"
              >
                {item.question[lang]}
                <span aria-hidden="true" className="faq-plus ">
                  <Icon name="plus" />
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
                <div className="flex flex-col gap-[12px] px-[24px] pb-[28px] text-body-md text-muted md:pe-24 md:ps-8">
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
