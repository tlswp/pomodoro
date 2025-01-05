import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React, { useEffect, useMemo } from 'react';

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
  const updateOrder = useKanbanStore((s) => s.updateOrder);
  const columnIds = useMemo(() => order[status] || [], [order, status]);

  const columnTasks = useMemo<ITask[]>(() => {
    const filtered = tasks.filter((t) => t.status === status);
    const mapTask = new Map<string, ITask>();
    filtered.forEach((task) => mapTask.set(task.id, task));

    const result: ITask[] = [];
    columnIds.forEach((id) => {
      const found = mapTask.get(id);
      if (found) {
        result.push(found);
        mapTask.delete(id);
      }
    });

    const leftovers = [...mapTask.values()];

    return [...result, ...leftovers];
  }, [tasks, status, columnIds]);

  useEffect(() => {
    if (
      JSON.stringify(columnTasks.map((t) => t.id)) !==
      JSON.stringify(order[status])
    ) {
      updateOrder(
        status,
        columnTasks.map((t) => t.id)
      );
    }
  }, [order, columnTasks, updateOrder, status]);

  return (
    <SortableContext
      items={columnTasks.map((t) => t.id)}
      strategy={verticalListSortingStrategy}
    >
      <div className="relative flex w-full min-w-64 flex-col">
        <div
          className="sticky top-0 mb-2 flex items-center justify-between
            rounded-xl bg-muted px-2 py-2"
        >
          <TaskStatusBadge status={status} />
          <Badge variant="default">{columnTasks.length}</Badge>
        </div>

        <div className="flex flex-col gap-2 rounded-2xl bg-muted p-2">
          {columnTasks.map((task, index) => (
            <KanbanCard
              key={task.id}
              task={task}
              columnId={status}
              index={index}
            />
          ))}
        </div>
      </div>
    </SortableContext>
  );
};
