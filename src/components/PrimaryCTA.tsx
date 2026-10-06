import { WHATSAPP_BOOKING_URL } from '../lib/whatsapp'
import { useCopy } from '../i18n/useCopy'
import { Icon } from './Icon'

const bookingFormUrl = WHATSAPP_BOOKING_URL

// Primary CTA: the reference's solid accent button with a trailing arrow. `compact` is the
// small header version (desktop only); `menu` sits at the end of the mobile menu.
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
  return (
    <a
      href={bookingFormUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-source={source}
      className={`btn btn-p ${compact ? 'btn-sm' : ''} ${className}`}
    >
      <span>{copy.cta.primary}</span>
      <Icon name="arrow" />
    </a>
  )
}
