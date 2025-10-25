import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://qauto.forstudy.space/');
  await page.click('text=Sign In');
  await page.fill('#signinEmail', 'guest_auto@example.com');
  await page.fill('#signinPassword', 'Welcome2qauto');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForSelector('#userNavDropdown', { timeout: 60000 });

  const storagePath = path.resolve(__dirname, '../state/user.json');
  fs.mkdirSync(path.dirname(storagePath), { recursive: true });
  await context.storageState({ path: storagePath });

  await browser.close();
  console.log('✅ Storage state saved for qauto.forstudy.space');
})();
