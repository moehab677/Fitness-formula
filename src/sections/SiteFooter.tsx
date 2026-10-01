import { useCopy } from '../i18n/useCopy'
import { Icon } from '../components/Icon'

export function SiteFooter() {
  const copy = useCopy()
  return (
    <footer id="footer" className="footer-band">
      <div className="container-canvas">
        <div className="foot">
          <div>
            <a
              href="#hero"
              className="brand-wordmark mb-[14px] flex items-center gap-[12px] text-ink"
            >
              <span className="brand-mark text-headline-sm text-on-accent" aria-hidden="true">
                <Icon name="dumbbell" />
              </span>
              <span>{copy.nav.wordmark}</span>
            </a>
            <p className="mt-[14px] max-w-[420px] text-[15px] leading-[1.65] text-muted">
              © 2026 The Fitness Formula.
            </p>
          </div>
          <div className="flex flex-col items-end gap-[22px]">
            <div className="social">
              <a href="https://wa.me/" aria-label="WhatsApp">
                <Icon name="whatsapp" />
              </a>
            </div>
            {/* <nav aria-label="Footer" className="flinks">
                <a href="#approach">Approach</a>
                <a href="#offer">Pricing</a>
                <a href="#transformations">Transformations</a>
                <a href="https://wa.me/">WhatsApp concierge</a>
              </nav> */}
          </div>
        </div>
        <div className="legal w-full flex justify-center">
          <span>
            Developed By{' '}
            <span className=" gematic hover:text-ink-hover">
              <a href="https://www.instagram.com/gematic.dev/" className="gematic">
                Gematic
              </a>
            </span>
          </span>
        </div>
      </div>
    </footer>
  )
}
