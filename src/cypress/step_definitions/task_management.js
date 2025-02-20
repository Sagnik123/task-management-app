import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I open the task management app', () => {
  cy.visit('/');
});

When('I add a new task with the title {string}', (title) => {
  cy.get('input[placeholder="Add a new task"]').type(title);
  cy.contains('Add Task').click();
});

When('I mark the task {string} as completed', (title) => {
  cy.contains(title).click();
});

When('I edit the task {string} to have the title {string}', (oldTitle, newTitle) => {
  cy.contains(oldTitle).closest('li').within(() => {
    cy.contains('Edit').click();
  });
  cy.get('input[value="' + oldTitle + '"]').clear().type(newTitle);
  cy.contains('Update Task').click();
});

When('I delete the task {string}', (title) => {
  cy.contains(title).closest('li').within(() => {
    cy.contains('Remove').click();
  });
});

When('I clear all tasks', () => {
  cy.contains('Clear All').click();
});

Then('I should see the task {string} in the task list', (title) => {
  cy.contains(title).should('be.visible');
});

Then('I should see the task {string} with a line-through style', (title) => {
  cy.contains(title).should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)');
});

Then('I should not see the task {string} in the task list', (title) => {
  cy.contains(title).should('not.exist');
});

Then('I should not see any tasks in the task list', () => {
  cy.get('li').should('not.exist');
});