import type { Lang } from './LocaleContext'

export function formatNumber(value: number, lang: Lang) {
  return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-EG').format(value)
}
export function formatPrice(
  value: number,
  currency: string,
  lang: Lang,
  labels: Record<string, string>,
) {
  return `${formatNumber(value, lang)} ${labels[currency] ?? currency}`
}
