import { setWorldConstructor, World } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(60 * 1000); // 60 seconds
export interface BookData {
  title: string;
  author: string;
  isbn: string;
  price: string;
}
export class PlaywrightWorld extends World {
  browser!: Browser;
  page!: Page;
  baseUrl = 'https://frontendui-librarysystem.onrender.com';  
  lastBook?: BookData;  
}

setWorldConstructor(PlaywrightWorld);
