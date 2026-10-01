import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

for (const lang of ['en', 'ar']) {
  test(`${lang} page has no serious accessibility violations`, async ({ page }) => {
    await page.goto(`/${lang}/`)
    await page.keyboard.press('Tab')
    await expect(page.locator('a[href="#main"]')).toBeFocused()
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze()
    expect(
      results.violations.filter((issue) => ['critical', 'serious'].includes(issue.impact ?? '')),
    ).toEqual([])
  })
}
