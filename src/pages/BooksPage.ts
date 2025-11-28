import { expect } from '@playwright/test';
import type { Page } from 'playwright';

export class BooksPage {
  constructor(private page: Page) {} 

  
  async expectBooksPageVisible() {
    await expect(this.page).toHaveURL(/\/books$/i);
    await expect(
      this.page.getByRole('heading', { name: /book list/i })
    ).toBeVisible();
  }

  async expectWelcomeMessage() {
    await expect(
      this.page.getByRole('heading', { name: /welcome,\s*admin!/i })
    ).toBeVisible();
  }
  

  async expectLogoutVisible() {
    await expect(
      this.page.getByRole('button', { name: /log\s*out/i })
    ).toBeVisible();
  }

  async logout() {
    await this.page.getByRole('button', { name: /log\s*out/i }).click();
  }

  async expectAddBookFormVisible() {
    await expect(
      this.page.getByRole('heading', { name: /add book/i })
    ).toBeVisible();
  }

  async openAddBookForm() {
    await this.page.getByRole('button', { name: /add new book|add book/i }).click();
    await this.page.waitForSelector('#title', { timeout: 10000 });
  }

  async fillBookForm(book: {
    title?: string;
    author?: string;
    genre?: string;
    isbn?: string;
    publicationDate?: string;
    price?: string;
  }) {
    if (book.title !== undefined) {
      
      await this.page.locator('#title, input[name="title"]').fill(book.title);
    }
  
    if (book.author !== undefined) {
      await this.page.locator('#author, input[name="author"]').fill(book.author);
    }
  
    if (book.genre !== undefined) {
      await this.page.locator('#genre, select[name="genre"]').selectOption(book.genre);
    }
  
    if (book.isbn !== undefined) {
      await this.page.locator('#isbn, input[name="isbn"]').fill(book.isbn);
    }
  
    if (book.publicationDate !== undefined) {
      await this.page
        .locator('#publicationDate, input[name="publicationDate"]')
        .fill(book.publicationDate);
    }
  
    if (book.price !== undefined) {
      await this.page.locator('#price, input[name="price"]').fill(book.price);
    }
  }
  
  
  async assertBookInList(title: string) {
    await expect(
      this.page.getByRole('row', { name: new RegExp(title, 'i') })
    ).toBeVisible({ timeout: 10000 });
  }
  

  async editFirstBook(updatedBook: {
    title?: string;
    author?: string;
    genre?: string;
    isbn?: string;
    publicationDate?: string;
    price?: string;
  }) {
 
    await this.page
      .getByRole('button', { name: /^edit$/i })
      .first()
      .click();
  

    await this.page
      .getByRole('button', { name: /save changes/i })
      .waitFor({ timeout: 10000 });
  
   
    await this.fillBookForm(updatedBook);
  
   
    await this.submitBookForm();
  }
  
  
  

  async submitBookForm() {
    const submitButton = this.page.getByRole('button', {
      name: /add book|save changes|submit add new book form/i,
    });
  
    await submitButton.click();
  }
  

  async assertValidationErrors() {
    await expect(this.page.getByText(/required/i)).toBeVisible();
  }

  async getFirstBookTitle(): Promise<string> {
    
    const firstRow = this.page.getByRole('row').nth(1);
    const titleCell = firstRow.getByRole('cell').first();
    return titleCell.innerText();
  }

  async deleteBookByTitle(title: string) {
    const row = this.page.getByRole('row', {
      name: new RegExp(title, 'i'),
    });

    await row.getByRole('button', { name: /^delete$/i }).click();
  }

  async assertBookNotInList(title: string) {
    await expect(
      this.page.getByText(new RegExp(title, 'i'))
    ).not.toBeVisible();
  }
}


