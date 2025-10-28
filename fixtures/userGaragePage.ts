import { test as base, expect, BrowserContext, Page } from '@playwright/test';
import path from 'path';

type Fixtures = {
  userGaragePage: Page;
};

const test = base.extend<Fixtures>({
  userGaragePage: async ({ browser }, use) => {
    const context: BrowserContext = await browser.newContext({
      storageState: path.resolve(__dirname, '../state/user.json'),
    });

    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { test, expect };



