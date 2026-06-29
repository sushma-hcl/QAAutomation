const common = require('../locators/commonLocators');
const PageUtils = require('../utils/pageUtils');

class ProductPage extends PageUtils {
  constructor(page) {
    super(page);
    this.common = common;
  }

  async addToCart() {
    await this.click(this.common.addToCartButton);
  }

  async getProductName() {
    return this.getText(this.common.productName);
  }

  async getProductPrice() {
    return this.getText(this.common.productPrice);
  }
}

module.exports = ProductPage;
