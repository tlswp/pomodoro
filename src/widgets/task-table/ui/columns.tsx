import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import {
  type ITask,
  taskLabels,
  TaskPriority,
  TaskPriorityBadge,
  TaskStatus,
  TaskStatusBadge,
} from '@/entities/task';
import { Badge } from '@/shared/ui/badge';
import { Checkbox } from '@/shared/ui/checkbox';
import { DataTableColumnHeader } from '@/shared/ui/data-table-header';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/shared/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shared/ui/hover-card';

import { sortingPriority, sortingStatus } from '../lib';
import TaskMenu from './task-menu';

export const columns: ColumnDef<ITask>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="w-6">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={taskLabels.title} />
    ),
    cell: ({ row }) => {
      const title = row.getValue('title') as string;
      return <div className="line-clamp-2">{title}</div>;
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={taskLabels.description} />
    ),
    cell: ({ row }) => {
      const description = row.getValue('description') as string;
      return <div className="line-clamp-2">{description}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      const filter = (column.getFilterValue() as Set<TaskStatus>) || new Set();
      return (
        <DataTableColumnHeader column={column} title={taskLabels.status}>
          <DropdownMenuSeparator />
          {Object.values(TaskStatus).map((status) => (
            <DropdownMenuItem
              key={status}
              onClick={() => {
                if (filter.has(status)) {
                  filter.delete(status);
                } else {
                  filter.add(status);
                }
                column.setFilterValue(new Set(filter));
              }}
            >
              <Checkbox checked={filter.has(status)} />
              <TaskStatusBadge key={status} status={status} />
            </DropdownMenuItem>
          ))}
        </DataTableColumnHeader>
      );
    },
    filterFn: (row, id, value) => {
      if (!value) return true;
      if (value.size === 0) return true;
      return value.has(row.getValue(id) as ITask['status']);
    },
    sortingFn: sortingStatus,
    cell: ({ row }) => {
      const status = row.getValue('status') as ITask['status'];
      return <TaskStatusBadge status={status} />;
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => {
      const filter =
        (column.getFilterValue() as Set<TaskPriority>) || new Set();
      return (
        <DataTableColumnHeader column={column} title={taskLabels.priority}>
          <DropdownMenuSeparator />
          {Object.values(TaskPriority).map((priority) => (
            <DropdownMenuItem
              key={priority}
              onClick={() => {
                if (filter.has(priority)) {
                  filter.delete(priority);
                } else {
                  filter.add(priority);
                }
                column.setFilterValue(new Set(filter));
              }}
            >
              <Checkbox checked={filter.has(priority)} />
              <TaskPriorityBadge key={priority} priority={priority} />
            </DropdownMenuItem>
          ))}
        </DataTableColumnHeader>
      );
    },
    filterFn: (row, id, value) => {
      if (!value) return true;
      if (value.size === 0) return true;
      return value.has(row.getValue(id) as ITask['priority']);
    },
    sortingFn: sortingPriority,
    cell: ({ row }) => {
      const priority = row.getValue('priority') as ITask['priority'];
      return <TaskPriorityBadge priority={priority} />;
    },
  },
  {
    accessorKey: 'tags',
    header: taskLabels.tags,
    cell: ({ row }) => {
      const tags = row.getValue('tags') as string[];
      if (!tags || tags.length === 0) {
        return null;
      }
      return (
        <div className="flex gap-2">
          {tags.slice(0, 2).map((tag) => (
            <Badge variant="secondary" key={tag}>
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
            <HoverCard>
              <HoverCardTrigger>
                <Badge className="cursor-default" variant="secondary">
                  +{tags.length - 2}
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent className="max-w-fit">
                <div className="flex w-full flex-wrap gap-1">
                  {tags.slice(2).map((tag) => (
                    <Badge className="w-fit" variant="secondary" key={tag}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={taskLabels.createdAt} />
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt') as string;
      return (
        <div className="text-nowrap">
          {createdAt && format(new Date(createdAt), 'yyyy-MM-dd')}
        </div>
      );
    },
  },
  {
    accessorKey: 'deadline',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={taskLabels.deadline} />
    ),
    cell: ({ row }) => {
      const deadline = row.getValue('deadline') as string;
      return (
        <div className="text-nowrap">
          {deadline && format(deadline, 'yyyy-MM-dd')}
        </div>
      );
    },
  },
  {
    size: 100,
    maxSize: 100,
    accessorKey: 'settings',
    header: () => <div className="text-end">Settings</div>,
    cell: ({ row }) => {
      return <TaskMenu task={row.original} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
];
