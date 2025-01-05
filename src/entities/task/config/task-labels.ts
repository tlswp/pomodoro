import { type ITask, TaskPriority, TaskStatus } from '../model';

export const taskLabels: Record<keyof ITask, string> = {
  title: 'Title',
  description: 'Description',
  status: 'Status',
  priority: 'Priority',
  tags: 'Tags',
  deadline: 'Deadline',
  createdAt: 'Created At',
  updatedAt: 'Updated At',
  completedAt: 'Completed At',
  canceledAt: 'Canceled At',
  id: 'ID',
};

export const taskStatusLabels: Record<ITask['status'], string> = {
  [TaskStatus.TODO]: 'To Do',
  [TaskStatus.IN_PROGRESS]: 'In Progress',
  [TaskStatus.COMPLETED]: 'Completed',
  [TaskStatus.CANCELED]: 'Canceled',
};

export const taskPriorityLabels: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: 'Low',
  [TaskPriority.MEDIUM]: 'Medium',
  [TaskPriority.HIGH]: 'High',
};
