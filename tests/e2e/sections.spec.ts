import { expect, test } from '@playwright/test'

for (const lang of ['en', 'ar']) {
  test(`${lang} landing page has all sections and direction`, async ({ page }) => {
    await page.goto(`/${lang}/`)
    await expect(page.locator('html')).toHaveAttribute('lang', lang)
    await expect(page.locator('html')).toHaveAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
    for (const id of [
      'hero',
      'problem',
      'story',
      'approach',
      'process',
      'offer',
      'transformations',
      'testimonials',
      'not-for',
      'faq',
      'final-cta',
      'footer',
    ])
      await expect(page.locator(`#${id}`)).toBeVisible()
  })
}
