export interface Task {
    id: string;
    title: string;
    completed: boolean;
    category?: string;
    tags?: string[];
    dueDate?: string;
}
