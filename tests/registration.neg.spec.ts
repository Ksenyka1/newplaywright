import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Sign In').click();
    await page.getByText('Registration').click()
})

//1
test('Displays "Name is required" message when field is left empty', async ({ page }) => {
const nameInput = page.locator('#signupName');
const errorMessage = page.locator('.invalid-feedback');

  await nameInput.focus();
  await page.locator('body').click(); 

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(/Name required/);

  await expect(errorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});
//2
test('Displays "Name has to be from 2 to 20 characters long" message when type 1', async ({ page }) => {
const nameInput = page.locator('#signupName');
const errorMessage = page.locator('.invalid-feedback');

  await nameInput.focus();
  await nameInput.fill('1');
  await page.locator('body').click(); 

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toHaveText(/Name has to be from 2 to 20 characters long/);

  await expect(errorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});
//3
test('Displays "Name is invalid" message when type 11', async ({ page }) => {
const nameInput = page.locator('#signupName');
const errorMessage = page.locator('.invalid-feedback');

  await nameInput.focus();
  await nameInput.fill('11');
  await page.locator('body').click(); 

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toHaveText(/Name is invalid/);

  await expect(errorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});
//4
test('Displays "Name is invalid" message when type абс123', async ({ page }) => {
const nameInput = page.locator('#signupName');
const errorMessage = page.locator('.invalid-feedback');

  await nameInput.focus();
  await nameInput.fill('абс123');
  await page.locator('body').click(); 

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toHaveText(/Name is invalid/);

  await expect(errorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});
//5
test('Displays "Last name is required" message when field is left empty', async ({ page }) => {
const nameInput = page.locator('#signupLastName');
const errorMessage = page.locator('.invalid-feedback');

  await nameInput.focus();
  await page.locator('body').click(); 

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(/Last name required/);

  await expect(errorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});
//6
test('Displays "Last name has to be from 2 to 20 characters long" message when type 1', async ({ page }) => {
const nameInput = page.locator('#signupLastName');
const errorMessage = page.locator('.invalid-feedback');

  await nameInput.focus();
  await nameInput.fill('1');
  await page.locator('body').click(); 

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toHaveText(/Last name has to be from 2 to 20 characters long/);

  await expect(errorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});
//7
test('Displays "Last name is invalid" message when type 11', async ({ page }) => {
const nameInput = page.locator('#signupLastName');
const errorMessage = page.locator('.invalid-feedback');

  await nameInput.focus();
  await nameInput.fill('11');
  await page.locator('body').click(); 

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toHaveText(/Last name is invalid/);

  await expect(errorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});
//8
test('Displays "Last name is invalid" message when type абс123', async ({ page }) => {
const nameInput = page.locator('#signupLastName');
const errorMessage = page.locator('.invalid-feedback');

  await nameInput.focus();
  await nameInput.fill('абс123');
  await page.locator('body').click(); 

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toHaveText(/Last name is invalid/);

  await expect(errorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});
//9
test('Displays "Last name has to be from 2 to 20 characters long" message when type more than 20 characters', async ({ page }) => {
const nameInput = page.locator('#signupLastName');
const errorMessage = page.locator('.invalid-feedback');

  await nameInput.focus();
  await nameInput.fill('qwertyuiop123456789z');
  await page.locator('body').click(); 

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toHaveText(/Last name has to be from 2 to 20 characters long/);

  await expect(errorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});
//10
test('Displays "Email required" message when field is left empty', async ({ page }) => {
const nameInput = page.locator('#signupEmail');
const errorMessage = page.locator('.invalid-feedback');

  await nameInput.focus();
  await page.locator('body').click(); 

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(/Email required/);

  await expect(errorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});
//11
test('Displays "Email is incorrect" message when type 1', async ({ page }) => {
const nameInput = page.locator('#signupEmail');
const errorMessage = page.locator('.invalid-feedback');

  await nameInput.focus();
  await nameInput.fill('1');
  await page.locator('body').click(); 

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toHaveText(/Email is incorrect/);

  await expect(errorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});
//12
test('Displays "Password required" message when field is left empty', async ({ page }) => {
const nameInput = page.locator('#signupPassword');
const errorMessage = page.locator('.invalid-feedback');

  await nameInput.focus();
  await page.locator('body').click(); 

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(/Password required/);

  await expect(errorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});
//13
test('Displays "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" message when type 1', async ({ page }) => {
const nameInput = page.locator('#signupPassword');
const errorMessage = page.locator('.invalid-feedback');

  await nameInput.focus();
  await nameInput.fill('1');
  await page.locator('body').click(); 

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toHaveText(/Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter/);

  await expect(errorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});
//14
test('Displays "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" message when type 1234567890Azxcvb"', async ({ page }) => {
const nameInput = page.locator('#signupPassword');
const errorMessage = page.locator('.invalid-feedback');

  await nameInput.focus();
  await nameInput.fill('1234567890Azxcvb');
  await page.locator('body').click(); 

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toHaveText(/Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter/);

  await expect(errorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});
//15
test('Displays "Re-enter password required" message when field is left empty', async ({ page }) => {
const nameInput = page.locator('#signupRepeatPassword');
const errorMessage = page.locator('.invalid-feedback');

  await nameInput.focus();
  await page.locator('body').click(); 

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(/Re-enter password required/);

  await expect(errorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});
//16
test('Shows error "Passwords do not match" when password and re-enter password are different', async ({ page }) => {
  const passwordInput = page.locator('#signupPassword');
  const repeatPasswordInput = page.locator('#signupRepeatPassword');
  const errorMessage = page.locator('.invalid-feedback');

  await passwordInput.fill('ABCasdqwe123');
  await repeatPasswordInput.fill('ABCasdqwe1234');
  await repeatPasswordInput.blur(); 
  await page.locator('body').click(); 

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(/Passwords do not match/);
  await expect(errorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});
//17 
test('Ensures Register button is disabled with incorrect data', async ({ page }) => {
    await page.fill('#signupName', '1');
    await page.fill('#signupLastName', '1');
    await page.fill('#signupEmail', '1');
    await page.fill('#signupPassword', '1');
    await page.fill('#signupRepeatPassword', '2');
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  })
//18
test('Ensures Register button is disabled when no data is entered', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  })