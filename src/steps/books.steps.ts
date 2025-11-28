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
    sum += i % 2 === 0 ? digit : digit * 3;
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  return isbn + checkDigit;
}


Given('I am on the login page', async function () {
  this.loginPage = new LoginPage(this.page, this.baseUrl);
  await this.loginPage.open();
  await this.loginPage.expectLoginPageVisible();
});

When('I log in with valid admin credentials', async function () {
  await this.loginPage.login('admin', 'admin');
});

Then('I should see the books list page', async function () {
  this.booksPage = new BooksPage(this.page);
  await this.booksPage.expectBooksPageVisible();
});

When('I enter an invalid username or password', async function () {
  await this.loginPage.fillCredentials('wrongUser', 'wrongPass');
});

When('I click the login button', async function () {
  await this.loginPage.submit();
});

Then('I should see an error message {string}', async function (message: string) {
  await this.loginPage.expectErrorMessage(message);
});

When('I leave username and password fields empty', async function () {
  await this.loginPage.fillCredentials('', '');
});

Then('I should see validation messages {string} and {string}', async function (msg1: string, msg2: string) {
  await this.loginPage.expectErrorMessage(msg1);
  await this.loginPage.expectErrorMessage(msg2);
});

When('I navigate to the books list page without logging in', async function () {
  await this.page.goto(`${this.baseUrl}/books`);
});

Then('I should be redirected to the login page', async function () {
  await this.loginPage.expectLoginPageVisible();
});

When('I log in with valid credentials', async function () {
  await this.loginPage.login('admin', 'admin');
});

Then('I should see a welcome message with my username', async function () {
  this.booksPage = new BooksPage(this.page);
  await this.booksPage.expectWelcomeMessage('admin');
});

Then('I should see a logout button', async function () {
  await this.booksPage.expectLogoutVisible();
});

When('I click the logout button', async function () {
  await this.booksPage.logout();
});

Then('I should not be able to access the books list page without logging in again', async function () {
  await this.page.goto(`${this.baseUrl}/books`);
  await this.loginPage.expectLoginPageVisible();
});

When('I log out', async function () {
  this.booksPage = new BooksPage(this.page);
  await this.booksPage.logout();
});

Then('I should see the login page', async function () {
  this.loginPage = new LoginPage(this.page, this.baseUrl);
  await this.loginPage.expectLoginPageVisible();
});


When('I add a valid new book', async function () {
  const booksPage = new BooksPage(this.page);

  await booksPage.openAddBookForm();

  const title = faker.lorem.words({ min: 2, max: 4 });
  const author = faker.person.fullName();
  const isbn = generateValidISBN13();
  const price = faker.finance.amount({ min: 5, max: 100, dec: 2 });
  const genre = faker.helpers.arrayElement([
    'Fiction',
    'Non-Fiction',
    'Mystery',
    'Fantasy',
    'Science Fiction',
    'Biography',
  ]);
  const today = new Date().toISOString().slice(0, 10);

  this.lastBook = { title, author, isbn, price };

  await booksPage.fillBookForm({
    title,
    author,
    genre,
    isbn,
    publicationDate: today,
    price,
  });

  await booksPage.submitBookForm();
});

Then('I should see the new book in the list', async function () {
  await this.booksPage.assertBookInList(this.lastBook.title);
});

Then('I navigate to the add book form', async function () {
  await this.booksPage.expectAddBookFormVisible();
});


When('I edit a valid book', async function () {
  const booksPage = new BooksPage(this.page);
  const newTitle = faker.lorem.words({ min: 2, max: 4 });

  await booksPage.editFirstBook({ title: newTitle });

  this.lastBook = { ...(this.lastBook || {}), title: newTitle };
});

Then('I should see the updated book in the list', async function () {
  const { title } = this.lastBook;
  await this.booksPage.assertBookInList(title);
});



When('I delete a book', async function () {
  const booksPage = new BooksPage(this.page);

  const title = await booksPage.getFirstBookTitle();

  this.lastBook = { ...(this.lastBook || {}), title };

  await booksPage.deleteBookByTitle(title);
});

Then('I should not see the book in the list', async function () {
  const { title } = this.lastBook;
  const booksPage = new BooksPage(this.page);

  await booksPage.assertBookNotInList(title);
});



Then('I submit the book form with invalid data', async function () {
  await this.booksPage.fillBookForm({
    title: '',
    author: '',
    isbn: '123',
    price: '-10',
  });

  await this.booksPage.submitBookForm();
});

Then('I should see validation errors on the book form', async function () {
  await this.booksPage.assertValidationErrors();
});



When('I click add book', async function () {
  this.booksPage = new BooksPage(this.page);
  await this.booksPage.openAddBookForm();
});
