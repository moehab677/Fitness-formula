import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
// @ts-expect-error Tailwind's ESM config is JavaScript and asserted structurally below.
import config from '../../tailwind.config.js'

function luminance(rgb: number[]) {
  const values = rgb
    .map((value) => value / 255)
    .map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4))
  return 0.2126 * (values[0] ?? 0) + 0.7152 * (values[1] ?? 0) + 0.0722 * (values[2] ?? 0)
}
function contrast(foreground: number[], background: number[]) {
  const sorted = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
  const light = sorted[0] ?? 0
  const dark = sorted[1] ?? 0
  return (light + 0.05) / (dark + 0.05)
}
describe('design token contract (constitution v3.0.0)', () => {
  const css = readFileSync('src/styles/tokens.css', 'utf8')
  const palette = {
    bg: [11, 11, 9],
    'bg-2': [16, 16, 14],
    card: [22, 22, 19],
    'card-2': [29, 29, 25],
    accent: [195, 216, 108],
    'accent-2': [221, 238, 142],
    ink: [245, 244, 239],
    text: [221, 219, 212],
    muted: [169, 168, 159],
    dim: [142, 141, 131],
    'on-accent': [17, 17, 15],
    warn: [255, 138, 122],
  }
  it('declares the required RGB channel values', () => {
    for (const [name, value] of Object.entries(palette))
      expect(css).toContain(`--color-${name}: ${value.join(' ')};`)
  })
  it('keeps WCAG AA contrast for every text pairing on every dark surface', () => {
    const surfaces = [palette.bg, palette['bg-2'], palette.card, palette['card-2']]
    for (const surface of surfaces) {
      for (const fg of [palette.ink, palette.text, palette.muted, palette.dim, palette.accent])
        expect(contrast(fg, surface)).toBeGreaterThanOrEqual(4.5)
      expect(contrast(palette.warn, surface)).toBeGreaterThanOrEqual(4.5)
    }
    expect(contrast(palette['on-accent'], palette.accent)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(palette['on-accent'], palette['accent-2'])).toBeGreaterThanOrEqual(4.5)
    expect(contrast(palette.dim, palette['card-2'])).toBeGreaterThanOrEqual(5.06)
  })
  it('exposes only the token scales', () => {
    expect(Object.keys(config.theme.colors).sort()).toEqual(
      ['transparent', 'current', 'line', 'line-2', ...Object.keys(palette)].sort(),
    )
    expect(config.theme.screens).toEqual({ md: '768px', lg: '1200px', '2xl': '1440px' })
    expect(config.theme.borderRadius).toEqual({
      none: '0',
      xs: '10px',
      sm: '14px',
      md: '20px',
      lg: '28px',
      xl: '36px',
      '2xl': '44px',
      full: '9999px',
    })
    expect(Object.keys(config.theme.boxShadow).sort()).toEqual(
      ['none', 'card', 'card-hover', 'glow', 'glow-hover', 'tile', 'pop'].sort(),
    )
    for (const value of Object.values(config.theme.boxShadow).filter((v) => v !== 'none'))
      expect(value).toMatch(/^var\(--shadow-/)
  })
})
