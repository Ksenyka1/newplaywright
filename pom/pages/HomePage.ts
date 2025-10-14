// pom/HomePage.ts
import { Page, Locator } from '@playwright/test';

export default class HomePage {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly registrationButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByText('Sign In');
    this.registrationButton = page.getByText('Registration');
  }

  // Відкриває головну сторінку
  async navigate() {
    await this.page.goto('/');
  }

  // Відкриває форму реєстрації
  async openRegistrationForm() {
    await this.signInButton.click();
    await this.registrationButton.click();
  }
}
