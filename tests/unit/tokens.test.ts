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
// Reference design palette (code 4.html, approved 2026-10-02).
const palette = {
  bg: [17, 17, 15],
  card: [22, 22, 20],
  elevated: [28, 28, 25],
  hairline: [38, 38, 34],
  'hairline-2': [46, 46, 42],
  accent: [183, 201, 107],
  'accent-hover': [198, 215, 126],
  ink: [245, 243, 238],
  muted: [158, 156, 148],
  dim: [119, 117, 111],
  'on-accent': [17, 17, 15],
  danger: [186, 26, 26],
}

describe('design token contract (reference design)', () => {
  const css = readFileSync('src/styles/tokens.css', 'utf8')
  it('declares the reference RGB channel values', () => {
    for (const [name, value] of Object.entries(palette))
      expect(css).toContain(`--color-${name}: ${value.join(' ')};`)
  })
  it('keeps WCAG AA contrast for body text on every dark surface', () => {
    for (const surface of [palette.bg, palette.card, palette.elevated])
      for (const fg of [palette.ink, palette.muted, palette.accent])
        expect(contrast(fg, surface)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(palette['on-accent'], palette.accent)).toBeGreaterThanOrEqual(4.5)
  })
  it('exposes only the token colours', () => {
    expect(Object.keys(config.theme.colors).sort()).toEqual(
      ['transparent', 'current', ...Object.keys(palette)].sort(),
    )
    expect(config.theme.screens).toEqual({ md: '721px', lg: '1100px', '2xl': '1440px' })
  })
})
