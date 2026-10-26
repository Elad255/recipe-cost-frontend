import { Page, Locator } from '@playwright/test';

export class IngredientsPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly nameField: Locator;
  readonly categoryField: Locator;
  readonly unitField: Locator;
  readonly priceField: Locator;
  readonly saveButton: Locator;
  readonly searchField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByRole('button', { name: '+ Add Ingredient' });
    this.nameField = page.getByPlaceholder('Name', { exact: true });
    this.categoryField = page.getByPlaceholder('Category');
    this.unitField = page.getByPlaceholder('Unit (kg, l, pcs)');
    this.priceField = page.getByPlaceholder('Price per unit');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.searchField = page.getByPlaceholder('Search by name...');
  }

  async goto() {
    await this.page.goto('http://localhost:5173/ingredients');
  }

  async addIngredient(name: string, category: string, unit: string, price: string) {
    await this.addButton.click();
    await this.nameField.fill(name);
    await this.categoryField.fill(category);
    await this.unitField.fill(unit);
    await this.priceField.fill(price);
    await this.saveButton.click();
  }

  async search(name: string) {
    await this.searchField.fill(name);
  }
    
    async editIngredient(name: string, newPrice: string) {
    await this.page.locator('div').filter({ hasText: name }).getByText('Edit').click();
    await this.priceField.fill(newPrice);
    await this.saveButton.click();
  }

  async deleteIngredient(name: string) {
    await this.page.locator('div').filter({ hasText: name }).getByText('Delete').click();
  }
}