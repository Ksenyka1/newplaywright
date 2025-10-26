import { test, expect } from '@playwright/test';

test.describe('Cars API tests', () => {
  let sid: string;
  const createdCarIds: number[] = [];

  
  test.beforeAll(async ({ request }) => {
    const loginResponse = await request.post('https://qauto.forstudy.space/api/auth/signin', {
      data: {
        email: 'guest_auto@example.com',
        password: 'Welcome2qauto',
        remember: false
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    expect(loginResponse.status()).toBe(200);

    const setCookie = loginResponse.headers()['set-cookie'];
    const sidMatch = setCookie?.match(/sid=([^;]+)/);
    sid = sidMatch ? sidMatch[1] : '';
    expect(sid).toBeTruthy();
  });

  // create first car
  test('Create first car via API', async ({ request }) => {
    const car1 = { carBrandId: 1, carModelId: 1, mileage: 122 };

    const response = await request.post('https://qauto.forstudy.space/api/cars', {
      data: car1,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': `sid=${sid}`
      }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.data).toMatchObject(car1);

    createdCarIds.push(body.data.id);
  });

  // create car without auth
  test('Fail to create car without auth', async ({ request }) => {
    const newCar = { carBrandId: 1, carModelId: 1, mileage: 100 };
    const response = await request.post('https://qauto.forstudy.space/api/cars', {
      data: newCar,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    expect(response.status()).toBe(401);
  });

  //create car with invalid data
  test('Fail to create car with invalid data', async ({ request }) => {
    const invalidCar = { carBrandId: 'invalid', carModelId: null, mileage: -50 };
    const response = await request.post('https://qauto.forstudy.space/api/cars', {
      data: invalidCar,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': `sid=${sid}`
      }
    });
    expect(response.status()).toBe(400);
  });

  // delete all cars
  test.afterAll(async ({ request }) => {
    for (const id of createdCarIds) {
      await request.delete(`https://qauto.forstudy.space/api/cars/${id}`, {
        headers: { 'Cookie': `sid=${sid}` }
      });
    }
  });
});
