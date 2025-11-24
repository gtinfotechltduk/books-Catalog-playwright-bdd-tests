import { Given, When, Then } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { BooksPage } from '../pages/BooksPage';
import { faker } from '@faker-js/faker';

Given('I am on the login page', async function () {
  this.loginPage = new LoginPage(this.page, this.baseUrl);
  await this.loginPage.open();
  await this.loginPage.expectLoginPageVisible();
});

When('I log in with valid admin credentials', async function () {
  const username = 'admin'; 
  const password = 'admin';   
  await this.loginPage.login(username, password);
});


Then('I should see the books list page', async function () {
  this.booksPage = new BooksPage(this.page, this.baseUrl);
await this.booksPage.expectBooksPageVisible();
});
