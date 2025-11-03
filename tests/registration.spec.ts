import { test, expect } from '@playwright/test';
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

test('Expect title', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Registration' })).toBeVisible();
});

test('Check the Registration button is disabled without data', async () => {
  await registrationPage.expectRegisterButtonDisabled();
});

test('Check successfully register new user with correct data', async () => {
  const timestamp = Date.now();
  const email = `aqa-user-${timestamp}@test.com`;

  await registrationPage.fillName('Oksana');
  await registrationPage.fillLastName('Oksanar');
  await registrationPage.fillEmail(email);
  await registrationPage.fillPassword('Oksana11!R');
  await registrationPage.fillRepeatPassword('Oksana11!R');

  await registrationPage.expectRegisterButtonEnabled();
  await registrationPage.clickRegister();

  await expect(homePage.page.locator('#userNavDropdown')).toBeVisible();
});
