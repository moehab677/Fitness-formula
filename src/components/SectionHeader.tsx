import type { ReactNode } from 'react'
import { SectionLabel } from './SectionLabel'

// Eyebrow chip + h2 (+ optional lead), as in every section head of the design. `accent`
// renders the second part of the heading with the accent text gradient.
export function SectionHeader({
  index,
  label,
  heading,
  accent,
  lead,
  id,
  className = 'mb-[56px]',
  tag,
}: {
  index: number
  label: string
  heading: string
  accent?: string
  lead?: ReactNode
  id: string
  className?: string
  tag?: string
}) {
  return (
    <header className={className}>
      {/* <SectionLabel index={index} label={label} tag={tag} /> */}
      <div className="reveal max-w-head">
        <h2 id={`${id}-heading`} className="heading mb-[20px] text-[42px] font-bold leading-[0.98] tracking-[-0.015em] md:text-[56px] lg:text-[72px] label-caps">
          {heading}
          {accent && (
            <>
              {' '}
              <span className="acc">{accent}</span>
            </>
          )}
        </h2>
        {lead && <p className={`text-body-lg ${id === 'offer' ? '' : 'text-muted'}`}>{lead}</p>}
      </div>
    </header>
  )
}
