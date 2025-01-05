import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';
import React from 'react';

import type { ITask } from '@/entities/task';
import { TaskPriorityBadge, TaskStatus } from '@/entities/task';
import { cn } from '@/shared/lib/utils';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

import { useKanbanStore } from '../model';

interface KanbanCardProps {
  task: ITask;
  columnId: string;
  index: number;
  isOverlay?: boolean;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({
  task,
  columnId,
  index,
  isOverlay = false,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      columnId,
      'sortable.index': index,
    },
  });

  if (isOverlay) {
    return (
      <Card className={cn('w-full cursor-grabbing', 'opacity-90')}>
        <CardHeader>
          <CardTitle>{task.title || 'Untitled task'}</CardTitle>
          {task.description && (
            <CardDescription className="mt-1 line-clamp-2">
              {task.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardFooter>
          {task.deadline && (
            <div className="text-xs text-muted-foreground">
              {format(new Date(task.deadline), 'PPP')}
            </div>
          )}
          {task.priority && (
            <div className="ml-auto">
              <TaskPriorityBadge priority={task.priority} />
            </div>
          )}
        </CardFooter>
      </Card>
    );
  }

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const overdue =
    task.deadline &&
    ![TaskStatus.COMPLETED, TaskStatus.CANCELED].includes(task.status) &&
    new Date(task.deadline).getTime() < Date.now();

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    const store = useKanbanStore.getState();
    store.setOpenTaskId(task.id);
    store.onTaskOpenChange(true);
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleOpenModal}
      className={cn(
        'w-full cursor-grab',
        isDragging && 'cursor-grabbing',
        overdue && 'border-red-500'
      )}
    >
      <CardHeader>
        <CardTitle>{task.title || 'Untitled task'}</CardTitle>
        {task.description && (
          <CardDescription className="mt-1 line-clamp-2">
            {task.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardFooter>
        {task.deadline && (
          <div className="text-xs text-muted-foreground">
            {format(new Date(task.deadline), 'PPP')}
          </div>
        )}
        {task.priority && (
          <div className="ml-auto">
            <TaskPriorityBadge priority={task.priority} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
