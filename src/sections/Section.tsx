import type { ReactNode } from 'react'

// Constitution v3.0.0: the whole page sits on one dark ground; `ground` is kept in the
// registry for documentation only.
export type Ground = 'bg'
export type SectionProps = { index: number; ground: Ground }

// Standard section: 128px rhythm (88px on mobile) above, content on the 1320px canvas.
export function Section({
  id,
  className = '',
  children,
}: {
  id: string
  ground?: Ground
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="section">
      <div className={`container-canvas ${className}`}>{children}</div>
    </section>
  )
}
