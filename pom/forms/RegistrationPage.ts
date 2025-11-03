import { Page, Locator, expect } from '@playwright/test';

export default class RegistrationPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.errorMessage = page.locator('.invalid-feedback');
  }

  async fillName(name: string) {
    await this.nameInput.fill(name);
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async fillRepeatPassword(password: string) {
    await this.repeatPasswordInput.fill(password);
  }

  async clickRegister() {
    await this.registerButton.click();
  }

  async expectRegisterButtonEnabled() {
    await expect(this.registerButton).toBeEnabled();
  }

  async expectRegisterButtonDisabled() {
    await expect(this.registerButton).toBeDisabled();
  }

  async expectErrorMessage(text: RegExp) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(text);
    await expect(this.errorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  }
}
