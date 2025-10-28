import { test, expect } from '../../fixtures/userGaragePage';

test('open user garage', async ({ userGaragePage }) => {
  await userGaragePage.goto('https://qauto.forstudy.space/garage');
  await expect(userGaragePage.locator('h1')).toContainText('Garage');
});
