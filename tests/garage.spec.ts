import { test, expect } from '../fixtures/userGaragePage';

test('user is logged in and sees Garage page', async ({ userGaragePage }) => {
  await userGaragePage.goto('https://qauto.forstudy.space/panel/garage');
  await expect(userGaragePage).toHaveURL('https://qauto.forstudy.space/panel/garage');
  await expect(userGaragePage.locator('div.panel-page_heading h1')).toBeVisible({ timeout: 10000 });
  await expect(userGaragePage.locator('#userNavDropdown')).toBeVisible();
});
