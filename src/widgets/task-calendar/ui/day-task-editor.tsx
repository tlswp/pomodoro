import { format } from 'date-fns';
import React from 'react';

import { type ITask, TaskPriorityBadge, TaskStatusBadge } from '@/entities/task';
import { AddTask } from '@/features/task-create';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';

interface DayTasksEditorProps {
  /**
   * Day key in format 'yyyy-MM-dd'
   */
  dayKey: string | null;
  /**
   * Array of tasks for the selected day
   */
  dayTasks: ITask[];
  /**
   * Callback to close the parent dialog
   */
  onClose: () => void;
  onOpenUpdate: (taskId: string) => void;
}

/**
 * Displays tasks for a specific day.
 */
export const DayTasksEditor: React.FC<DayTasksEditorProps> = ({ dayKey, dayTasks, onClose, onOpenUpdate }) => {
  if (!dayKey) {
    return (
      <div className="space-y-4">
        <p className="text-sm">No day selected.</p>
        <Button variant="default" onClick={onClose}>
          Close
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {dayTasks.length === 0 && (
        <div className="my-10 flex flex-col items-center justify-center space-y-4">
          <p className="text-center text-sm">No tasks for this day.</p>
          <AddTask disabledValues={{ deadline: true }} defaultValues={{ deadline: new Date(dayKey).toISOString() }} />
        </div>
      )}

      {dayTasks.map((task) => (
        <Card onClick={() => onOpenUpdate(task.id)} className={cn('w-full cursor-pointer')}>
          <CardHeader>
            <CardTitle>{task.title || 'Untitled task'}</CardTitle>
            {task.description && <CardDescription className="mt-1 line-clamp-2">{task.description}</CardDescription>}
          </CardHeader>
          <CardFooter>
            {task.deadline && (
              <div className="text-muted-foreground text-xs">{format(new Date(task.deadline), 'PPP')}</div>
            )}
            {task.priority && (
              <div className="ml-auto">
                <TaskPriorityBadge priority={task.priority} />
              </div>
            )}
            {task.status && (
              <div className="ml-2">
                <TaskStatusBadge status={task.status} />
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
      {dayTasks.length !== 0 && (
        <div className="flex justify-end">
          <AddTask disabledValues={{ deadline: true }} defaultValues={{ deadline: new Date(dayKey).toISOString() }} />
        </div>
      )}
    </div>
  );
};
