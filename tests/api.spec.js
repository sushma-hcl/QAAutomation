const { test, expect } = require('@playwright/test');
import post_signup from '../src/data/product.js';

test.describe('Demoblaze API tests', () => {
  test('GET /entries returns product entries', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get('https://api.demoblaze.com/entries', { ignoreHTTPSErrors: true });
    const responseTime = Date.now() - startTime;

    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/json');
    expect(responseTime).toBeLessThan(3000);

    const body = await response.json();

    expect(body).toHaveProperty('Items');
    expect(Array.isArray(body.Items)).toBeTruthy();
    expect(body.Items.length).toBeGreaterThan(0);

    const firstItem = body.Items[0];
    expect(firstItem).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        price: expect.any(Number),
        cat: expect.any(String)
      })
    );
  });

  test('POST /signup creates a new user', async ({ request }) => {
    const username = `qa_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    console.log(`Creating user with username: ${username}`);
    const response = await request.post('https://api.demoblaze.com/signup', {
      ignoreHTTPSErrors: true,
      data: {
       post_signup
      }
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.text();
    expect(responseBody.length).toBeGreaterThanOrEqual(0);
  });
});
