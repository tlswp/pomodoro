import { PlusIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog';

import { TaskCreateForm } from './task-create-form';

const AddTask = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <TaskCreateForm onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export { AddTask };
