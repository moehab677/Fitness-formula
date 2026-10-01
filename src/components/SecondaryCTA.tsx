import { useCopy } from '../i18n/useCopy'
import { Icon } from './Icon'

// Secondary CTA: the design's ghost pill (.btn-g); `prominent` is the accent pill used for
// "BOOK A SESSION" and `dark` the ink pill used on accent surfaces.
export function SecondaryCTA({
  source,
  variant = 'subordinate',
  label,
  className = '',
}: {
  source: string
  variant?: 'subordinate' | 'prominent' | 'dark'
  label?: string
  className?: string
}) {
  const copy = useCopy()
  const look = { subordinate: 'btn-g', prominent: 'btn-p', dark: 'btn-dark' }[variant]
  const action = source === 'process' ? 'Schedule initial call' : copy.cta.secondary
  return (
    <a
      data-source={source}
      href={source === 'offer' ? 'https://tally.so/r/VL2v1g' : 'https://tally.so/r/VL2v1g'}
      className={`btn ${look} text-label-lg label-caps ${className}`}
    >
      {label ? <span>{label}</span> : <span>{action}</span>}
      <Icon name={variant === 'subordinate' ? 'calendar' : 'arrow'} />
    </a>
  )
}
