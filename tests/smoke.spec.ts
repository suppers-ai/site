import { expect, test } from '@playwright/test';

test('page has correct title and description', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Suppers Software/);
  const desc = await page.locator('meta[name="description"]').getAttribute('content');
  expect(desc).toContain('Suppers Software');
});

test('hero shows headline and socials', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Software that scales');
  await expect(page.getByRole('link', { name: 'GitHub' }).first()).toHaveAttribute('href', 'https://github.com/suppers-ai');
  await expect(page.getByRole('link', { name: 'X' }).first()).toHaveAttribute('href', 'https://x.com/suppers_ai');
  await expect(page.getByRole('link', { name: 'LinkedIn' }).first()).toHaveAttribute('href', 'https://www.linkedin.com/in/joris-suppers');
});

test('about links to Campertunity', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Campertunity', exact: true })).toHaveAttribute('href', 'https://campertunity.com');
});

test('projects section shows Campertunity card', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Campertunity' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Visit campertunity\.com/ })).toHaveAttribute('href', 'https://campertunity.com');
});

test('open-source section shows both project cards', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'wafer.run' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'solobase' })).toBeVisible();
  await expect(page.getByRole('link', { name: /View on GitHub/ })).toHaveCount(2);
});

test('contact section has LinkedIn CTA', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: "Let's talk." })).toBeVisible();
  await expect(page.getByRole('link', { name: /Message me on LinkedIn/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/joris-suppers');
});

test('takes full-page screenshot (desktop + mobile)', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await testInfo.attach('full-page', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});
