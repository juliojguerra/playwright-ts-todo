import { Locator, Page } from "@playwright/test";

abstract class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Abstract methods for specific page classes to implement their locators
  abstract initLocators(): void;

  async goTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  // Get the text content of any element
  async getText(locator: Locator): Promise<string | null> {
    return await locator.textContent();
  }

  async pause(): Promise<void> {
    await this.page.pause();
  }
}
export default BasePage;
