import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.getByPlaceholder('Email');
    this.passwordField = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.errorMessage = page.getByText('Login failed — check your email and password');
  }

  async goto() {
    await this.page.goto('http://localhost:5173/login');
  }

  async login(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}