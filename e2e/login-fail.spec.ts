import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/login');
});

test('login fails with wrong password', async ({ page }) => {
    await page.getByPlaceholder('Email').fill('playwright@test.com');
    await page.getByPlaceholder('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page.getByText('Login failed — check your email and password')).toBeVisible();
    await expect(page).toHaveURL('http://localhost:5173/login');
});