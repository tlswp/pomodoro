export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface ITask {
  id: string;
  title?: string;
  description?: string;
  status: TaskStatus;
  priority?: TaskPriority;
  tags?: string[];
  deadline?: string;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
  canceledAt?: string;
}
