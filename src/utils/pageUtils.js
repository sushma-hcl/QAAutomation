
class PageUtils {
  constructor(page) {
    this.page = page;
  }

  async navigate(path = '/') {
    await this.page.goto(path);
  }

  async click(selector, options = {}) {
    await this.page.click(selector, options);
  }

  async fill(selector, text, options = {}) {
    await this.page.fill(selector, text, options);
  }

  async getText(selector) {
    return this.page.textContent(selector);
  }

  async waitForSelector(selector, options = {}) {
    await this.page.waitForSelector(selector, options);
  }

  async isVisible(selector) {
    return this.page.isVisible(selector);
  }

  async getElements(selector) {
    return this.page.$$(selector);
  }

  async waitForLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = PageUtils;
