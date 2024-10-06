import { expect, type Page, test } from '@playwright/test';

test('should render search input and disabled button', async ({ page }) => {
  await page.goto('/');

  const searchInput = page.getByPlaceholder('Enter username');
  const searchButton = page.getByRole('button', { name: /search/i });

  await expect(searchInput).toBeVisible();
  await expect(searchInput).toBeEnabled();
  await expect(searchButton).toBeVisible();
  await expect(searchButton).toBeDisabled();
});

test('should enable button when search have some value', async ({ page }) => {
  await page.goto('/');

  const searchInput = page.getByPlaceholder('Enter username');
  const searchButton = page.getByRole('button', { name: /search/i });

  await searchInput.fill('test');

  await expect(searchButton).toBeEnabled();
});

test('should disabled input and button when search is in progress', async ({
  page,
}) => {
  await page.goto('/');

  await searchUser(page, 'test');

  await expect(page.getByRole('button', { name: 'Loading...' })).toBeDisabled();
  await expect(
    page.locator('span').filter({ hasText: 'Loading...' }),
  ).toBeVisible();
});

test('should display message when users not found', async ({ page }) => {
  await page.goto('/');

  await searchUser(page, 'testdawdwadwadaw');

  await expect(
    page.locator(`p:has-text("No users found for 'testdawdwadwadaw'")`),
  ).toBeVisible();
});

test('should load 5 users after search', async ({ page }) => {
  await page.goto('/');

  await searchUser(page, 'test');

  await expect(
    page.locator(`p:has-text("Showing users for 'test'")`),
  ).toBeVisible();

  await expect(page.getByTestId('accordion-container')).toHaveCount(5);
});

test('should not fetch same search twice', async ({ page }) => {
  await page.goto('/');

  await searchUser(page, 'test');

  await expect(
    page.locator('span').filter({ hasText: 'Loading...' }),
  ).toBeVisible();

  await searchUser(page, 'test');

  await expect(
    page.locator('span').filter({ hasText: 'Loading...' }),
  ).not.toBeVisible();
});

test('should load user repositories on expand', async ({ page }) => {
  await page.goto('/');

  await searchUser(page, 'test');

  const accordionContainer = page.getByTestId('accordion-container');

  await accordionContainer.first().getByRole('button').click();

  await expect(
    accordionContainer.first().locator('text=Loading...'),
  ).toBeVisible();
  await expect(
    accordionContainer.locator('button[aria-expanded="false"]'),
  ).toHaveCount(4);

  await expect(
    accordionContainer.first().getByTestId('repository-container').first(),
  ).toBeVisible();
  await expect(
    accordionContainer.first().getByTestId('repository-container').last(),
  ).toBeVisible();

  await accordionContainer.last().getByRole('button').click();

  await expect(
    accordionContainer.last().locator('text=Loading...'),
  ).toBeVisible();

  await expect(
    accordionContainer.last().getByTestId('repository-container').first(),
  ).toBeVisible();
  await expect(
    accordionContainer.last().getByTestId('repository-container').last(),
  ).toBeVisible();

  await accordionContainer.first().getByRole('button').click();

  await expect(
    accordionContainer.first().locator('text=Loading...'),
  ).not.toBeVisible();
});

test('should load next page when scrolled to the last and there is more repositories', async ({
  page,
}) => {
  await page.goto('/');

  await searchUser(page, 'test');

  const accordionContainer = page.getByTestId('accordion-container');

  await accordionContainer.nth(1).getByRole('button').click();

  await expect(accordionContainer.locator('text=Loading...')).toBeVisible();

  const repository = accordionContainer.getByTestId('repository-container');

  await expect(repository).toHaveCount(20);

  await repository.last().scrollIntoViewIfNeeded();

  await expect(accordionContainer.locator('text=Loading...')).toBeVisible();
  await expect(repository).toHaveCount(40);
});

test('should display error message when api request fails', async ({
  page,
}) => {
  await page.goto('/');

  await page.route('**/search/users**', async (route) =>
    route.fulfill({
      status: 500,
      body: JSON.stringify({
        message: 'Internal server error',
        status: 500,
      }),
    }),
  );

  await searchUser(page, 'test');

  await expect(
    page
      .locator('span')
      .filter({ hasText: 'Error 500: Internal server error' }),
  ).toBeVisible();
});

async function searchUser(page: Page, username: string) {
  const searchInput = page.getByPlaceholder('Enter username');
  const searchButton = page.getByRole('button', { name: /search/i });

  await searchInput.fill(username);
  await searchButton.click();
}
