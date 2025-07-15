import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { ITask } from '@/entities/task';
import { TaskPriority, TaskStatus } from '@/entities/task';
import { TaskPriorityBadge, TaskStatusBadge, useTaskStore } from '@/entities/task';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';

interface TaskItemEditorProps {
  task: ITask;
}

/**
 * Renders a single task with the ability to edit or delete it.
 * Uses its own react-hook-form instance.
 */
export const TaskItemEditor: React.FC<TaskItemEditorProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);

  // Local form initialization for this specific task
  const form = useForm<ITask>({
    defaultValues: task,
  });

  // Submit form => update the task
  const onSubmit = (data: ITask) => {
    updateTask({
      ...data,
      id: task.id,
    });
    setIsEditing(false);
  };

  const onDelete = () => {
    setIsEditing(false);
    deleteTask(task.id);
  };

  if (!isEditing) {
    // View mode
    return (
      <Card onClick={() => setIsEditing(true)} className={cn('w-full cursor-pointer')}>
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
    );
  }

  // Edit mode
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded border p-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter task description" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid space-y-4 md:grid-cols-2 md:space-y-0 md:space-x-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(TaskStatus).map((st) => (
                      <SelectItem key={st} value={st}>
                        <TaskStatusBadge status={st} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(TaskPriority).map((pr) => (
                      <SelectItem key={pr} value={pr}>
                        <TaskPriorityBadge priority={pr} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                      variant="outline"
                      className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                    >
                      {field.value ? (
                        typeof field.value === 'string' ? (
                          format(new Date(field.value), 'PPP')
                        ) : (
                          format(field.value, 'PPP')
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value as string) : undefined}
                    onSelect={(date) => field.onChange(date?.toISOString())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end space-x-2">
          <Button
            className="border-destructive text-destructive hover:text-destructive/90 mr-auto"
            variant="outline"
            onClick={onDelete}
          >
            Delete
          </Button>
          <Button type="submit">Save</Button>
          <Button variant="ghost" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
