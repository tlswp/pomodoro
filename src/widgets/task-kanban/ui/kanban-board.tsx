import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import React, { useEffect, useState } from 'react';

import type { ITask } from '@/entities/task';
import { TaskStatus } from '@/entities/task';
import { useTaskStore } from '@/entities/task';
import { UpdateTaskDialog } from '@/features/task-update';

import { useSensorsSetup } from '../model';
import { useKanbanStore } from '../model/use-kanban';
import { KanbanCard } from './kanban-card';
import { KanbanColumn } from './kanban-column';

const columns = [
  { id: TaskStatus.TODO, title: 'To Do' },
  { id: TaskStatus.IN_PROGRESS, title: 'In Progress' },
  { id: TaskStatus.COMPLETED, title: 'Completed' },
  { id: TaskStatus.CANCELED, title: 'Canceled' },
];

export const KanbanBoard: React.FC = () => {
  const setInitialOrder = useKanbanStore((s) => s.setInitialOrder);
  const moveTaskInSameColumn = useKanbanStore((s) => s.moveTaskInSameColumn);
  const moveTaskToAnotherColumn = useKanbanStore(
    (s) => s.moveTaskToAnotherColumn
  );
  const { openTaskId, taskOpen, onTaskOpenChange } = useKanbanStore();
  const updateTask = useTaskStore((s) => s.updateTask);

  const [activeTask, setActiveTask] = useState<ITask | null>(null);

  const tasks = useTaskStore((s) => s.tasks);

  useEffect(() => {
    setInitialOrder(columns.map((c) => c.id));
  }, [setInitialOrder]);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const activeId = active.id.toString();
    const foundTask = tasks.find((t) => t.id === activeId) || null;
    setActiveTask(foundTask);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeId = active.id.toString();
    const overId = over.id.toString();
    if (activeId === overId) {
      setActiveTask(null);
      return;
    }

    const activeColumn = active.data.current?.columnId as string;
    const activeIndex = active.data.current?.sortable.index as number;

    const overColumn = over.data.current?.columnId as string;
    let overIndex = over.data.current?.sortable.index as number;

    if (!overColumn) {
      overIndex = 9999;
    }

    if (!activeColumn || !overColumn) {
      setActiveTask(null);
      return;
    }

    if (activeColumn === overColumn) {
      moveTaskInSameColumn(activeColumn, activeIndex, overIndex);
    } else {
      moveTaskToAnotherColumn(
        activeColumn,
        overColumn,
        activeIndex,
        overIndex,
        activeId
      );
      updateTask({ id: activeId, status: overColumn as TaskStatus });
    }
    setActiveTask(null);
  }

  function handleDragCancel() {
    setActiveTask(null);
  }

  const sensors = useSensorsSetup();

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      sensors={sensors}
    >
      <UpdateTaskDialog
        open={!!(taskOpen && !!openTaskId)}
        onOpenChange={onTaskOpenChange}
        id={openTaskId || ''}
      />
      <div className="flex gap-4 overflow-x-auto p-4">
        {columns.map((col) => (
          <KanbanColumn key={col.id} status={col.id} />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <KanbanCard
            task={activeTask}
            columnId={activeTask.status}
            index={0}
            isOverlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
