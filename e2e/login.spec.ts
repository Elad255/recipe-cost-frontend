import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('playwright@test.com', 'Test1234');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});