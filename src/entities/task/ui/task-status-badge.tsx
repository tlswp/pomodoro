import type { FC } from 'react';

import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';

import { taskStatusLabels } from '../config';
import { taskStatusColors } from '../config/colors';
import type { ITask } from '../model';

interface ITaskStatusBadgeProps {
  status: ITask['status'];
}

const TaskStatusBadge: FC<ITaskStatusBadgeProps> = ({ status }) => {
  if (!status) return null;
  return (
    <Badge
      variant="outline"
      className={cn(taskStatusColors[status], 'text-nowrap')}
    >
      {taskStatusLabels[status]}
    </Badge>
  );
};

export { TaskStatusBadge };
