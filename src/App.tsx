import React, { useState } from 'react';
import './App.css'; // Import the CSS file
import TaskList from './components/TaskList';
import { Task } from './types';

const categories = ['Work', 'Personal', 'Shopping', 'Others'];

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskInput, setTaskInput] = useState<string>('');
    const [categoryInput, setCategoryInput] = useState<string>(categories[0]);
    const [tagsInput, setTagsInput] = useState<string>('');
    const [dueDateInput, setDueDateInput] = useState<string>('');
    const [editTaskId, setEditTaskId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const addTask = () => {
        if (taskInput.trim()) {
            const newTask: Task = {
                id: Date.now().toString(), // Convert number to string
                title: taskInput,
                completed: false,
                category: categoryInput,
                tags: tagsInput.split(',').map(tag => tag.trim()),
                dueDate: dueDateInput
            };
            if (editTaskId) {
                setTasks(tasks.map(task => 
                    task.id === editTaskId ? newTask : task
                ));
                setEditTaskId(null);
            } else {
                setTasks([...tasks, newTask]);
            }
            setTaskInput('');
            setCategoryInput(categories[0]);
            setTagsInput('');
            setDueDateInput('');
        }
    };

    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleTaskCompletion = (id: string) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const editTask = (id: string) => {
        const taskToEdit = tasks.find(task => task.id === id);
        if (taskToEdit) {
            setTaskInput(taskToEdit.title);
            setCategoryInput(taskToEdit.category || categories[0]);
            setTagsInput(taskToEdit.tags?.join(', ') || '');
            setDueDateInput(taskToEdit.dueDate || '');
            setEditTaskId(id);
        }
    };

    const clearAllTasks = () => {
        setTasks([]);
    };

    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Task Management App</h1>
            <input 
                type="text" 
                value={taskInput} 
                onChange={(e) => setTaskInput(e.target.value)} 
                placeholder="Add a new task" 
            />
            <select 
                value={categoryInput} 
                onChange={(e) => setCategoryInput(e.target.value)}
            >
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <input 
                type="text" 
                value={tagsInput} 
                onChange={(e) => setTagsInput(e.target.value)} 
                placeholder="Tags (comma separated)" 
            />
            <input 
                type="date" 
                value={dueDateInput} 
                onChange={(e) => setDueDateInput(e.target.value)} 
                placeholder="Due Date" 
            />
            <button className="add-task" onClick={addTask}>{editTaskId ? 'Update Task' : 'Add Task'}</button>
            <button className="clear-all" onClick={clearAllTasks}>Clear All</button>
            <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search tasks by name or category" 
            />
            <TaskList 
                tasks={filteredTasks} 
                onRemove={removeTask} 
                onToggleCompletion={toggleTaskCompletion} 
                onEdit={editTask}
            />
        </div>
    );
};

export default App;