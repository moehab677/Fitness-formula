const env = import.meta.env
export const site = {
  siteUrl: env.VITE_SITE_URL || 'http://localhost:4173',
  bookingUrl: env.VITE_BOOKING_URL || '#offer',
  web3formsKey: env.VITE_WEB3FORMS_KEY || '',
  whatsappNumber: env.VITE_WHATSAPP_E164 || '',
  defaultLang: 'en' as const,
}

export function assertSiteConfig() {
  const production = env.SITE_ENV === 'production'
  const validUrl = (value: string) => {
    try {
      const parsed = new URL(value)
      return (
        parsed.protocol === 'https:' ||
        (!production && parsed.hostname === 'localhost' && parsed.protocol === 'http:')
      )
    } catch {
      return false
    }
  }
  if (!validUrl(site.siteUrl) || !validUrl(site.bookingUrl))
    throw new Error('Site and booking URLs must be valid absolute URLs.')
  if (site.web3formsKey && !/^[0-9a-f-]{36}$/i.test(site.web3formsKey))
    throw new Error('Web3Forms key must be a UUID.')
  if (site.whatsappNumber && !/^\+[1-9]\d{7,14}$/.test(site.whatsappNumber))
    throw new Error('WhatsApp number must be E.164.')
}
