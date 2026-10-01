import { describe, expect, it } from 'vitest'
import { formatNumber } from '../../src/i18n/format'

describe('number formatting', () => {
  it('uses Western digits in Arabic', () => {
    expect(formatNumber(2000, 'ar')).toBe('2,000')
    expect(formatNumber(2000, 'ar')).not.toMatch(/[\u0660-\u0669]/)
  })
})
