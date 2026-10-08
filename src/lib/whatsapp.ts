export const WHATSAPP_HTML_PATTERN = '^\\+?[0-9 \\-]{8,20}$'
export function normalizeWhatsapp(raw: string): string | null {
  const value = raw.replace(/[\s-]/g, '')
  const egyptian = value.match(/^0?1[0125]\d{8}$/)
  if (egyptian) return `+20${value.startsWith('0') ? value.slice(1) : value}`
  if (/^\+?[1-9]\d{7,14}$/.test(value)) return `+${value.replace(/^\+/, '')}`
  return null
}

// Every booking CTA opens a WhatsApp chat with the coach (01144146409).
export const WHATSAPP_BOOKING_URL = 'https://wa.me/201112748970'
