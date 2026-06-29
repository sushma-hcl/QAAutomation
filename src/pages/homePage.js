const common = require('../locators/commonLocators');
const PageUtils = require('../utils/pageUtils');
//const product = require('./productPage');

class HomePage extends PageUtils {
  constructor(page) {
    super(page);
    this.common = common;
  }

  async load() {
    await this.navigate('/');
    await this.waitForLoad();
  }

  async openCategory(category) {
    const locator = {
      phones: this.common.categoryPhones,
      laptops: this.common.categoryLaptops,
      monitors: this.common.categoryMonitors
    }[category.toLowerCase()];

    if (!locator) throw new Error(`Unknown category: ${category}`);
    await this.click(locator);
  }

  async selectProduct(productName) {
    await this.click(`.card-title:has-text("${productName}")`); // dynamic locator
  }

  async openCart() {
    await this.click(this.common.btnCart);
  }
}

module.exports = HomePage;
