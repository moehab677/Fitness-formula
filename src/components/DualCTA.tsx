import { PrimaryCTA } from './PrimaryCTA'
import { SecondaryCTA } from './SecondaryCTA'

// Primary always precedes secondary in DOM and visual order (constitution III). The
// design's `.ctas` row: 16px gap, wraps on narrow screens.
export function DualCTA({ source, centered = false, id }: { source: string; centered?: boolean; id?: string }) {
  return (
    <div id={id} className={`flex flex-wrap gap-[16px] ${centered ? 'justify-center' : ''}`}>
      <PrimaryCTA source={source} />
      {/* <SecondaryCTA source={source} /> */}
    </div>
  )
}
