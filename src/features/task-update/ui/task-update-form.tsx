import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import type { ITask } from '@/entities/task';
import { TaskPriority, TaskPriorityBadge, TaskStatus, TaskStatusBadge, useTaskStore } from '@/entities/task';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';

interface ITaskUpdateFormProps {
  onOpenChange?: (open: boolean) => void;
  disabledValues?: Partial<Record<keyof ITask, boolean>>;
  id: string;
}

const TaskUpdateForm: React.FC<ITaskUpdateFormProps> = ({ onOpenChange, disabledValues = {}, id }) => {
  const updateTask = useTaskStore((state) => state.updateTask);

  const defaultValues = useTaskStore((state) => state.tasks.find((task) => task.id === id));

  const form = useForm<ITask>({
    defaultValues,
  });

  const submitHandler = (data: Partial<ITask> & { id: string; status: TaskStatus }) => {
    onOpenChange?.(false);
    updateTask({
      ...data,
      id,
    });
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="title"
            disabled={disabledValues.title}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    className="placeholder:text-muted-foreground focus:border-b-primary w-full border-b
                      border-transparent bg-transparent text-xl transition-colors outline-none"
                    placeholder="Untitled task"
                    {...field}
                  />
                </FormControl>
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
                {/* <FormLabel>Description</FormLabel> */}
                <FormControl>
                  <Textarea
                    placeholder="Enter task description"
                    autoResize
                    className="focus-visible:border-b-primary resize-none overflow-hidden rounded-none border-b
                      border-transparent px-0 shadow-none focus-visible:ring-0"
                    minRows={1}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid space-y-4 md:grid-cols-2 md:space-y-0 md:space-x-4">
          <FormField
            control={form.control}
            name="status"
            disabled={disabledValues.status}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={field.disabled}>
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
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={field.disabled}>
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
                <PopoverTrigger asChild>
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
                    initialFocus
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
            Update Task
          </Button>
        </div>
      </div>
    </Form>
  );
};

export { TaskUpdateForm };
