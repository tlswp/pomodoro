import { useSortable } from '@dnd-kit/react/sortable';
import { format } from 'date-fns';
import React from 'react';

import type { ITask } from '@/entities/task';
import { TaskPriorityBadge } from '@/entities/task';
import { cn } from '@/shared/lib/utils';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';

import { useKanbanStore } from '../model';

interface KanbanCardProps {
  task: ITask;
  columnId: string;
  index: number;
  isOverlay?: boolean;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ task, columnId, index, isOverlay = false }) => {
  const { ref } = useSortable({
    id: task.id,
    index,
    group: columnId,
    type: 'item',
    accept: ['item'],
    feedback: 'clone',
  });

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    const store = useKanbanStore.getState();
    store.setOpenTaskId(task.id);
    store.onTaskOpenChange(true);
  };

  return (
    <Card ref={ref} onClick={handleOpenModal} className={cn('w-full cursor-grab aria-hidden:opacity-50')}>
      <CardHeader>
        <CardTitle>{task.title || 'Untitled task'}</CardTitle>
        {task.description && <CardDescription className="mt-1 line-clamp-2">{task.description}</CardDescription>}
      </CardHeader>
      <CardFooter>
        {task.deadline && <div className="text-muted-foreground text-xs">{format(new Date(task.deadline), 'PPP')}</div>}
        {task.priority && (
          <div className="ml-auto">
            <TaskPriorityBadge priority={task.priority} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
