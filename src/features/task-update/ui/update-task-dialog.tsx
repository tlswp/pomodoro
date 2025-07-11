import React from 'react';

import type { ITask } from '@/entities/task';
import { Credenza, CredenzaContent, CredenzaTitle } from '@/shared/ui/credenza';

import { TaskUpdateForm } from './task-update-form';

interface IUpdateTaskProps {
  id: string;
  disabledValues?: Partial<Record<keyof ITask, boolean>>;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

const UpdateTaskDialog: React.FC<IUpdateTaskProps> = ({ id, disabledValues, open, onOpenChange }) => {
  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaContent className="max-h-[95%] max-w-2xl p-0">
        <div className="overflow-y-auto p-6">
          <CredenzaTitle className="sr-only">Task Edit Form</CredenzaTitle>
          <TaskUpdateForm id={id} disabledValues={disabledValues} onOpenChange={onOpenChange} />
        </div>
      </CredenzaContent>
    </Credenza>
  );
};

export { UpdateTaskDialog };
