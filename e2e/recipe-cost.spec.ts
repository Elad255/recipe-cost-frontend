import { test, expect } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test('recipe shows correct auto-calculated cost', async ({ page }) => {
  const ingredientName = `TestFlour ${Date.now()}`;
  const recipeName = `CostTest ${Date.now()}`;

  page.on('dialog', dialog => dialog.accept());   // in case any confirm appears

  
  
    await page.goto('http://localhost:5173/ingredients');
    await page.getByRole('button', { name: '+ Add Ingredient' }).click();
    await page.getByPlaceholder('Name', { exact: true }).fill(ingredientName);
    await page.getByPlaceholder('Category').fill('Baking');
    await page.getByPlaceholder('Unit (kg, l, pcs)').fill('kg');
    await page.getByPlaceholder('Price per unit').fill('10');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('button', { name: 'Save' })).not.toBeVisible();

      // --- CREATE A RECIPE ---
    await page.goto('http://localhost:5173/recipes');
    await page.getByRole('button', { name: '+ Add Recipe' }).click();
    await page.getByPlaceholder('Name').fill(recipeName);
    await page.getByPlaceholder('Description').fill('anything');
    await page.getByPlaceholder('Category (Dessert, Main, ...)').fill('anything');
    await page.getByPlaceholder('Servings').fill('2');
    await page.getByPlaceholder('Selling price (optional)').fill('100');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('button', { name: 'Save' })).not.toBeVisible();

  // --- OPEN THE RECIPE ---
    await page.getByText(recipeName).click();
    await expect(page.getByRole('heading', { name: recipeName })).toBeVisible();
      // --- ADD THE INGREDIENT TO THE RECIPE ---
    await page.getByRole('combobox').selectOption({ label: ingredientName });
    await page.getByPlaceholder('Quantity').fill('3');
    await page.getByRole('button', { name: 'Add' }).click();

  // --- ASSERT THE COST IS EXACTLY RIGHT (the payoff) ---
    await expect(page.getByText('$30', { exact: true })).toBeVisible();
});