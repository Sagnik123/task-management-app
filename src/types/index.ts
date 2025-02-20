export interface Task {
    id: string;
    title: string;
    completed: boolean;
    category?: string; // Optional category field
    tags?: string[]; // Optional tags field
    dueDate?: string; // Optional due date field
}

export type TaskListProps = {
    tasks: Task[];
    onComplete: (id: string) => void;
    onDelete: (id: string) => void;
};