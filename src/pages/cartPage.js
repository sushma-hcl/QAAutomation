const common = require('../locators/commonLocators');
const PageUtils = require('../utils/pageUtils');

class CartPage extends PageUtils {
  constructor(page) {
    super(page);
    this.common = common;
  }

  async getCartItems() {
    await this.waitForSelector(this.common.cartTableRows);
    const rows = await this.getElements(this.common.cartTableRows);
    return Promise.all(rows.map(async row => {
      const title = await row.$eval('td:nth-child(2)', el => el.textContent.trim());
      const price = await row.$eval('td:nth-child(3)', el => el.textContent.trim());
      return { title, price };
    }));
  }
}



//qty inc-dec  -> product dom

module.exports = CartPage;
