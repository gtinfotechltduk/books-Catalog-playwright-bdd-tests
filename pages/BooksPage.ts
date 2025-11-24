import { expect } from '@playwright/test';
import type { Page } from 'playwright';

export class BooksPage {
  constructor(private page: Page) {}

  async assertOnBooksPage() {
    await expect(this.page).toHaveURL(/books/i);
  }

  async assertWelcomeMessage() {
    await expect(this.page.getByText(/welcome/i)).toBeVisible();
  }

  async openAddBookForm() {
    await this.page.getByRole('button', { name: /add book/i }).click();
  }

  async fillBookForm(book: {
    title?: string;
    author?: string;
    isbn?: string;
    price?: string;
  }) {
    if (book.title !== undefined) {
      await this.page.getByLabel(/title/i).fill(book.title);
    }
    if (book.author !== undefined) {
      await this.page.getByLabel(/author/i).fill(book.author);
    }
    if (book.isbn !== undefined) {
      await this.page.getByLabel(/isbn/i).fill(book.isbn);
    }
    if (book.price !== undefined) {
      await this.page.getByLabel(/price/i).fill(book.price);
    }
  }

  async submitBookForm() {
    await this.page.getByRole('button', { name: /save/i }).click();
  }

  async assertBookInList(title: string) {
    await expect(
      this.page.getByRole('row', { name: new RegExp(title, 'i') })
    ).toBeVisible();
  }

  async assertValidationErrors() {
    await expect(this.page.getByText(/title is required/i)).toBeVisible();
    await expect(this.page.getByText(/author is required/i)).toBeVisible();
  }
}
