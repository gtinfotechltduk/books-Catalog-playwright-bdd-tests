import { setWorldConstructor, World } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(60 * 1000); // 60 seconds

export class PlaywrightWorld extends World {
  browser!: Browser;
  page!: Page;
  baseUrl = 'https://frontendui-librarysystem.onrender.com';  // ✅ your base URL
}

setWorldConstructor(PlaywrightWorld);
