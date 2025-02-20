Feature: Task Management

  Scenario: Add a new task
    Given I open the task management app
    When I add a new task with the title "New Task"
    Then I should see the task "New Task" in the task list

  Scenario: Complete a task
    Given I open the task management app
    When I add a new task with the title "Task to be completed"
    And I mark the task "Task to be completed" as completed
    Then I should see the task "Task to be completed" with a line-through style

  Scenario: Edit a task
    Given I open the task management app
    When I add a new task with the title "Task to be edited"
    And I edit the task "Task to be edited" to have the title "Edited Task"
    Then I should see the task "Edited Task" in the task list

  Scenario: Delete a task
    Given I open the task management app
    When I add a new task with the title "Task to be deleted"
    And I delete the task "Task to be deleted"
    Then I should not see the task "Task to be deleted" in the task list

  Scenario: Clear all tasks
    Given I open the task management app
    When I add a new task with the title "Task 1"
    And I add a new task with the title "Task 2"
    And I clear all tasks
    Then I should not see any tasks in the task list