import { test as base, expect, BrowserContext, Page } from '@playwright/test';

type Fixtures = {
  userGaragePage: Page;
};

const test = base.extend<Fixtures>({
  userGaragePage: async ({ browser }, use) => {
    const context: BrowserContext = await browser.newContext(); // без storageState
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { test, expect };



