import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'tests',
  testMatch: ['e2e/**/*.spec.ts', 'a11y/**/*.spec.ts', 'visual/**/*.spec.ts'],
  webServer: { command: 'npm run preview', port: 4173, reuseExistingServer: !process.env.CI },
  use: { baseURL: 'http://localhost:4173', launchOptions: { channel: 'chromium' } },
  projects: [
    {
      name: 'mobile-390',
      use: {
        ...devices['iPhone 13'],
        browserName: 'chromium',
        viewport: { width: 390, height: 844 },
      },
    },
    {
      name: 'tablet-768',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: 'desktop-1440',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
})
