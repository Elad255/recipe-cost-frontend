import { test, expect } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test('sorting by name orders ingredients correctly', async ({ page }) => {
  const tag = `${Date.now()}`;
  const nameFirst = `AAA ${tag}`;   // should sort to the top ascending
  const nameLast = `ZZZ ${tag}`;    // should sort to the bottom ascending

  page.on('dialog', dialog => dialog.accept());

  // --- CREATE INGREDIENT "ZZZ ..." (from memory) ---
  // goto /ingredients → + Add Ingredient → Name(exact)=nameLast, Category, Unit, Price → Save → wait form closes
    await page.goto('http://localhost:5173/ingredients');
    await page.getByRole('button', { name: 'Add Ingredient' }).click();
    await page.getByPlaceholder('Name', { exact: true }).fill(nameLast);
    await page.getByPlaceholder('Category').fill('Baking');
    await page.getByPlaceholder('Unit (kg, l, pcs)').fill('kg');
    await page.getByPlaceholder('Price per unit').fill('10');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('button', { name: 'Save' })).not.toBeVisible();
    
  // --- CREATE INGREDIENT "AAA ..." (from memory) ---
  // + Add Ingredient → Name(exact)=nameFirst, Category, Unit, Price → Save → wait form closes
    await page.getByRole('button', { name: 'Add Ingredient' }).click();
    await page.getByPlaceholder('Name', { exact: true }).fill(nameFirst);
    await page.getByPlaceholder('Category').fill('Baking');
    await page.getByPlaceholder('Unit (kg, l, pcs)').fill('kg');
    await page.getByPlaceholder('Price per unit').fill('10');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('button', { name: 'Save' })).not.toBeVisible();
    
  // --- SEARCH TO ISOLATE OUR TWO, THEN SORT, THEN CHECK ORDER ---
  // 1. search for the tag so only our two show
    await page.getByPlaceholder('Search by name...').fill(tag);

  // 2. sort by name, ascending
  //    (there are two sort dropdowns — "Sort by name/price" and "Ascending/Descending")
  //    select 'Sort by name' and 'Ascending' — I'll guide the locators below
    await page.getByRole('combobox').filter({ hasText: 'Sort by name' }).selectOption({ label: 'Sort by name' });
    await page.getByRole('combobox').filter({ hasText: 'Ascending' }).selectOption({ label: 'Ascending' });
  // 3. assert the FIRST ingredient shown is the AAA one
    await expect(page.locator('h3').first()).toHaveText(nameFirst);
});