import { move } from '@dnd-kit/helpers';
import { DragDropProvider, KeyboardSensor, PointerSensor } from '@dnd-kit/react';
import React, { useEffect, useMemo } from 'react';

import type { ITask } from '@/entities/task';
import type { TaskStatus } from '@/entities/task';
import { useTaskStore } from '@/entities/task';
import { UpdateTaskDialog } from '@/features/task-update';

import { useKanbanStore } from '../model/use-kanban';
import { KanbanColumn } from './kanban-column';
import { columns } from './kanban-constants';

export const KanbanBoard: React.FC = () => {
  const { openTaskId, order, taskOpen, onTaskOpenChange, setOrder } = useKanbanStore();
  const updateTask = useTaskStore((s) => s.updateTask);

  const tasks = useTaskStore((s) => s.tasks);

  const linkedTasks = useMemo(() => {
    const linkedTask: Record<string, ITask> = {};
    tasks.forEach((task) => {
      linkedTask[task.id] = task;
    });
    return linkedTask;
  }, [tasks]);

  useEffect(() => {
    const orderEntries = Object.entries(order);
    const orderedIds: Record<string, Set<string>> = {};
    columns.forEach(({ id }) => {
      if (!orderedIds[id]) orderedIds[id] = new Set();
    });

    if (orderEntries.length) {
      orderEntries.forEach(([status, ids]) => {
        ids.forEach((id) => linkedTasks[id] && orderedIds[status].add(id));
      });
    }
    tasks.forEach((task) => {
      orderedIds[task.status].add(task.id);
    });

    const newOrder: Record<TaskStatus, string[]> = {} as Record<TaskStatus, string[]>;

    for (let { id } of columns) {
      newOrder[id] = Array.from(orderedIds[id]);
    }
    setOrder(newOrder);
  }, []);

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setOrder((items) => move(items, event));

        const { source, target } = event.operation;
        if (source && target) {
          if ((target.id as TaskStatus) in order) {
            updateTask({ id: source.id as string, status: target.id as TaskStatus });
          } else if (
            target.id in linkedTasks &&
            source.id in linkedTasks &&
            target.id !== source.id &&
            linkedTasks[target.id].status !== linkedTasks[source.id].status
          ) {
            updateTask({ id: source.id as string, status: linkedTasks[target.id].status });
          }
        }
      }}
      sensors={[KeyboardSensor, PointerSensor]}
    >
      <UpdateTaskDialog open={!!(taskOpen && !!openTaskId)} onOpenChange={onTaskOpenChange} id={openTaskId || ''} />
      <div className="flex justify-stretch gap-4 overflow-x-auto py-4">
        {columns.map((col) => (
          <KanbanColumn key={col.id} status={col.id} />
        ))}
      </div>
    </DragDropProvider>
  );
};
