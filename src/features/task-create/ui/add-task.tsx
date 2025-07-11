import { PlusIcon } from 'lucide-react';
import React from 'react';

import type { ITask } from '@/entities/task';
import type { ButtonProps } from '@/shared/ui/button';
import { Button } from '@/shared/ui/button';
import { Credenza, CredenzaContent, CredenzaTitle, CredenzaTrigger } from '@/shared/ui/credenza';

import { TaskCreateForm } from './task-create-form';

interface IAddTaskProps {
  defaultValues?: Partial<ITask>;
  disabledValues?: Partial<Record<keyof ITask, boolean>>;
  variant?: ButtonProps['variant'];
}

const AddTask: React.FC<IAddTaskProps> = ({ defaultValues, disabledValues, variant = 'outline' }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button variant={variant}>
          <PlusIcon /> Add Task
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="max-h-[95%] p-0">
        <div className="overflow-y-auto p-6">
          <CredenzaTitle>Task Creation Form</CredenzaTitle>
          <TaskCreateForm defaultValues={defaultValues} disabledValues={disabledValues} onOpenChange={setOpen} />
        </div>
      </CredenzaContent>
    </Credenza>
  );
};

export { AddTask };
