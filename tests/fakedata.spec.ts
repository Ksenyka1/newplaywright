import { test, expect } from '@playwright/test';

test('Mock user profile response and check UI', async ({ page }) => {
  const fakeProfile = {
    "status": "ok",
    "data": {
        "userId": 265773,
        "photoFilename": "default-user.png",
        "name": "OksanaFake",
        "lastName": "Oksana"
    }
};
  await page.goto('https://qauto.forstudy.space');
  await page.click('text=Sign In');
  await page.fill('#signinEmail', 'guest_auto@example.com');
  await page.fill('#signinPassword', 'Welcome2qauto');
  await page.getByRole('button', { name: 'Login' }).click();

 await page.click('text=Profile');
  await page.route('**/api/users/profile', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(fakeProfile),
    })
  );

  await page.goto('https://qauto.forstudy.space/panel/profile');

await expect(page.locator('text=OksanaFake')).toBeVisible();
});