import { test, expect } from '@playwright/test';

// load the saved login — every test in this file starts already authenticated:
test.use({ storageState: 'playwright/.auth/user.json' });

test('dashboard loads when already logged in', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
  
});