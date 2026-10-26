import { test, expect } from '@playwright/test';
import { IngredientsPage } from './pages/IngredientsPage';

test.use({ storageState: 'playwright/.auth/user.json' });

test('user can delete an ingredient', async ({ page }) => {
  const ingredientsPage = new IngredientsPage(page);
  const name = `Tomato ${Date.now()}`;

  page.on('dialog', dialog => dialog.accept());

  await ingredientsPage.goto();
  await ingredientsPage.addIngredient(name, 'Vegetables', 'kg', '5');
  await expect(ingredientsPage.saveButton).not.toBeVisible(); // form closed
  await ingredientsPage.search(name);
  await ingredientsPage.deleteIngredient(name);
  await expect(page.getByText(name)).not.toBeVisible();
});