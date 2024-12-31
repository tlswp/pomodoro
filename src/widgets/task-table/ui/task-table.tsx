import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

import { type ITask, TaskPriority, TaskStatus } from '@/entities/task';

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
      tags: Array.from({ length: faker.number.int({ min: 1, max: 50 }) }, () =>
        faker.lorem.word()
      ),
      deadline: faker.date.future().toISOString(),
      createdAt: now,
      updatedAt: now,
    });
  }

  return tasks;
}

const data = generateTasks(25);

const TaskTable = () => {
  return <DataTable columns={columns} data={data} />;
};

export { TaskTable };
