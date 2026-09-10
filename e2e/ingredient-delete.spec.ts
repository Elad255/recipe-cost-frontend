import { test, expect } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test('user can delete an ingredient', async ({ page }) => {
  const name = `Tomato ${Date.now()}`;

   page.on('dialog', dialog => dialog.accept());   // auto-accept the "are you sure?" confirm
    
    await page.goto('http://localhost:5173/ingredients');
    await page.getByRole('button', { name: '+ Add Ingredient' }).click();
    await page.getByPlaceholder('Name', { exact: true }).fill(name);
    await page.getByPlaceholder('Category').fill('Vegetables');
    await page.getByPlaceholder('Unit (kg, l, pcs)').fill('kg');
    await page.getByPlaceholder('Price per unit').fill('5');
    await page.getByRole('button', { name: 'Save' }).click();
  
    await expect(page.getByRole('button', { name: 'Save' })).not.toBeVisible();  // form closed
    await page.getByPlaceholder('Search by name...').fill(name);                 // bring it on screen
    await page.locator('div').filter({ hasText: name }).getByText('Delete').click();
    await expect(page.getByText(name)).not.toBeVisible();
    
    
});