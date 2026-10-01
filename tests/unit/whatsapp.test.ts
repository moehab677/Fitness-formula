import { describe, expect, it } from 'vitest'
import { normalizeWhatsapp } from '../../src/lib/whatsapp'

describe('WhatsApp number normalization', () => {
  it.each([
    ['01012345678', '+201012345678'],
    ['+44 7700 900123', '+447700900123'],
    ['123', null],
  ])('%s normalizes to %s', (raw, expected) => {
    expect(normalizeWhatsapp(raw)).toBe(expected)
  })
})
