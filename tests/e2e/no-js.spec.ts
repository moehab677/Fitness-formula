import { expect, test } from '@playwright/test'

test.use({ javaScriptEnabled: false })

test('lead form remains a native post with scripts disabled', async ({ page }) => {
  await page.goto('/en/')
  const form = page.locator('#lead-form form')
  await expect(form).toHaveAttribute('method', 'POST')
  await expect(form).toHaveAttribute('action', 'https://api.web3forms.com/submit')
  await expect(form.locator('[name="redirect"]')).toHaveValue(/\/en\/thanks\//)
  await expect(form.locator('[name="name"]')).toHaveAttribute('required', '')
  await expect(form.locator('[name="whatsapp"]')).toHaveAttribute('pattern')
})
