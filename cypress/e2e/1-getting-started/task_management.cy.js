/// <reference types="cypress" />

describe('Task Management App', () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit('http://localhost:3000/');
  });

  it('adds and displays a new task', () => {
    const newTask = 'New Task';

    // Add a new task
    cy.get('input[placeholder="Add a new task"]').type(newTask);
    cy.contains('Add Task').click();

    // Verify the new task is displayed
    cy.contains(newTask).should('be.visible');
    cy.get('li').should('have.length', 1); // Verify the task list has one item
  });

  it('completes a task', () => {
    const taskToComplete = 'Task to be completed';

    // Add a new task
    cy.get('input[placeholder="Add a new task"]').type(taskToComplete);
    cy.contains('Add Task').click();

    // Complete the task
    cy.contains(taskToComplete).click();

    // Verify the task is marked as completed
    cy.contains(taskToComplete).should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)');
    cy.get('li').should('have.length', 1); // Verify the task list still has one item
  });

  it('edits a task', () => {
    const taskToEdit = 'Task to be edited';
    const editedTask = 'Edited Task';

    // Add a new task
    cy.get('input[placeholder="Add a new task"]').type(taskToEdit);
    cy.contains('Add Task').click();

    // Edit the task
    cy.contains(taskToEdit).closest('li').within(() => {
      cy.contains('Edit').click();
    });
    cy.get('input[value="' + taskToEdit + '"]').clear().type(editedTask);
    cy.contains('Update Task').click();

    // Verify the task is edited
    cy.contains(editedTask).should('be.visible');
    cy.contains(taskToEdit).should('not.exist'); // Verify the old task title is not present
    cy.get('li').should('have.length', 1); // Verify the task list still has one item
  });

  it('deletes a task', () => {
    const taskToDelete = 'Task to be deleted';

    // Add a new task
    cy.get('input[placeholder="Add a new task"]').type(taskToDelete);
    cy.contains('Add Task').click();

    // Delete the task
    cy.contains(taskToDelete).closest('li').within(() => {
      cy.contains('Remove').click();
    });

    // Verify the task is deleted
    cy.contains(taskToDelete).should('not.exist');
    cy.get('li').should('have.length', 0); // Verify the task list is empty
  });

  it('clears all tasks', () => {
    const task1 = 'Task 1';
    const task2 = 'Task 2';

    // Add two new tasks
    cy.get('input[placeholder="Add a new task"]').type(task1);
    cy.contains('Add Task').click();
    cy.get('input[placeholder="Add a new task"]').type(task2);
    cy.contains('Add Task').click();

    // Verify both tasks are added
    cy.contains(task1).should('be.visible');
    cy.contains(task2).should('be.visible');
    cy.get('li').should('have.length', 2); // Verify the task list has two items

    // Clear all tasks
    cy.contains('Clear All').click();

    // Verify all tasks are cleared
    cy.contains(task1).should('not.exist');
    cy.contains(task2).should('not.exist');
    cy.get('li').should('have.length', 0); // Verify the task list is empty
  });

  it('does not add an empty task', () => {
    // Try to add an empty task
    cy.contains('Add Task').click();

    // Verify no task is added
    cy.get('li').should('have.length', 0); // Verify the task list is empty
  });

  it('adds and displays duplicate tasks', () => {
    const duplicateTask = 'Duplicate Task';

    // Add the same task twice
    cy.get('input[placeholder="Add a new task"]').type(duplicateTask);
    cy.contains('Add Task').click();
    cy.get('input[placeholder="Add a new task"]').type(duplicateTask);
    cy.contains('Add Task').click();

    // Verify both tasks are displayed
    cy.contains(duplicateTask).should('be.visible');
    cy.get('li').should('have.length', 2); // Verify the task list has two items
  });

  it('adds and displays a task with special characters', () => {
    const specialTask = 'Task with special characters !@#$%^&*()';

    // Add a task with special characters
    cy.get('input[placeholder="Add a new task"]').type(specialTask);
    cy.contains('Add Task').click();

    // Verify the task is displayed
    cy.contains(specialTask).should('be.visible');
    cy.get('li').should('have.length', 1); // Verify the task list has one item
  });
});