import { create } from 'zustand';
import { Task } from '../types/task';

interface TaskState {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newProgress: Task['progress']) => void;
  setTasks: (tasks: Task[]) => void; 
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => ({ tasks: [...state.tasks, task] })),
  editTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  moveTask: (id, newProgress) =>
    set((state) => ({
      tasks: state.tasks.map((task) => 
        task.id === id ? { ...task, progress: newProgress, finishDate: newProgress === "done" ? new Date() : undefined  } : task
      ),
    })),
  setTasks: (tasks) => set({ tasks }),
}));
