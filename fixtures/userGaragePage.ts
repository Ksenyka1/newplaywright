import { test as base, Page, BrowserContext } from '@playwright/test';
import path from 'path';

const STORAGE_PATH = path.resolve(__dirname, '../state/user.json');

type UserFixtures = {
  userGaragePage: Page;
  userContext: BrowserContext;
};

export const test = base.extend<UserFixtures>({

    userContext: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: STORAGE_PATH });
    await use(context);
    await context.close();
  },

  userGaragePage: async ({ userContext }, use) => {
    const page = await userContext.newPage();
    await page.goto('https://qauto.forstudy.space/panel/garage');
    await use(page);
    await page.close();
  },
});

export { expect } from '@playwright/test';
