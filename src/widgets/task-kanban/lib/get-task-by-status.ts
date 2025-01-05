import type { ITask } from '@/entities/task';
import { TaskStatus } from '@/entities/task';

interface GetTasksByStatusParams {
  tasks: ITask[];
  status: TaskStatus;
  hideCompletedAfterDays?: number;
}

/**
 * Returns an array of tasks that match the given status,
 * optionally filtering out old COMPLETED/CANCELED tasks (older than X days).
 */
export function getTasksByStatus(params: GetTasksByStatusParams): ITask[] {
  const { tasks, status, hideCompletedAfterDays } = params;
  const now = new Date().getTime();

  return tasks.filter((task) => {
    // filter by status
    if (task.status !== status) {
      return false;
    }

    // if hideCompletedAfterDays is set, and task is COMPLETED/CANCELED older than X days => hide
    if (hideCompletedAfterDays != null) {
      if (
        (status === TaskStatus.COMPLETED || status === TaskStatus.CANCELED) &&
        task.updatedAt // or completedAt/canceledAt
      ) {
        const updatedAtTime = new Date(task.updatedAt).getTime();
        const diffDays = (now - updatedAtTime) / (1000 * 60 * 60 * 24);
        if (diffDays > hideCompletedAfterDays) {
          return false;
        }
      }
    }

    return true;
  });
}
