import { PlusIcon } from 'lucide-react';
import React from 'react';

import type { ITask } from '@/entities/task';
import type { ButtonProps } from '@/shared/ui/button';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';

import { TaskCreateForm } from './task-create-form';

interface IAddTaskProps {
  defaultValues?: Partial<ITask>;
  disabledValues?: Partial<Record<keyof ITask, boolean>>;
  variant?: ButtonProps['variant'];
}

const AddTask: React.FC<IAddTaskProps> = ({
  defaultValues,
  disabledValues,
  variant = 'outline',
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant}>
          <PlusIcon /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Task Creation Form</DialogTitle>
        <TaskCreateForm
          defaultValues={defaultValues}
          disabledValues={disabledValues}
          onOpenChange={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export { AddTask };
