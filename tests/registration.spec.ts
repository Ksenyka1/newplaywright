import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Sign In').click();
    await page.getByText('Registration').click()
})

test('Expect title', async ({ page }) => {
   await expect(page.getByRole('heading', { name: 'Registration' })).toBeVisible();
})

test('Check if user can tipe name', async ({ page }) => {
   await page.locator('//*[@id="signupName"]').fill('Oksana');
})

test('Check if user can tipe last name', async ({ page }) => {
   await page.locator('//*[@id="signupLastName"]').fill('Oksanar');
})

test('Check if user can tipe Email', async ({ page }) => {
   await page.locator('//*[@id="signupEmail"]').fill('Oksana11!R@gmail.com');
})

test('Check if user can tipe password', async ({ page }) => {
   await page.locator('//*[@id="signupPassword"]').fill('Oksana11!R');
})

test('Check if user can re-enter password', async ({ page }) => {
   await page.locator('//*[@id="signupRepeatPassword"]').fill('Oksana11!R');
})

test('Check the Registration button is disabled without data', async ({ page }) => {
await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
})


test('Check successfully register new user with correct data', async ({ page }) => {
    const timestamp = Date.now();
    const email = `aqa-user-${timestamp}@test.com`;

    await page.fill('#signupName', 'Oksana');
    await page.fill('#signupLastName', 'Oksanar');
    await page.fill('#signupEmail', email);
    await page.fill('#signupPassword', 'Oksana11!R');
    await page.fill('#signupRepeatPassword', 'Oksana11!R');
    await expect(page.getByRole('button', { name: 'Register' })).toBeEnabled();
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.locator('#userNavDropdown')).toBeVisible();
  })
