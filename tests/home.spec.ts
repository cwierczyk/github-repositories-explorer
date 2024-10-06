import { expect, test } from '@playwright/test';

test('should have correct title and loading', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('text=Loading...')).toBeVisible();
  await expect(page).toHaveTitle(/github repositories explorer/i);
});
