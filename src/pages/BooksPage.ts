import { expect } from '@playwright/test';
import type { Page } from 'playwright';

export class BooksPage {
  constructor(private page: Page, private baseUrl: string) {}

  // Verify we are on the books list page
  async expectBooksPageVisible() {
    await expect(this.page).toHaveURL(/\/books$/i);
    await expect(this.page.getByRole('heading', { name: /book list/i })
    ).toBeVisible();
  }
}

