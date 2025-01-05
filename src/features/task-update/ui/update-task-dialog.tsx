import React from 'react';

import type { ITask } from '@/entities/task';
import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog';

import { TaskUpdateForm } from './task-update-form';

interface IUpdateTaskProps {
  id: string;
  disabledValues?: Partial<Record<keyof ITask, boolean>>;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

const UpdateTaskDialog: React.FC<IUpdateTaskProps> = ({
  id,
  disabledValues,
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogTitle className="sr-only">Task Edit Form</DialogTitle>
        <TaskUpdateForm
          id={id}
          disabledValues={disabledValues}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export { UpdateTaskDialog };
