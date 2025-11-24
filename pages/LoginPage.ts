import { expect } from '@playwright/test';
import type { Page } from 'playwright';


export class LoginPage {
  constructor(private page: Page) {}

  async goto(baseUrl: string) {
    await this.page.goto(`${baseUrl}/login`); // or just baseUrl if login is "/"
  }

  async login(username: string, password: string) {
    await this.page.getByLabel(/username/i).fill(username);
    await this.page.getByLabel(/password/i).fill(password);
    await this.page.getByRole('button', { name: /login/i }).click();
  }

  async assertOnLoginPage() {
    await expect(this.page).toHaveURL(/login/i);
    await expect(this.page.getByRole('button', { name: /login/i })).toBeVisible();
  }
}
