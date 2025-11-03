import { test, expect } from "@playwright/test";
import { json } from "stream/consumers";

test("interception test", async ({ page }) => {
  page.on("request", request => 
    console.log(">>", request.method(), request.url())
  );

  page.on("response", response => 
    console.log("<<", response.status(), response.url())
  );

  await page.goto("https://qauto.forstudy.space/");
});

test("mocking - fake car", async ({ page }) => {
  const fakecar = {
    status: "ok",
    data: {
      id: 427232,
      carBrandId: 1,
      carModelId: 1,
      initialMileage: 55,
      updatedMileageAt: "2025-10-25T07:27:25.845Z",
      carCreatedAt: "2025-10-25T07:27:25.845Z",
      mileage: 55,
      brand: "Audi",
      model: "TT",
      logo: "audi.png",
    },
  };

  await page.route("**/cars", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(fakecar),
    })
  );

  await page.goto("https://qauto.forstudy.space/panel/garage");

  await page.waitForTimeout(2000);
});


test("Get brands via API - check status", async ({ request }) => {
  const response = await request.get("https://qauto.forstudy.space/panel/gara", {
    headers: {
      accept: "application/json",
    },
  });

  console.log("Response status:", response.status());

  const text = await response.text();
  console.log("Response body:", text);

  expect(response.status()).toBe(200);

});

test('Sign in via API and get sid from cookie, then use it in browser', async ({ request, page }) => {
  const signinPayload = {
    email: 'guest_auto@example.com',
    password: 'Welcome2qauto',
    remember: false
  };

  const response = await request.post('https://qauto.forstudy.space/api/auth/signin', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    data: signinPayload,
  });


expect(response.status()).toBe(200);

  const headers = response.headers();
  const setCookieHeader = headers['set-cookie'] ?? headers['Set-Cookie'];

  const sid = setCookieHeader?.split(';')[0];
  expect(sid).toContain('sid=');

  console.log('Extracted sid:', sid);
});
