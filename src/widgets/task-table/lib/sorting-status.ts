import type { Row } from '@tanstack/react-table';

import type { ITask } from '@/entities/task';
import { TaskStatus } from '@/entities/task';

export const sortingStatus = (
  rowA: Row<ITask>,
  rowB: Row<ITask>,
  columnId: string
) => {
  const a = rowA.getValue(columnId) as ITask['status'];
  const b = rowB.getValue(columnId) as ITask['status'];
  let aNumber = 0;
  let bNumber = 0;

  switch (a) {
    case TaskStatus.TODO:
      aNumber = 1;
      break;
    case TaskStatus.IN_PROGRESS:
      aNumber = 2;
      break;
    case TaskStatus.COMPLETED:
      aNumber = 3;
      break;
    case TaskStatus.CANCELED:
      aNumber = 4;
      break;
    default:
      aNumber = 5;
  }

  switch (b) {
    case TaskStatus.TODO:
      bNumber = 1;
      break;
    case TaskStatus.IN_PROGRESS:
      bNumber = 2;
      break;
    case TaskStatus.COMPLETED:
      bNumber = 3;
      break;
    case TaskStatus.CANCELED:
      bNumber = 4;
      break;
    default:
      bNumber = 5;
  }

  return aNumber - bNumber;
};
