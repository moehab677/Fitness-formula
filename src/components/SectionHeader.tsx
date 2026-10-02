import type { ReactNode } from 'react'

// h2 (second part in the accent colour, on its own line as in the reference) + optional lead.
export function SectionHeader({
  id,
  heading,
  accent,
  lead,
  className = '',
}: {
  id: string
  heading: string
  accent?: string
  lead?: ReactNode
  className?: string
}) {
  return (
    <header className={`sec-head reveal ${className}`}>
      <h2 id={`${id}-heading`} className="t-h2 caps">
        {heading}
        {accent && (
          <>
            {' '}
            <br />
            <span className="acc">{accent}</span>
          </>
        )}
      </h2>
      {lead && <p className="t-body">{lead}</p>}
    </header>
  )
}
