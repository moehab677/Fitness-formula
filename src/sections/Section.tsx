import type { ReactNode } from 'react'

// The whole page sits on one dark ground; `ground` is kept in the registry for
// documentation only.
export type Ground = 'bg'
export type SectionProps = { index: number; ground: Ground }

// Standard section: hairline-bottom band with the reference rhythm, content on the canvas.
export function Section({
  id,
  className = '',
  children,
}: {
  id: string
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`sec ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  )
}
