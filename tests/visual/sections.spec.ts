import { expect, test } from '@playwright/test'

const sectionIds = [
  'hero',
  'story',
  'approach',
  'process',
  'offer',
  'transformations',
  'results',
  'not-for',
  'faq',
  'final-cta',
  'footer',
]

for (const lang of ['en', 'ar']) {
  test(`${lang} section snapshots`, async ({ page }) => {
    await page.goto(`/${lang}/`)
    await page.evaluate(() => document.fonts.ready)
    await page.addStyleTag({ content: 'header { visibility: hidden !important; }' })
    for (const id of sectionIds) {
      const section = page.locator(`#${id}`)
      await expect(section).toHaveScreenshot(`${id}-${lang}.png`, {
        animations: 'disabled',
        caret: 'hide',
      })
    }
  })
}
