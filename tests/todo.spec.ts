import { test, expect } from "@playwright/test";
import TodosPage from "../page-objects/TodosPage";

test.describe("Todos Application Tests", () => {
  let todosPage: TodosPage;

  test.beforeEach(async ({ page }) => {
    todosPage = new TodosPage(page);
    await todosPage.goTo();

    const inputElement = await todosPage.inputElement;
    await expect(inputElement).toBeVisible();
  });

  test("1. User can successfully clear completed todo items.", async ({
    page,
  }) => {
    await todosPage.addToDoItem("item1");
    await todosPage.addToDoItem("item2");
    await todosPage.addToDoItem("item3");

    await todosPage.checkItem("item1");
    await todosPage.checkItem("item2");

    await todosPage.clickClearCompletedButton();

    const itemsCount = await todosPage.getItemsCount();

    // Added 3 items, checked 2, so 1 item should be left
    await expect(itemsCount).toEqual(1);
  });

  test.skip("2. User can successfully make duplicate todo items.", async ({
    page,
  }) => {
    // This feature is not implemented yet
  });

  test("3. Number of items left is the same as count of active todo items in the list with 'all' filter", async ({
    page,
  }) => {
    await todosPage.addToDoItem("item1");
    await todosPage.addToDoItem("item2");
    await todosPage.addToDoItem("item3");

    const itemsLeftNumber = await todosPage.getItemsLeftNumber();
    const itemsCount = await todosPage.getItemsCount();

    await expect(itemsLeftNumber).toBe(itemsCount);
  });

  test("4. User can successfully delete a todo item.", async ({ page }) => {
    await todosPage.addToDoItem("item1");
    await todosPage.addToDoItem("item2");
    await todosPage.addToDoItem("item3");
    await todosPage.addToDoItem("item4");

    await todosPage.deleteItem("item2");
    await todosPage.deleteItem("item3");

    const itemsCount = await todosPage.getItemsCount();

    // Added 4 items, deleted 2, so 2 items should be left
    await expect(itemsCount).toEqual(2);
  });
});
