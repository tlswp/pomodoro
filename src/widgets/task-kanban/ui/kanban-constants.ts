import { TaskStatus } from '@/entities/task';

export const columns = [
  { id: TaskStatus.TODO, title: 'To Do' },
  { id: TaskStatus.IN_PROGRESS, title: 'In Progress' },
  { id: TaskStatus.COMPLETED, title: 'Completed' },
  { id: TaskStatus.CANCELED, title: 'Canceled' },
];
