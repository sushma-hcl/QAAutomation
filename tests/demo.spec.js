const { test, expect } = require('@playwright/test');
const HomePage = require('../src/pages/homePage');
const ProductPage = require('../src/pages/productPage');
const CartPage = require('../src/pages/cartPage');

test.describe('Demoblaze POM tests', () => {
  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(20000);
  });

  test('should add selected product to cart', async ({ page }) => {
    
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.load();
    await homePage.openCategory('Laptops');
    await homePage.selectProduct('Sony vaio i5');
    await page.waitForLoadState('domcontentloaded');

    const expectedName = await productPage.getProductName();
    const expectedPriceRaw = await productPage.getProductPrice();
    console.log(expectedPriceRaw);
    const expectedPrice = expectedPriceRaw.replace(/[^0-9.]/g, '').trim();
    page.once('dialog', dialog => dialog.accept());
    await productPage.addToCart();

    await homePage.openCart();
    const cartItems = await cartPage.getCartItems();

    expect(cartItems.length).toBeGreaterThan(0);
    expect(cartItems[0].title).toContain(expectedName.trim());
    const cartPrice = cartItems[0].price.replace(/[^0-9.]/g, '').trim();
    expect(cartPrice).toBe(expectedPrice);
    await page.waitForTimeout(2000); // Optional: Wait for 2 seconds to observe the result
  });
});
