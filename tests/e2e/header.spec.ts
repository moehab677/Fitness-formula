import { expect, test } from '@playwright/test'

test('mobile header menu and scroll behavior remain accessible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/en/')
  await page.locator('html[data-hydrated]').waitFor({ state: 'attached' })
  const header = page.locator('header.site-header')
  const menu = page.getByRole('button', { name: 'Open menu' })
  await expect(page.locator('header .lang')).toBeVisible()
  await expect(page.locator('header [data-source="header"]')).toBeHidden()
  await expect(menu).toBeVisible()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await menu.click()
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
    'aria-expanded',
    'true',
  )
  await expect(page.locator('header .lang')).toBeVisible()
  await expect(page.locator('header [data-source="menu"]')).toBeVisible()
  await page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('link', { name: 'Approach' })
    .click()
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  )
  await expect(page.locator('#site-menu')).toHaveCount(0)

  // The anchor jump above leaves the page far down; start from the top so the next scroll
  // is genuinely downward.
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await expect(header).not.toHaveAttribute('data-hidden', 'true')
  await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }))
  await expect(header).toHaveAttribute('data-hidden', 'true')
  await page.evaluate(() => window.scrollTo({ top: 280, behavior: 'instant' }))
  await expect(header).not.toHaveAttribute('data-hidden', 'true')
})
