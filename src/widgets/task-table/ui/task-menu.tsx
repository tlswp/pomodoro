import { MoreHorizontal } from 'lucide-react';

import type { ITask } from '@/entities/task';
import { useTaskStore } from '@/entities/task';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

const TaskMenu: React.FC<{ task: ITask }> = ({ task }) => {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  return (
    <DropdownMenu>
      <div className="flex w-full justify-end">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="ml-auto h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(task.id)}
        >
          Copy task ID
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteTask(task.id)}>
          Delete task
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>View task details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskMenu;
