import { test, expect } from '@playwright/test';
import { IngredientsPage } from './pages/IngredientsPage';

test.use({ storageState: 'playwright/.auth/user.json' });

test('user can edit an ingredient', async ({ page }) => {
  const ingredientsPage = new IngredientsPage(page);
  const name = `Tomato ${Date.now()}`;

  await ingredientsPage.goto();
  await ingredientsPage.addIngredient(name, 'Vegetables', 'kg', '5');
  await expect(ingredientsPage.saveButton).not.toBeVisible(); // form closed
  await ingredientsPage.search(name);
  await ingredientsPage.editIngredient(name, '9');
  await expect(page.getByText('$9 / kg')).toBeVisible();
});