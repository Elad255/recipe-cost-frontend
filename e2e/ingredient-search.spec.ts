import { test, expect } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test('search narrows the ingredient list', async ({ page }) => {
  const nameA = `Apple ${Date.now()}`;
  const nameB = `Banana ${Date.now()}`;

  page.on('dialog', dialog => dialog.accept());

      // --- CREATE INGREDIENT A ---
    await page.goto('http://localhost:5173/ingredients');
    await page.getByRole('button', { name: '+ Add Ingredient' }).click();
    await page.getByPlaceholder('Name', { exact: true }).fill(nameA);
    await page.getByPlaceholder('Category').fill('Baking');
    await page.getByPlaceholder('Unit (kg, l, pcs)').fill('kg');
    await page.getByPlaceholder('Price per unit').fill('10');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('button', { name: 'Save' })).not.toBeVisible();

  // --- CREATE INGREDIENT B ---
    await page.getByRole('button', { name: '+ Add Ingredient' }).click();
    await page.getByPlaceholder('Name', { exact: true }).fill(nameB);
    await page.getByPlaceholder('Category').fill('Baking');
    await page.getByPlaceholder('Unit (kg, l, pcs)').fill('kg');
    await page.getByPlaceholder('Price per unit').fill('10');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('button', { name: 'Save' })).not.toBeVisible();
  // --- SEARCH FOR A, PROVE B DISAPPEARS ---
  // 1. fill the "Search by name..." box with nameA
  // 2. assert nameA IS visible
    // 3. assert nameB is NOT visible
    await page.getByPlaceholder('Search by name...').fill(nameA);
    await expect(page.getByText(nameA)).toBeVisible();
    await expect(page.getByText(nameB)).not.toBeVisible();

});