import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/login');
});

test('user can log in', async ({ page }) => {
  await page.getByPlaceholder('Email').fill('playwright@test.com');
  await page.getByPlaceholder('Password').fill('Test1234');
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});