import { chromium, test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('login and save storage state', async () => {
  // Запуск браузера
  const browser = await chromium.launch();
  const context = await browser.newContext(); // чистий контекст
  const page = await context.newPage();

  // Перехід на сайт
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');

  // Логін
  await page.click('text=Sign In');
  await page.fill('#signinEmail', 'guest_auto@example.com');
  await page.fill('#signinPassword', 'Welcome2qauto');
  await page.getByRole('button', { name: 'Login' }).click();

  // Чекати повне завантаження сторінки після логіну
  await page.waitForLoadState('networkidle');

  // Створити папку state, якщо її немає
  const stateDir = path.join(__dirname, 'state');
  if (!fs.existsSync(stateDir)) {
    fs.mkdirSync(stateDir);
  }

  // Отримати storage state
  const fullState = await context.storageState();

  // Фільтрувати cookies та localStorage тільки для forstudy.space
  const filteredState = {
    cookies: fullState.cookies.filter(c => c.domain.includes('forstudy.space')),
    origins: fullState.origins.filter(o => o.origin.includes('forstudy.space'))
  };

  // Записати user.json
  const filePath = path.join(stateDir, 'user.json');
  fs.writeFileSync(filePath, JSON.stringify(filteredState, null, 2));

  console.log('Storage state saved:', filePath);

  await browser.close();
});
