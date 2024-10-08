import { Locator, Page } from "@playwright/test";

class TodosPage {
  page: Page;
  header: Locator;
  inputElement: Locator;
  clearCompletedButton: Locator;
  todoItemsList: Locator;
  itemsLeftElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = this.page.locator("h1");
    this.inputElement = this.page.locator("input.new-todo");
    this.clearCompletedButton = this.page.getByRole("button", {
      name: "Clear completed",
    });
    this.todoItemsList = this.page.locator("li[data-testid='todo-item']");
    this.itemsLeftElement = this.page.locator("span[data-testid='todo-count']");
  }

  async goTo(): Promise<void> {
    await this.page.goto("/todomvc/#/");
  }

  async getHeaderText(): Promise<string | null> {
    return await this.header.textContent();
  }

  async pause(): Promise<void> {
    await this.page.pause();
  }

  async addToDoItem(item: string) {
    await this.inputElement.fill(item);
    await this.inputElement.press("Enter");
  }

  async checkItem(item: string): Promise<void> {
    const itemCheckBox = await this.page
      .locator("li")
      .filter({ hasText: item })
      .getByLabel("Toggle Todo");

    await itemCheckBox.click();
  }

  async clickClearCompletedButton(): Promise<void> {
    await this.clearCompletedButton.click();
  }

  async getItemsCount(): Promise<number> {
    return await this.todoItemsList.count();
  }

  async getItemsLeftNumber(): Promise<number> {
    let itemsLeftText = await this.itemsLeftElement.textContent();

    if (itemsLeftText === null) {
      throw new Error("Items left text is null");
    }

    if (!itemsLeftText.includes("items left")) {
      throw new Error("Items left text is not as expected");
    } else {
      itemsLeftText = itemsLeftText.replace("items left", "").trim();
    }

    return Number(itemsLeftText);
  }

  async deleteItem(item: string): Promise<void> {
    const itemRow = await this.page
      .locator("li[data-testid='todo-item']")
      .filter({
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
