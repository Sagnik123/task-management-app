import React from 'react';
import { Task } from '../types';

interface TaskListProps {
    tasks: Task[];
    onRemove: (id: string) => void;
    onToggleCompletion: (id: string) => void;
    onEdit: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onRemove, onToggleCompletion, onEdit }) => {
    if (tasks.length === 0) {
        return <p>No tasks available</p>;
    }

    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <span 
                        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                        onClick={() => onToggleCompletion(task.id)}
                    >
                        {task.title}
                    </span>
                    {task.category && <span className="category">{task.category}</span>}
                    {task.tags && <span className="tags">{task.tags.join(', ')}</span>}
                    {task.dueDate && <span className="due-date">{task.dueDate}</span>}
                    <button onClick={() => onEdit(task.id)}>Edit</button>
                    <button onClick={() => onRemove(task.id)}>Remove</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;