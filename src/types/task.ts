export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskProgress = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: string; 
  priority: TaskPriority;
  progress: TaskProgress;
}
