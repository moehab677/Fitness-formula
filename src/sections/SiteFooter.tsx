import { WHATSAPP_BOOKING_URL } from '../lib/whatsapp'
import { useCopy } from '../i18n/useCopy'
import { Icon } from '../components/Icon'
import { LanguageSwitcher } from '../components/LanguageSwitcher'

const bookingFormUrl = WHATSAPP_BOOKING_URL

// Footer (reference): wordmark + language, WhatsApp concierge row, two-column directory and
// the editorial copyright line.
export function SiteFooter() {
  const copy = useCopy()
  const links: [string, string][] = [
    ['#story', copy.nav.story],
    ['#approach', copy.nav.approach],
    ['#transformations', copy.nav.transformations],
    ['#process', copy.nav.process],
    ['#offer', copy.nav.offer],
    [bookingFormUrl, copy.footer.bookingLabel],
  ]
  return (
    <footer id="footer" className="footer">
      <div className="wrap">
        <div className="footer-top">
          <a href="#hero" className="brand">
            <span className="brand-dot" aria-hidden="true" />
            <span>{copy.nav.wordmark}</span>
          </a>
          <LanguageSwitcher variant="segmented" />
        </div>
        <div className="footer-mid">
          <a className="concierge" href={bookingFormUrl} target="_blank" rel="noopener noreferrer">
            <span>
              <span className="ico" aria-hidden="true">
                <Icon name="whatsapp" />
              </span>
              <span className="t-label-sm caps">{copy.footer.whatsappLabel}</span>
            </span>
            <Icon name="north-east" />
          </a>
          <nav aria-label={copy.footer.copyright} className="footer-links t-label-sm caps">
            {links.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-legal">
          <p>
            © 2026 {copy.footer.copyright}. {copy.footer.tagline}
          </p>
          <p>
            Developed by{' '}
            <a
              href="https://www.instagram.com/gematic.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gematic
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
