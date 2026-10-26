import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('login fails with wrong password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('playwright@test.com', 'wrongpassword');
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(page).toHaveURL('http://localhost:5173/login');
});