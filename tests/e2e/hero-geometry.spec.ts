import { expect, test } from '@playwright/test'

// Hero geometry against the approved design, expressed in the constitution's tokens
// (v3.0.0): display 56 / 0.92 on mobile, 112 on desktop; photo-md 420px; 4px spacing grid.
test('hero follows the mobile and desktop design with design tokens', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/en/')
  const photo = await page.locator('#hero [data-photo]').boundingBox()
  const copy = await page.locator('#hero [data-photo-copy]').boundingBox()
  const heading = page.locator('#hero h1')
  // Full-bleed photo at the top; copy overlaps the lower (solid) part of the fade by 40px.
  expect(photo?.x).toBe(0)
  expect(photo?.width).toBe(390)
  expect(photo?.height).toBe(420)
  expect(Math.round((photo?.y ?? 0) + (photo?.height ?? 0) - (copy?.y ?? 0))).toBe(40)
  expect(
    await heading.evaluate((el) => [
      getComputedStyle(el).fontSize,
      getComputedStyle(el).lineHeight,
    ]),
  ).toEqual(['56px', '51.52px'])
  // The fade exists below 1200px and covers the bottom half of the photo.
  expect(
    await page
      .locator('#hero [data-photo]')
      .evaluate((el) => getComputedStyle(el, '::after').backgroundImage),
  ).toContain('linear-gradient')

  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/en/')
  const panel = await page.locator('#hero [data-photo-panel]').boundingBox()
  const desktopCopy = await page.locator('#hero [data-photo-copy]').boundingBox()
  const desktopPhoto = await page.locator('#hero [data-photo]').boundingBox()
  // Canvas 1320px centred in the 1440px viewport (60px margin) plus the 64px pad.
  expect(panel?.x).toBe(124)
  expect(panel?.height).toBeGreaterThanOrEqual(700)
  // Text first (7 columns), photo last (5 columns), inline order in LTR.
  expect(desktopPhoto?.x).toBeGreaterThan((desktopCopy?.x ?? 0) + (desktopCopy?.width ?? 0))
  expect(await heading.evaluate((el) => getComputedStyle(el).fontSize)).toBe('112px')
  // No gradient at desktop widths.
  expect(
    await page
      .locator('#hero [data-photo]')
      .evaluate((el) => getComputedStyle(el, '::after').backgroundImage),
  ).toBe('none')
})

test('hero mirrors in Arabic at desktop width', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/ar/')
  const copy = await page.locator('#hero [data-photo-copy]').boundingBox()
  const photo = await page.locator('#hero [data-photo]').boundingBox()
  expect((photo?.x ?? 0) + (photo?.width ?? 0)).toBeLessThan(copy?.x ?? 0)
})
