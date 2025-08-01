import { PlusIcon } from 'lucide-react';
import React from 'react';

import type { ITask } from '@/entities/task';
import type { ButtonVariants } from '@/shared/ui/button';
import { Button } from '@/shared/ui/button';
import { Credenza, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '@/shared/ui/credenza';
import { ScrollArea } from '@/shared/ui/scroll-area';

import { TaskCreateForm } from './task-create-form';

interface IAddTaskProps {
  defaultValues?: Partial<ITask>;
  disabledValues?: Partial<Record<keyof ITask, boolean>>;
  variant?: ButtonVariants['variant'];
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
      <CredenzaContent className="flex max-h-[95%] flex-col p-0">
        <CredenzaHeader>
          <CredenzaTitle className="m-6 mb-0">Task Creation Form</CredenzaTitle>
        </CredenzaHeader>
        <div className="overflow-auto p-6 pt-0">
          <TaskCreateForm defaultValues={defaultValues} disabledValues={disabledValues} onOpenChange={setOpen} />
        </div>
      </CredenzaContent>
    </Credenza>
  );
};

export { AddTask };
