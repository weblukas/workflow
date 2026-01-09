import { create } from 'zustand';

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  createdAt: Date;
  status: 'todo' | 'in-progress' | 'done';
};

type TaskStore = {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasks: () => Task[];
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  addTask: (newTask) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'todo',
    };
    set((state) => ({ tasks: [...state.tasks, task] }));
  },

  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }));
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    }));
  },

  getTasks: () => get().tasks,
}));
