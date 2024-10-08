import { test, expect } from "@playwright/test";
import TodosPage from "../page-objects/TodosPage";
import testData from "../data/testData.json";

test.describe("Todos Application Tests", () => {
  let todosPage: TodosPage;

  test.beforeEach(async ({ page }) => {
    todosPage = new TodosPage(page);
    await todosPage.goTo();

    expect(todosPage.inputElement).toBeVisible();
  });

  test("1. User can successfully clear completed todo items.", async () => {
    await todosPage.addMultipleTodos(testData.todos.slice(0, 3)); // Add the first 3 items

    await todosPage.checkMultipleToDos(testData.todos.slice(0, 2)); // Check the first 2 items

    await todosPage.clickClearCompletedButton();

    const todosCount = await todosPage.getTodosCount();

    // Added 3 items, checked 2, so 1 item should be left
    expect(todosCount).toEqual(1);
  });

  test.skip("2. User can successfully make duplicate todo items.", async () => {
    // This feature is not implemented yet
  });

  test("3. Number of items left is the same as count of active todo items in the list with 'all' filter", async () => {
    await todosPage.addMultipleTodos(testData.todos.slice(0, 3)); // Add the first 3 items

    const itemsLeftNumber = await todosPage.getItemsLeftNumber();
    const todosCount = await todosPage.getTodosCount();

    expect(itemsLeftNumber).toBe(todosCount);
  });

  test("4. User can successfully delete a todo item.", async () => {
    await todosPage.addMultipleTodos(testData.todos); // Add all 4 items

    await todosPage.deleteMultipleToDos(testData.todos.slice(1, 3));

    const todosCount = await todosPage.getTodosCount();

    // Added 4 items, deleted 2, so 2 items should be left
    expect(todosCount).toEqual(2);
  });

  test("5. User can complete todo items and see the correct number of items left.", async () => {
    await todosPage.addMultipleTodos(testData.todos);

    await todosPage.checkMultipleToDos(testData.todos.slice(0, 2)); // Check the first 2 items

    const itemsLeftNumber = await todosPage.getItemsLeftNumber();

    // Added 4 items, checked 2, so 2 items should be left
    expect(itemsLeftNumber).toEqual(2);
  });

  test("6. User can complete todo items and see the correct number of items in Completed list.", async () => {
    await todosPage.addMultipleTodos(testData.todos);

    await todosPage.checkMultipleToDos(testData.todos.slice(0, 3)); // Check the first 3 items

    await todosPage.clickCompletedLink();

    const todosCount = await todosPage.getTodosCount();

    // Added 4 items, checked 3, so 3 items should be in the Completed list
    expect(todosCount).toEqual(3);
  });

  test("7. User can complete todo items and see the correct number of items in Active list.", async () => {
    await todosPage.addMultipleTodos(testData.todos);

    await todosPage.checkMultipleToDos(testData.todos.slice(0, 2)); // Check the first 2 items

    await todosPage.clickActiveLink();

    const todosCount = await todosPage.getTodosCount();

    // Added 4 items, checked 2, so 2 items should be left
    expect(todosCount).toEqual(2);
  });

  test("8. User can complete todo items and see the correct number of items in All list.", async () => {
    await todosPage.addMultipleTodos(testData.todos);

    await todosPage.checkMultipleToDos(testData.todos.slice(0, 3)); // Check the first 3 items

    const itemsLeftNumber = await todosPage.getItemsLeftNumber();

    // Added 4 items, checked 3, so 1 item should be left
    expect(itemsLeftNumber).toEqual(1);
  });

  test("9. User can undo complete todo items and see the correct number of items left.", async () => {
    await todosPage.addMultipleTodos(testData.todos);

    await todosPage.checkMultipleToDos(testData.todos); // Check all todos

    await todosPage.checkMultipleToDos(testData.todos.slice(0, 2)); // Uncheck the first 2 todos

    const itemsLeftNumber = await todosPage.getItemsLeftNumber();

    // Added 4 items, checked all, unchecked 2, so 2 items should be left
    expect(itemsLeftNumber).toEqual(2);
  });

  test("10. User can complete all todo items by clicking the toggle all button.", async () => {
    await todosPage.addMultipleTodos(testData.todos);

    await todosPage.clickToggleAllButton();

    const itemsLeftNumber = await todosPage.getItemsLeftNumber();

    // Added 4 items, checked all, so 0 items should be left
    expect(itemsLeftNumber).toEqual(0);
  });
});
