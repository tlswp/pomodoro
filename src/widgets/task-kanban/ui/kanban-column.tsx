import { CollisionPriority } from '@dnd-kit/abstract';
import { useDroppable } from '@dnd-kit/react';
import React, { useMemo } from 'react';

import type { ITask, TaskStatus } from '@/entities/task';
import { TaskStatusBadge, useTaskStore } from '@/entities/task';
import { Badge } from '@/shared/ui/badge';

import { useKanbanStore } from '../model/use-kanban';
import { KanbanCard } from './kanban-card';

interface KanbanColumnProps {
  status: TaskStatus;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ status }) => {
  const tasks = useTaskStore((s) => s.tasks);

  const order = useKanbanStore((s) => s.order);
  const columnIds = useMemo(() => order[status] || [], [order, status]);
  const filtered = useMemo(() => tasks.filter((task) => task.status === status), [tasks, status]);

  const linkedTasks = useMemo(() => {
    const linkedTasks: Record<string, ITask> = {};
    tasks.forEach((task) => (linkedTasks[task.id] = task));
    return linkedTasks;
  }, [tasks]);

  const { ref } = useDroppable({
    id: status,
    type: 'column',
    accept: ['item'],
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div ref={ref} className="relative flex w-full min-w-64 flex-col">
      <div className="bg-muted sticky top-0 mb-2 flex items-center justify-between rounded-xl px-2 py-2">
        <TaskStatusBadge status={status} />
        <Badge variant="default">{filtered.length}</Badge>
      </div>

      <div className="bg-muted flex h-full min-h-64 flex-col gap-2 rounded-2xl p-2">
        {columnIds.map((id, index) => (
          <KanbanCard key={id} task={linkedTasks[id]} columnId={status} index={index} />
        ))}
      </div>
    </div>
  );
};
