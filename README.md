# Todos Application Playwright Tests

This repository contains automated UI tests for the "Todos" application, written using [Playwright](https://playwright.dev/) and Page Object Model (POM) pattern.
These tests ensure that various user interactions with the Todos application work correctly, such as adding, deleting, completing, and filtering todos.

## Prerequisites

Before running the tests, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (v18.0 or higher)
- [Yarn (suggested)](https://classic.yarnpkg.com/lang/en/docs/install/) or [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Setup

1. Clone the repository:

```
git clone https://github.com/your-username/todos-playwright-tests.git
cd todos-playwright-tests
```

## Install dependencies

```
yarn install
```

Or

```
npm install
```

## Run tests

Headless mode:

```
npx playwright test
```

Or

```
yarn test
```

Headed mode:

```
npx playwright test --headed
```

Note: Tests will run in parallel by default.

## Report

![Last Run Report](/images/report-2024-10-08.png)

## Additional Setup

For additional configuration go to `playwright.config.ts` file

## Author

Julio Guerra
