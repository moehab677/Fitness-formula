import { useLocale } from '../i18n/LocaleContext'
import { useCopy } from '../i18n/useCopy'
import { Icon } from './Icon'

const bookingFormUrl = 'https://tally.so/r/VL2v1g'

// Secondary CTA: the reference's outlined button with a calendar icon, always placed after
// the primary one.
export function SecondaryCTA({
  source,
  label,
  className = '',
}: {
  source: string
  label?: string
  className?: string
}) {
  const copy = useCopy()
  const lang = useLocale()
  const action =
    source === 'process' && lang === 'en' ? 'Schedule initial call' : copy.cta.secondary
  return (
    <a data-source={source} href={bookingFormUrl} className={`btn btn-g ${className}`}>
      <span>{label ?? action}</span>
      <Icon name="calendar" />
    </a>
  )
}
