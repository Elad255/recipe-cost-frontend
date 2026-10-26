import { test, expect } from '@playwright/test';
import { IngredientsPage } from './pages/IngredientsPage';

test.use({ storageState: 'playwright/.auth/user.json' });

test('user can add an ingredient', async ({ page }) => {
  const ingredientsPage = new IngredientsPage(page);
  const name = `Tomato${Date.now()}`;

  await ingredientsPage.goto();
  await ingredientsPage.addIngredient(name, 'Vegetables', 'kg', '5');
  await ingredientsPage.search(name);
  await expect(page.getByText(name)).toBeVisible();
});