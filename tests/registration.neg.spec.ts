import { test } from '@playwright/test';
import HomePage from '../pom/pages/HomePage';
import RegistrationPage from '../pom/forms/RegistrationPage';

let homePage: HomePage;
let registrationPage: RegistrationPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  registrationPage = new RegistrationPage(page);
  await homePage.navigate();
  await homePage.openRegistrationForm();
});

// 1. Name is required
test('Displays "Name is required" message when field is left empty', async () => {
  await registrationPage.nameInput.focus();
  await registrationPage.page.locator('body').click();
  await registrationPage.expectErrorMessage(/Name required/);
});

// 2. Name too short
test('Displays "Name has to be from 2 to 20 characters long" message when type 1', async () => {
  await registrationPage.fillName('1');
  await registrationPage.page.locator('body').click();
  await registrationPage.expectErrorMessage(/Name has to be from 2 to 20 characters long/);
});

// 3. Name invalid (11)
test('Displays "Name is invalid" message when type 11', async () => {
  await registrationPage.fillName('11');
  await registrationPage.page.locator('body').click();
  await registrationPage.expectErrorMessage(/Name is invalid/);
});

// 4. Name invalid (абс123)
test('Displays "Name is invalid" message when type абс123', async () => {
  await registrationPage.fillName('абс123');
  await registrationPage.page.locator('body').click();
  await registrationPage.expectErrorMessage(/Name is invalid/);
});

// 5. Last name required
test('Displays "Last name is required" message when field is left empty', async () => {
  await registrationPage.lastNameInput.focus();
  await registrationPage.page.locator('body').click();
  await registrationPage.expectErrorMessage(/Last name required/);
});

// 6. Last name too short
test('Displays "Last name has to be from 2 to 20 characters long" message when type 1', async () => {
  await registrationPage.fillLastName('1');
  await registrationPage.page.locator('body').click();
  await registrationPage.expectErrorMessage(/Last name has to be from 2 to 20 characters long/);
});

// 7. Last name invalid (11)
test('Displays "Last name is invalid" message when type 11', async () => {
  await registrationPage.fillLastName('11');
  await registrationPage.page.locator('body').click();
  await registrationPage.expectErrorMessage(/Last name is invalid/);
});

// 8. Last name invalid (абс123)
test('Displays "Last name is invalid" message when type абс123', async () => {
  await registrationPage.fillLastName('абс123');
  await registrationPage.page.locator('body').click();
  await registrationPage.expectErrorMessage(/Last name is invalid/);
});

// 9. Last name too long
test('Displays "Last name has to be from 2 to 20 characters long" message when type more than 20 characters', async () => {
  await registrationPage.fillLastName('qwertyuiop123456789zz');
  await registrationPage.page.locator('body').click();
  await registrationPage.expectErrorMessage(/Last name has to be from 2 to 20 characters long/);
});

// 10. Email required
test('Displays "Email required" message when field is left empty', async () => {
  await registrationPage.emailInput.focus();
  await registrationPage.page.locator('body').click();
  await registrationPage.expectErrorMessage(/Email required/);
});

// 11. Email incorrect
test('Displays "Email is incorrect" message when type 1', async () => {
  await registrationPage.fillEmail('1');
  await registrationPage.page.locator('body').click();
  await registrationPage.expectErrorMessage(/Email is incorrect/);
});

// 12. Password required
test('Displays "Password required" message when field is left empty', async () => {
  await registrationPage.passwordInput.focus();
  await registrationPage.page.locator('body').click();
  await registrationPage.expectErrorMessage(/Password required/);
});

// 13. Password too short / invalid
test('Displays "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" message when type 1', async () => {
  await registrationPage.fillPassword('1');
  await registrationPage.page.locator('body').click();
  await registrationPage.expectErrorMessage(/Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter/);
});

// 14. Password too long / invalid
test('Displays "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" message when type 1234567890Azxcvb', async () => {
  await registrationPage.fillPassword('1234567890Azxcvb');
  await registrationPage.page.locator('body').click();
  await registrationPage.expectErrorMessage(/Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter/);
});

// 15. Repeat password required
test('Displays "Re-enter password required" message when field is left empty', async () => {
  await registrationPage.repeatPasswordInput.focus();
  await registrationPage.page.locator('body').click();
  await registrationPage.expectErrorMessage(/Re-enter password required/);
});

// 16. Passwords do not match
test('Shows error "Passwords do not match" when password and re-enter password are different', async () => {
  await registrationPage.fillPassword('ABCasdqwe123');
  await registrationPage.fillRepeatPassword('ABCasdqwe1234');
  await registrationPage.repeatPasswordInput.blur();
  await registrationPage.page.locator('body').click();
  await registrationPage.expectErrorMessage(/Passwords do not match/);
});

// 17. Register button disabled with incorrect data
test('Ensures Register button is disabled with incorrect data', async () => {
  await registrationPage.fillName('1');
  await registrationPage.fillLastName('1');
  await registrationPage.fillEmail('1');
  await registrationPage.fillPassword('1');
  await registrationPage.fillRepeatPassword('2');
  await registrationPage.expectRegisterButtonDisabled();
});

// 18. Register button disabled with no data
test('Ensures Register button is disabled when no data is entered', async () => {
  await registrationPage.expectRegisterButtonDisabled();
});
