import { test, expect } from '@playwright/test';

test('save login state', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByPlaceholder('Email').fill('playwright@test.com')
    await page.getByPlaceholder('Password').fill('Test1234');
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible({ timeout: 15000 });
  
  // the one new line — save the logged-in state to a file:
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});