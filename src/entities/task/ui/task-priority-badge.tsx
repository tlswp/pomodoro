import type { FC } from 'react';

import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';

import { taskPriorityLabels } from '../config';
import { taskPriorityColors } from '../config/colors';
import type { ITask } from '../model';

interface ITaskPriorityBadgeProps {
  priority: ITask['priority'];
}

const TaskPriorityBadge: FC<ITaskPriorityBadgeProps> = ({ priority }) => {
  if (!priority) return null;
  return (
    <Badge
      variant="outline"
      className={cn(taskPriorityColors[priority], 'text-nowrap')}
    >
      {taskPriorityLabels[priority]}
    </Badge>
  );
};

export { TaskPriorityBadge };
