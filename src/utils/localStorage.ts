import { Task } from '../types/task';

const STORAGE_KEY = 'task-manager-data';

export const saveToStorage = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const loadFromStorage = (): Task[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};
