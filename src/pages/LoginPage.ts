
import { expect } from '@playwright/test';
import type { Page } from 'playwright';

export class LoginPage {

  constructor(private page: any, private baseUrl: string) {}

  async open() {
    await this.page.goto(`${this.baseUrl}/login`);
  }

  async expectLoginPageVisible() {
    await expect(this.page).toHaveURL(/\/login$/i);
    await expect(this.page.getByRole('button', { name: /login/i })).toBeVisible();
  }

  async fillCredentials(username: string, password: string) {
    
    await this.page.getByRole('textbox', { name: /username/i }).fill(username);
    await this.page.getByRole('textbox', { name: /password/i }).fill(password);
  }

  async login(username: string, password: string) {
    await this.fillCredentials(username, password);
    await this.submit();
  }

  async submit() {
    await this.page.getByRole('button', { name: /login/i }).click();
  }

  async expectErrorMessage(_message: string) {
    await expect(
      this.page.getByText(/there is a problem with your submission/i)
    ).toBeVisible();
  }
  
}