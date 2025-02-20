import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from './TaskList';
import { Task } from '../types';

const tasks: Task[] = [
    { id: '1', title: 'Task 1', completed: false },
    { id: '2', title: 'Task 2', completed: true }
];

test('renders tasks', () => {
    render(<TaskList tasks={tasks} onRemove={() => {}} onToggleCompletion={() => {}} onEdit={() => {}} />);
    const task1Element = screen.getByText(/Task 1/i);
    const task2Element = screen.getByText(/Task 2/i);
    expect(task1Element).toBeInTheDocument();
    expect(task2Element).toBeInTheDocument();
});

test('toggles task completion', () => {
    const toggleCompletion = jest.fn();
    render(<TaskList tasks={tasks} onRemove={() => {}} onToggleCompletion={toggleCompletion} onEdit={() => {}} />);
    const task1Element = screen.getByText(/Task 1/i);
    fireEvent.click(task1Element);
    expect(toggleCompletion).toHaveBeenCalledWith('1');
});

test('removes a task', () => {
    const removeTask = jest.fn();
    render(<TaskList tasks={tasks} onRemove={removeTask} onToggleCompletion={() => {}} onEdit={() => {}} />);
    const removeButton = screen.getAllByText(/Remove/i)[0];
    fireEvent.click(removeButton);
    expect(removeTask).toHaveBeenCalledWith('1');
});

test('renders an empty task list', () => {
    render(<TaskList tasks={[]} onRemove={() => {}} onToggleCompletion={() => {}} onEdit={() => {}} />);
    const noTasksElement = screen.getByText(/No tasks available/i);
    expect(noTasksElement).toBeInTheDocument();
});

test('edits a task', () => {
    const editTask = jest.fn();
    render(<TaskList tasks={tasks} onRemove={() => {}} onToggleCompletion={() => {}} onEdit={editTask} />);
    const editButton = screen.getAllByText(/Edit/i)[0];
    fireEvent.click(editButton);
    expect(editTask).toHaveBeenCalledWith('1');
});

test('marks a task as completed', () => {
    const toggleCompletion = jest.fn();
    render(<TaskList tasks={tasks} onRemove={() => {}} onToggleCompletion={toggleCompletion} onEdit={() => {}} />);
    const task1Element = screen.getByText(/Task 1/i);
    fireEvent.click(task1Element);
    expect(toggleCompletion).toHaveBeenCalledWith('1');
});