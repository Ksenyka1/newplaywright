import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: process.env.BASE_URL || 'https://qauto.forstudy.space/',
    httpCredentials: {
      username: process.env.HTTP_USERNAME || 'guest',
      password: process.env.HTTP_PASSWORD || 'welcome2qauto',
    },
    trace: 'on-first-retry',
    headless: false,
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    // 
    {
      name: 'setup',
      testMatch: /.*login\.spec\.ts/,  //state/user.json
      use: { ...devices['Desktop Chrome'] },
    },

    // усі інші тести залежать від setup
    {
      name: 'main',
      testIgnore: /.*login\.spec\.ts/, // щоб не дублювався запуск
      dependencies: ['setup'],         // головне — залежність
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
