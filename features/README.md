Playwright + Cucumber (BDD) + TypeScript

This project contains automated UI tests for the Books Inventory Web Application.
The framework uses Playwright for browser automation and Cucumber (BDD) for readable, behavior-driven scenarios written in Gherkin.


Tech Stack:
Playwright – browser automation
Cucumber.js – BDD test runner
TypeScript – strongly typed test code
Faker.js – random test data
Page Object Model (POM) – clean code structure

Install Dependencies:
npm install
npm run build
npm run test:bdd


Test coverage:
Login success & validation errors
Authorization checks (redirect when not logged in)
Logout flow
Add, edit, and delete books
Form validation messages
Welcome message & logout button


Known Bugs
Unauthorized access not blocked
Users can access /books directly without logging in, instead of being redirected to the login page.

Logout does not fully clear session
After logging out, users may still access protected pages via direct URL.

Login button click not always registering
The login button sometimes requires multiple clicks due to inconsistent UI behaviour.

Report
Cucumber report
10 scenarios (3 failed, 7 passed)
43 steps (3 failed, 2 skipped, 38 passed)
The failed scenarios are expected because they relate to known application bugs.