import { faker } from '@faker-js/faker';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { type ITask, TaskPriority, TaskStatus, useTaskStore } from '@/entities/task';

import { columns } from './columns';
import { DataTable } from './data-table';

export function generateTasks(count: number): ITask[] {
  const tasks: ITask[] = [];
  faker.seed(0);

  for (let i = 0; i < count; i++) {
    const now = faker.date.recent().toISOString();
    tasks.push({
      id: uuidv4(),
      title: faker.lorem.words(3),
      description: faker.lorem.sentences(2),
      status: faker.helpers.arrayElement(Object.values(TaskStatus)),
      priority: faker.helpers.arrayElement(Object.values(TaskPriority)),
      tags: Array.from({ length: faker.number.int({ min: 1, max: 50 }) }, () => faker.lorem.word()),
      deadline: faker.date.future().toISOString(),
      createdAt: now,
      updatedAt: now,
    });
  }

  return tasks;
}

// const data = generateTasks(500);

const TaskTable = () => {
  const { tasks, updateTask } = useTaskStore();

  const updateData = useCallback(
    (rowIndex: number, columnId: string, value: unknown) => {
      const task = tasks[rowIndex];
      updateTask({
        ...task,
        [columnId]: value,
        updatedAt: new Date().toISOString(),
        completedAt:
          columnId === 'status' && value === TaskStatus.COMPLETED && task.completedAt !== TaskStatus.COMPLETED
            ? new Date().toISOString()
            : task.completedAt,
        canceledAt:
          columnId === 'status' && value === TaskStatus.CANCELED && task.canceledAt !== TaskStatus.CANCELED
            ? new Date().toISOString()
            : task.canceledAt,
      });
    },
    [tasks, updateTask]
  );

  return <DataTable updateData={updateData} columns={columns} data={tasks} />;
};

export { TaskTable };
