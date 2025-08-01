import { addDays, format, isBefore, isWithinInterval, parseISO, startOfToday } from 'date-fns';
import React, { useMemo } from 'react';

import type { ITask } from '@/entities/task';
import { useTaskStore } from '@/entities/task';
import { TaskPriority, TaskStatus } from '@/entities/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';

interface ITaskBentoWidgetProps {
  right?: React.ReactNode;
}

export const TasksBentoWidget: React.FC<ITaskBentoWidgetProps> = ({ right }) => {
  const tasks = useTaskStore((state) => state.tasks);

  const today = startOfToday();
  const oneWeekFromNow = addDays(today, 7);

  // 1. Today
  const tasksTodayCount = useMemo(() => {
    return tasks.filter((task) => {
      if (!task.deadline) return false;
      const deadline = parseISO(task.deadline);
      const sameDay =
        deadline.getFullYear() === today.getFullYear() &&
        deadline.getMonth() === today.getMonth() &&
        deadline.getDate() === today.getDate();
      return sameDay && task.status !== TaskStatus.CANCELED;
    }).length;
  }, [tasks, today]);

  // 2. Next 7 Days
  const tasksWeekCount = useMemo(() => {
    return tasks.filter((task) => {
      if (!task.deadline) return false;
      const deadline = parseISO(task.deadline);
      return isWithinInterval(deadline, { start: today, end: oneWeekFromNow }) && task.status !== TaskStatus.CANCELED;
    }).length;
  }, [tasks, today, oneWeekFromNow]);

  // 3. Overdue (deadline < today, not completed/canceled)
  const overdueCount = useMemo(() => {
    return tasks.filter((task) => {
      if (!task.deadline) return false;
      const deadline = parseISO(task.deadline);
      return isBefore(deadline, today) && task.status !== TaskStatus.COMPLETED && task.status !== TaskStatus.CANCELED;
    }).length;
  }, [tasks, today]);

  // 4. No Deadline
  const noDeadlineCount = useMemo(() => {
    return tasks.filter((t) => !t.deadline).length;
  }, [tasks]);

  // 5. Next due task
  const nextDueTask = useMemo<ITask | null>(() => {
    const active = tasks.filter(
      (task) => task.deadline && task.status !== TaskStatus.COMPLETED && task.status !== TaskStatus.CANCELED
    );
    if (active.length === 0) return null;
    const sorted = [...active].sort((a, b) => {
      const da = parseISO(a.deadline!);
      const db = parseISO(b.deadline!);
      return da.getTime() - db.getTime();
    });
    return sorted[0] || null;
  }, [tasks]);

  // 6. Completed Today
  const completedTodayCount = useMemo(() => {
    return tasks.filter((t) => {
      if (t.status !== TaskStatus.COMPLETED || !t.completedAt) return false;
      const completedDate = parseISO(t.completedAt);
      return (
        completedDate.getFullYear() === today.getFullYear() &&
        completedDate.getMonth() === today.getMonth() &&
        completedDate.getDate() === today.getDate()
      );
    }).length;
  }, [tasks, today]);

  // 7. Progress
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.status === TaskStatus.COMPLETED).length;
  const progressPercentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // 8. High Priority
  const highPriorityCount = useMemo(() => {
    return tasks.filter((t) => t.priority === TaskPriority.HIGH && t.status !== TaskStatus.CANCELED).length;
  }, [tasks]);

  // 9. In Progress
  const inProgressCount = useMemo(() => {
    return tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length;
  }, [tasks]);

  // 10. Canceled
  const canceledCount = useMemo(() => {
    return tasks.filter((t) => t.status === TaskStatus.CANCELED).length;
  }, [tasks]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h3 className="text-3xl leading-none font-semibold tracking-tight">Tasks Info</h3>
        {right}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Row 1 */}
        <Card>
          <CardHeader>
            <CardTitle>Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{tasksTodayCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next 7 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{tasksWeekCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{overdueCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>No Deadline</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{noDeadlineCount}</p>
          </CardContent>
        </Card>

        {/* Row 2 */}
        <Card className="md:col-span-2 xl:col-span-2">
          <CardHeader>
            <CardTitle>Next Due</CardTitle>
          </CardHeader>
          <CardContent>
            {nextDueTask ? (
              <div>
                <p className="font-medium">{nextDueTask.title || 'Untitled task'}</p>
                <p className="text-muted-foreground text-sm">Due: {format(parseISO(nextDueTask.deadline!), 'PPP')}</p>
              </div>
            ) : (
              <p>No upcoming tasks.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{completedTodayCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{highPriorityCount}</p>
          </CardContent>
        </Card>

        {/* Row 3 */}
        <Card className="md:col-span-2 xl:col-span-2">
          <CardHeader>
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} />
            <p className="mt-2 text-sm">
              {progressPercentage}% completed ({completedCount}/{totalCount})
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{inProgressCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Canceled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{canceledCount}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
