import { test, expect } from '@playwright/test';

test('login page shows its key elements', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await expect(page.getByPlaceholder('Email')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Need an account? Sign up' })).toBeVisible();
});