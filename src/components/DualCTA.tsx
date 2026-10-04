import { PrimaryCTA } from './PrimaryCTA'
// import { SecondaryCTA } from './SecondaryCTA'

// Primary always precedes secondary in DOM and visual order. Stacked on mobile as in the
// reference, side by side from 721px.
export function DualCTA({
  source,
  centered = false,
  id,
}: {
  source: string
  centered?: boolean
  id?: string
}) {
  return (
    <div id={id} className={`btns ${centered ? 'btns-center' : ''}`}>
      <PrimaryCTA source={source} />
      {/* <SecondaryCTA source={source} /> */}
    </div>
  )
}
