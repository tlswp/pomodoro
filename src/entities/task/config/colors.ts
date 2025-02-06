import { TaskPriority, TaskStatus } from '../model';

export const taskStatusColors = {
  [TaskStatus.TODO]: `dark:border-slate-500 hover:dark:border-slate-600 hover:border-slate-700 
    border-slate-600 dark:text-slate-500 text-slate-600`,
  [TaskStatus.IN_PROGRESS]: `dark:border-sky-500 hover:dark:border-sky-600 hover:border-sky-700 
    border-sky-600 dark:text-sky-500 text-sky-600`,
  [TaskStatus.COMPLETED]: `dark:border-green-500 hover:dark:border-green-600 hover:border-green-700 
    border-green-600 dark:text-green-500 text-green-600`,
  [TaskStatus.CANCELED]: `dark:border-rose-500 hover:dark:border-rose-600 hover:border-rose-700 
    border-rose-600 dark:text-rose-500 text-rose-600`,
};

export const taskPriorityColors = {
  [TaskPriority.LOW]: `dark:border-teal-500 hover:dark:border-teal-600 hover:border-teal-700 
    border-teal-600 dark:text-teal-500 text-teal-600`,
  [TaskPriority.MEDIUM]: `dark:border-amber-500 hover:dark:border-amber-600 hover:border-amber-700 
    border-amber-600 dark:text-amber-500 text-amber-600`,
  [TaskPriority.HIGH]: `dark:border-red-500 hover:dark:border-red-600 hover:border-red-700 
    border-red-600 dark:text-red-500 text-red-600`,
};
