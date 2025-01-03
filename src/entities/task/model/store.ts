import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ITask, TaskStatus } from './type';

interface ITaskStore {
  tasks: ITask[];
  addTask: (
    task: Partial<ITask> & { id: string; status: TaskStatus; createdAt: string }
  ) => void;
  updateTask: (task: Partial<ITask> & { id: string }) => void;
  deleteTask: (id: string) => void;
}

export const useTaskStore = create(
  persist<ITaskStore>(
    (set) => ({
      tasks: [],
      addTask: (
        task: Partial<ITask> & {
          id: string;
          status: TaskStatus;
          createdAt: string;
        }
      ) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (task: Partial<ITask> & { id: string }) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === task.id ? { ...t, ...task } : t
          ),
        })),
      deleteTask: (id: string) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
    }),
    {
      name: 'tasks',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
