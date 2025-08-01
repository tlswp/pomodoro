import type { Row } from '@tanstack/react-table';

import type { ITask } from '@/entities/task';
import { TaskPriority } from '@/entities/task';

export const sortingPriority = (rowA: Row<ITask>, rowB: Row<ITask>, columnId: string) => {
  const a = rowA.getValue(columnId) as ITask['priority'];
  const b = rowB.getValue(columnId) as ITask['priority'];
  let aNumber = 0;
  let bNumber = 0;

  switch (a) {
    case TaskPriority.LOW:
      aNumber = 1;
      break;
    case TaskPriority.MEDIUM:
      aNumber = 2;
      break;
    case TaskPriority.HIGH:
      aNumber = 3;
      break;
    default:
      aNumber = 4;
  }

  switch (b) {
    case TaskPriority.LOW:
      bNumber = 1;
      break;
    case TaskPriority.MEDIUM:
      bNumber = 2;
      break;
    case TaskPriority.HIGH:
      bNumber = 3;
      break;
    default:
      bNumber = 4;
  }

  return aNumber - bNumber;
};
