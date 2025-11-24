import { Given, When, Then } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { BooksPage } from '../pages/BooksPage';
import { faker } from '@faker-js/faker';

function generateValidISBN13(): string {
  let isbn = '';
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = faker.number.int({ min: 0, max: 9 });
    isbn += digit;
    sum += (i % 2 === 0 ? digit : digit * 3);
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  return isbn + checkDigit;
}

Given('I am on the login page', async function (this: PlaywrightWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.goto(this.baseUrl);
  await loginPage.assertOnLoginPage();
});

When('I log in with valid admin credentials', async function (this: PlaywrightWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login('admin', 'admin');
});

Then('I should see the books list page', async function (this: PlaywrightWorld) {
  const booksPage = new BooksPage(this.page);
  await booksPage.assertOnBooksPage();
});

Then('I should see a welcome message', async function (this: PlaywrightWorld) {
  const booksPage = new BooksPage(this.page);
  await booksPage.assertWelcomeMessage();
});

When('I add a valid new book', async function (this: PlaywrightWorld) {
  const booksPage = new BooksPage(this.page);
  await booksPage.openAddBookForm();

  const title = faker.lorem.words({ min: 2, max: 4 });
  const author = faker.person.fullName();
  const isbn = generateValidISBN13();
  const price = faker.number.float({ min: 5, max: 100, precision: 0.01 }).toFixed(2);

  // Save in world for later assertions
  (this as any).lastBook = { title, author, isbn, price };

  await booksPage.fillBookForm({ title, author, isbn, price });
  await booksPage.submitBookForm();
});

Then('I should see the new book in the list', async function (this: PlaywrightWorld) {
  const booksPage = new BooksPage(this.page);
  const { title } = (this as any).lastBook;
  await booksPage.assertBookInList(title);
});

When('I navigate to the add book form', async function (this: PlaywrightWorld) {
  const booksPage = new BooksPage(this.page);
  await booksPage.assertOnBooksPage();
  await booksPage.openAddBookForm();
});

When('I submit the book form with invalid data', async function (this: PlaywrightWorld) {
  const booksPage = new BooksPage(this.page);

  // Example: empty title + negative price
  await booksPage.fillBookForm({
    title: '', // invalid/empty
    author: faker.person.fullName(),
    isbn: generateValidISBN13(),
    price: '-10'
  });

  await booksPage.submitBookForm();
});

Then('I should see validation errors on the book form', async function (this: PlaywrightWorld) {
  const booksPage = new BooksPage(this.page);
  await booksPage.assertValidationErrors();
});
