import { useCopy } from '../i18n/useCopy'
import { Icon } from './Icon'

// Keyword ticker from the design. Decorative, so hidden from assistive technology; it runs
// longer than 5 s, so a visible pause control is provided (constitution v3.0.0, Motion).
// Reduced motion stops it entirely (globals.css).
export function Ticker() {
  const copy = useCopy()
  const words = copy.ticker.items
  const run = (
    <span className="ticker-copy flex items-center gap-[56px] whitespace-nowrap text-ink">
      {words.map((word) => (
        <span key={word} className="flex items-center gap-[56px]">
          {word}
          <Icon name="spark" className="ticker-icon text-accent" />
        </span>
      ))}
    </span>
  )
  return (
    <div className="ticker relative mt-[112px]">
      <div aria-hidden="true" className="ticker-track">
        {run}
        {run}
      </div>
    </div>
  )
}
