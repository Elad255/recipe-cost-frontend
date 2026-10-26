import { test, expect } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test('pagination moves to the next page', async ({ page }) => {
  // 1. go to the ingredients page
  // 2. assert "Page 1 of 10" is visible          ← getByText(...)  (check your real page for exact text!)
  // 3. click the "Next" button                    ← getByRole('button', { name: 'Next →' }) or getByText — check it
    // 4. assert "Page 2 of 10" is visible           ← getByText(...)
    await page.goto('http://localhost:5173/ingredients');
    await expect(page.getByText(/Page 1 of \d+/)).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText(/Page 2 of \d+/)).toBeVisible();
});