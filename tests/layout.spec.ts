import { expect, test } from '@playwright/test';

test('should toggle theme switch on click', async ({ page }) => {
  await page.goto('/');

  const switchLabel = page.getByTestId('theme-switch-label');
  const switchInput = switchLabel.locator('input[role="switch"]');

  await expect(switchLabel).toBeVisible();
  await expect(switchInput).not.toBeChecked();

  await switchLabel.click();
  await expect(switchInput).toBeChecked();

  await switchLabel.click();
  await expect(switchInput).not.toBeChecked();
});

test('should open language menu on click and allow change language', async ({
  page,
}) => {
  await page.goto('/');

  const languageButton = page.getByTestId('language-menu-trigger');
  const languageMenu = page.locator('ul[role="menu"]');

  await expect(languageButton).toBeVisible();
  await expect(languageButton).toContainText('English');
  await expect(languageMenu).not.toBeVisible();

  await languageButton.click();
  await expect(languageMenu).toBeVisible();

  const menuItems = languageMenu.locator('li');

  await expect(menuItems).toHaveCount(2);
  await expect(menuItems.first()).toContainText('Polish');
  await expect(menuItems.last()).toContainText('German');

  await menuItems.first().click();
  await expect(languageMenu).not.toBeVisible();
  await expect(languageButton).toContainText('Polski');
  await expect(languageButton).toBeFocused();

  await languageButton.click();
  await expect(menuItems.first()).toContainText('Angielski');
  await expect(menuItems.last()).toContainText('Niemiecki');

  await menuItems.last().click();
  await expect(languageMenu).not.toBeVisible();
  await expect(languageButton).toContainText('Deutsch');
});
