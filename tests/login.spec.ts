import { test as setup } from '@playwright/test'; 
setup('login and save storage state', async ({ page }) => 
  { await page.goto('https://guest:welcome2qauto@qauto.forstudy.space'); 
    await page.click('text=Sign In'); 
    await page.fill('#signinEmail', 'guest_auto@example.com'); 
     page.fill('#signinPassword', 'Welcome2qauto'); 
     await page.getByRole('button', { name: 'Login' }).click(); 
     await page.context().storageState({ path: 'state/user.json' }); });
