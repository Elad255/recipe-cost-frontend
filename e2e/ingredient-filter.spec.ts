import { test, expect } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test('filtering by category narrows the list', async ({ page }) => {
  const tag = `${Date.now()}`;
  const bakingItem = `Baking ${tag}`;
  const meatItem = `Meat ${tag}`;

  page.on('dialog', dialog => dialog.accept());

  // --- CREATE a Baking ingredient (from memory) ---
  //   Name(exact)=bakingItem, Category='Baking', Unit='kg', Price='10' → Save → wait closes
    await page.goto('http://localhost:5173/ingredients');
    await page.getByRole('button', { name: 'Add Ingredient' }).click();
    await page.getByPlaceholder('Name', { exact: true }).fill(bakingItem);
    await page.getByPlaceholder('Category').fill('Baking');
    await page.getByPlaceholder('Unit (kg, l, pcs)').fill('kg');
    await page.getByPlaceholder('Price per unit').fill('10');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('button', { name: 'Save' })).not.toBeVisible();
  // --- CREATE a Meat ingredient (from memory) ---
  //   Name(exact)=meatItem, Category='Meat', Unit='kg', Price='10' → Save → wait closes
    await page.getByRole('button', { name: 'Add Ingredient' }).click();
    await page.getByPlaceholder('Name', { exact: true }).fill(meatItem);
    await page.getByPlaceholder('Category').fill('Meat');
    await page.getByPlaceholder('Unit (kg, l, pcs)').fill('kg');
    await page.getByPlaceholder('Price per unit').fill('10');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('button', { name: 'Save' })).not.toBeVisible();   
  // --- SEARCH BY TAG, THEN FILTER TO BAKING ---
    await page.getByPlaceholder('Search by name...').fill(tag);
  // select 'Baking' in the category dropdown  ← selectOption, scoped with .filter({ hasText: 'All categories' })
    await page.getByRole('combobox').filter({ hasText: 'Baking' }).selectOption({ label: 'Baking' });
  // --- ASSERT: baking item shows, meat item does NOT ---
    await expect(page.getByText(bakingItem)).toBeVisible();
    await expect(page.getByText(meatItem)).not.toBeVisible();
});