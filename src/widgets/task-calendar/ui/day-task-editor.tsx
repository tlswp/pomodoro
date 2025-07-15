import React from 'react';

import type { ITask } from '@/entities/task';
import { AddTask } from '@/features/task-create';
import { Button } from '@/shared/ui/button';

import { TaskItemEditor } from './task-item-editor';

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
}

/**
 * Displays tasks for a specific day.
 */
export const DayTasksEditor: React.FC<DayTasksEditorProps> = ({ dayKey, dayTasks, onClose }) => {
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
        <TaskItemEditor key={task.id} task={task} />
      ))}
      {dayTasks.length !== 0 && (
        <div className="flex justify-end">
          <AddTask disabledValues={{ deadline: true }} defaultValues={{ deadline: new Date(dayKey).toISOString() }} />
        </div>
      )}
    </div>
  );
};
