import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders Task Management App', () => {
    render(<App />);
    const headingElement = screen.getByText(/Task Management App/i);
    console.log('Heading Element:', headingElement);
    expect(headingElement).toBeInTheDocument();
});

test('adds a new task', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    const taskElement = screen.getByText(/New Task/i);
    console.log('Task Element:', taskElement);
    expect(taskElement).toBeInTheDocument();
});

test('searches tasks by name', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add Task/i);
    const searchInput = screen.getByPlaceholderText(/Search tasks by name or category/i);

    fireEvent.change(inputElement, { target: { value: 'Task 1' } });
    fireEvent.click(addButton);
    fireEvent.change(inputElement, { target: { value: 'Task 2' } });
    fireEvent.click(addButton);

    fireEvent.change(searchInput, { target: { value: 'Task 1' } });

    const task1Element = screen.getByText(/Task 1/i);
    const task2Element = screen.queryByText(/Task 2/i);

    console.log('Task 1 Element:', task1Element);
    console.log('Task 2 Element:', task2Element);
    expect(task1Element).toBeInTheDocument();
    expect(task2Element).not.toBeInTheDocument();
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
    console.log('Task Element after delete:', taskElement);
    expect(taskElement).not.toBeInTheDocument();
});

test('marks a task as completed', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'Task to be completed' } });
    fireEvent.click(addButton);

    const taskElement = screen.getByText(/Task to be completed/i);
    fireEvent.click(taskElement);

    const completedTaskElement = screen.getByText(/Task to be completed/i);
    console.log('Completed Task Element:', completedTaskElement);
    expect(completedTaskElement).toHaveStyle('text-decoration: line-through;');
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

    console.log('Task 1 Element after clear:', task1Element);
    console.log('Task 2 Element after clear:', task2Element);
    expect(task1Element).not.toBeInTheDocument();
    expect(task2Element).not.toBeInTheDocument();
});