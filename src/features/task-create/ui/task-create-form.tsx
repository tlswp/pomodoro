import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import type { ITask } from '@/entities/task';
import { TaskPriority, TaskPriorityBadge, TaskStatus, TaskStatusBadge, useTaskStore } from '@/entities/task';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';

interface ITaskCreateFormProps {
  onOpenChange?: (open: boolean) => void;
  defaultValues?: Partial<ITask>;
  disabledValues?: Partial<Record<keyof ITask, boolean>>;
}

const TaskCreateForm: React.FC<ITaskCreateFormProps> = ({
  onOpenChange,
  defaultValues = {
    title: '',
    description: '',
    status: TaskStatus.TODO,
  },
  disabledValues = {},
}) => {
  const addTask = useTaskStore((state) => state.addTask);

  const form = useForm<ITask>({
    defaultValues: {
      title: '',
      description: '',
      status: TaskStatus.TODO,
      ...defaultValues,
    },
  });

  const submitHandler = (data: Partial<ITask> & { id: string; status: TaskStatus }) => {
    onOpenChange?.(false);
    addTask({
      ...data,
      createdAt: new Date().toISOString(),
      id: v4(),
    });
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          disabled={disabledValues.title}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter task title" {...field} />
              </FormControl>
              <FormDescription>Short and descriptive title</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          disabled={disabledValues.description}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter task description" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>More detailed description of the task</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid space-y-4 md:grid-cols-2 md:space-y-0 md:space-x-4">
          <FormField
            control={form.control}
            name="status"
            disabled={disabledValues.status}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select disabled={disabledValues.status} onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(TaskStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        <TaskStatusBadge status={status} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select the status of the task</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            disabled={disabledValues.priority}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select disabled={disabledValues.priority} onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(TaskPriority).map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        <TaskPriorityBadge priority={priority} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select the priority of the task</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Deadline</FormLabel>
              <Popover>
                <PopoverTrigger>
                  <FormControl>
                    <Button
                      disabled={disabledValues.deadline}
                      variant={'outline'}
                      className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                    >
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    disabled={disabledValues.deadline}
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date ? date.toISOString() : null)}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Select the deadline of the task</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button className="ml-auto" type="submit" onClick={form.handleSubmit(submitHandler)}>
            Add Task
          </Button>
        </div>
      </div>
    </Form>
  );
};

export { TaskCreateForm };
