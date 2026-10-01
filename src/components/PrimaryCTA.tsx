import { useCopy } from '../i18n/useCopy'
import { Icon } from './Icon'

// Primary CTA: the design's accent pill (.btn-p). Full size shows the approved two-line
// label ("Get started" over "Tell me about your goals"); `compact` is the header version.
export function PrimaryCTA({
  source,
  className = '',
  compact = false,
}: {
  source: string
  className?: string
  compact?: boolean
}) {
  const copy = useCopy()
  const label =
    {
      hero: copy.cta.primary,
      process: copy.cta.primary,
      'final-cta': copy.cta.primary ,
      header:  'Get started',
      menu: copy.cta.primaryEyebrow,
    }[source] ?? copy.cta.primary
  return (
    <a
      href={source === 'hero' ? 'https://tally.so/r/VL2v1g' : 'https://tally.so/r/VL2v1g'}
      data-source={source}
      className={`btn btn-p label-caps ${compact ? 'btn-sm text-label-md' : 'text-label-lg'} ${className}`}
    >
      {compact ? (
        // Below 768px the header CTA is icon-only, as in the design; the label stays for AT.
        <span className="sr-only md:not-sr-only md:whitespace-nowrap">{copy.cta.primary}</span>
      ) : (
        <span>{label}</span>
      )}
      <Icon name="arrow" />
    </a>
  )
}
