import { expect } from '@playwright/test';
import type { Page } from 'playwright';

export class LoginPage {
  constructor(private page: Page, private baseUrl: string) {}

  // Go to the login page
  async open() {
    await this.page.goto(`${this.baseUrl}/login`);
  }

  // Login with username and password
  async login(username: string, password: string) {
    await this.page.locator('#username').fill(username);
    await this.page.locator('#password').fill(password);

    // Reliable login button selector
    const loginButton = this.page.locator('button[type="submit"]');
    await loginButton.click();
  }

  // Verify login page loaded
  async expectLoginPageVisible() {
    await expect(this.page).toHaveURL(/\/login/);
  }
}
