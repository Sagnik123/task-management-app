import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('adds and displays a new task', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'Integration Test Task' } });
    fireEvent.click(addButton);

    const taskElement = screen.getByText(/Integration Test Task/i);
    expect(taskElement).toBeInTheDocument();
});

test('completes a task', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'Task to be completed' } });
    fireEvent.click(addButton);

    const taskElement = screen.getByText(/Task to be completed/i);
    fireEvent.click(taskElement);

    expect(taskElement).toHaveStyle('text-decoration: line-through;');
});

test('edits a task', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'Task to be edited' } });
    fireEvent.click(addButton);

    const taskElement = screen.getByText(/Task to be edited/i);
    const taskItem = taskElement.closest('li');
    if (taskItem) {
        const editButton = within(taskItem).getByRole('button', { name: /Edit/i });
        fireEvent.click(editButton);

        const editInputElement = screen.getByDisplayValue(/Task to be edited/i);
        fireEvent.change(editInputElement, { target: { value: 'Edited Task' } });
        const saveButton = screen.getByText(/Update Task/i);
        fireEvent.click(saveButton);

        const editedTaskElement = screen.getByText(/Edited Task/i);
        expect(editedTaskElement).toBeInTheDocument();
    }
});

test('deletes a task', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'Task to be deleted' } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText(/Remove/i);
    fireEvent.click(deleteButton);

    const taskElement = screen.queryByText(/Task to be deleted/i);
    expect(taskElement).not.toBeInTheDocument();
});

test('clears all tasks', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'Task 1' } });
    fireEvent.click(addButton);
    fireEvent.change(inputElement, { target: { value: 'Task 2' } });
    fireEvent.click(addButton);

    const clearButton = screen.getByText(/Clear All/i);
    fireEvent.click(clearButton);

    const task1Element = screen.queryByText(/Task 1/i);
    const task2Element = screen.queryByText(/Task 2/i);

    expect(task1Element).not.toBeInTheDocument();
    expect(task2Element).not.toBeInTheDocument();
});