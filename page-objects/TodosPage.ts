import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

class TodosPage extends BasePage {
  header: Locator;
  inputElement: Locator;
  clearCompletedButton: Locator;
  todoItemsList: Locator;
  itemsLeftElement: Locator;
  activeLink: Locator;
  completedLink: Locator;
  toggleAllButton: Locator;

  constructor(page: Page) {
    super(page);
    this.initLocators();
  }

  initLocators(): void {
    this.activeLink = this.page.locator("a:text('Active')");
    this.completedLink = this.page.locator("a:text('Completed')");
    this.header = this.page.locator("h1:text('todos')");
    this.inputElement = this.page.locator("header input");
    this.clearCompletedButton = this.page.getByRole("button", {
      name: "Clear completed",
    });
    this.todoItemsList = this.page.locator("li[data-testid='todo-item']");
    this.toggleAllButton = this.page.locator("label[for='toggle-all']");
    this.itemsLeftElement = this.page.locator("span[data-testid='todo-count']");
  }

  async goTo(): Promise<void> {
    await this.page.goto("/todomvc");
  }

  async addMultipleTodos(items: string[]): Promise<void> {
    for (const item of items) {
      await this.addToDo(item);
    }
  }

  async clickActiveLink(): Promise<void> {
    await this.activeLink.click();
  }

  async clickCompletedLink(): Promise<void> {
    await this.completedLink.click();
  }

  async clickToggleAllButton(): Promise<void> {
    await this.toggleAllButton.click();
  }

  async getHeaderText(): Promise<string | null> {
    return await this.header.textContent();
  }

  async addToDo(item: string) {
    await this.inputElement.fill(item);
    await this.inputElement.press("Enter");
  }

  async checkMultipleToDos(items: string[]): Promise<void> {
    for (const item of items) {
      await this.checkToDo(item);
    }
  }

  async checkToDo(item: string): Promise<void> {
    const itemCheckBox = this.page
      .locator("li")
      .filter({ hasText: item })
      .getByLabel("Toggle Todo");

    await itemCheckBox.click();
  }

  async clickClearCompletedButton(): Promise<void> {
    await this.clearCompletedButton.click();
  }

  async getTodosCount(): Promise<number> {
    return await this.todoItemsList.count();
  }

  async getItemsLeftNumber(): Promise<number> {
    const itemsLeftText = await this.getText(this.itemsLeftElement);

    if (itemsLeftText === null) {
      throw new Error("Items left text is null");
    }

    if (!/item(?:s)? left/.test(itemsLeftText)) {
      throw new Error("Items left text was not found");
    }

    return Number(itemsLeftText.replace(/items? left/, "").trim());
  }

  async deleteMultipleToDos(items: string[]): Promise<void> {
    for (const item of items) {
      await this.deleteToDo(item);
    }
  }

  async deleteToDo(item: string): Promise<void> {
    const itemRow = this.page.locator("li[data-testid='todo-item']").filter({
      hasText: item,
    });

    // Hover to show delete button
    await itemRow.hover();

    // Locate the delete button inside the matching li
    const deleteButton = itemRow.locator("button[aria-label='Delete']");

    await deleteButton.click();
  }
}

export default TodosPage;
