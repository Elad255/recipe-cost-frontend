import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('save login state', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('playwright@test.com', 'Test1234');
  await page.getByRole('button', { name: 'Log out' }).waitFor({ timeout: 15000 });
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});