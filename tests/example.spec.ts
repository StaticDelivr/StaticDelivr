import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/StaticDelivr/);
});

test('homepage has get started link', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Dismiss any Next.js error overlay by pressing Escape
  await page.keyboard.press('Escape');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get Started' }).first().click();

  // Expects the URL to contain getting-started.
  await expect(page).toHaveURL(/.*getting-started/);
});