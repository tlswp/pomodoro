import { format } from 'date-fns';
import React, { useCallback, useMemo, useState } from 'react';

import type { ITask } from '@/entities/task';
import { useTaskStore } from '@/entities/task';
import { TaskStatus } from '@/entities/task';
import { UpdateTaskDialog } from '@/features/task-update';
import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { ScrollArea, ScrollBar } from '@/shared/ui/scroll-area';

import { checkIsToday, isSameYearMonth, parseDeadline } from '../lib/date';
import { useCalendar } from '../model/use-calendar';
import { CalendarHeader } from './calendar-header';
import { DayTasksEditor } from './day-task-editor';

const defaultConsideredStatuses = [TaskStatus.TODO, TaskStatus.IN_PROGRESS];

interface CalendarProps {
  consideredStatuses?: TaskStatus[];
}

export const Calendar: React.FC<CalendarProps> = ({ consideredStatuses = defaultConsideredStatuses }) => {
  const { currentYear, currentMonth, days, goToToday, goToPreviousMonth, goToNextMonth } = useCalendar();

  const tasks = useTaskStore((state) => state.tasks);

  const tasksByDay = useMemo(() => {
    const map = new Map<string, ITask[]>();
    tasks
      .filter((t) => consideredStatuses.includes(t.status))
      .forEach((task) => {
        const deadlineDate = parseDeadline(task.deadline);
        if (!deadlineDate) return;
        const key = format(deadlineDate, 'yyyy-MM-dd');
        const list = map.get(key) || [];
        map.set(key, [...list, task]);
      });
    return map;
  }, [tasks, consideredStatuses]);

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dayTasks = selectedDayKey ? tasksByDay.get(selectedDayKey) || [] : [];

  const closeDialog = useCallback(() => setIsOpen(false), []);
  const openDialog = useCallback((dayKey: string) => {
    setSelectedDayKey(dayKey);
    setIsOpen(true);
  }, []);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [taskUpdateId, setTaskUpdateId] = useState<string>();

  const openTaskUpdate = useCallback((id: string) => {
    setTaskUpdateId(id);
    setIsUpdateOpen(true);
  }, []);

  const daysComponent = useMemo(
    () =>
      days.map((day) => {
        const dayKey = format(day, 'yyyy-MM-dd');
        const isToday = checkIsToday(day);
        const isCurrentMonth = isSameYearMonth(day, currentYear, currentMonth);
        const tasksOfDay = tasksByDay.get(dayKey) || [];
        const count = tasksOfDay.length;

        return (
          <div
            key={dayKey}
            className={cn(
              'relative flex h-20 flex-col items-center justify-center border-r border-b p-1 sm:h-36',
              !isCurrentMonth && 'text-muted-foreground'
            )}
            onClick={() => openDialog(dayKey)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openDialog(dayKey)}
          >
            <div
              className={cn(
                'top-2 right-2 mb-1 flex size-6 items-center justify-center rounded-full text-base sm:absolute',
                isToday && 'bg-primary text-primary-foreground'
              )}
            >
              {format(day, 'd')}
            </div>
            <div className="hidden flex-wrap justify-center gap-1 text-xs sm:flex">
              {tasksOfDay.slice(0, 2).map((task) => (
                <Badge
                  onClick={(e) => {
                    e.stopPropagation();
                    openTaskUpdate(task.id);
                  }}
                  variant="secondary"
                  className="cursor-pointer"
                >
                  {task.title?.slice(0, 20)}
                  {(task.title?.length || 0) > 20 ? '...' : ''}
                </Badge>
              ))}
              {count > 2 ? (
                <Badge variant="secondary">
                  +{count - 2} task{count - 2 !== 1 ? 's' : ''}
                </Badge>
              ) : null}
            </div>
          </div>
        );
      }),
    [days, currentYear, currentMonth, tasksByDay, openDialog, openTaskUpdate]
  );

  return (
    <div className="mx-auto w-full">
      <CalendarHeader
        currentYear={currentYear}
        currentMonth={currentMonth}
        goToPreviousMonth={goToPreviousMonth}
        goToNextMonth={goToNextMonth}
        goToToday={goToToday}
      />

      <ScrollArea>
        <ScrollBar orientation="horizontal" />
        <div className="grid grid-cols-7 border-l text-center font-medium">
          {weekDays.map((wd) => (
            <div className="border-t border-r py-2" key={wd}>
              {wd}
            </div>
          ))}
        </div>

        <div className="grid min-w-[300px] grid-cols-7 border-t border-l">{daysComponent}</div>
      </ScrollArea>
      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Tasks for {selectedDayKey && format(selectedDayKey, 'PPP')}</DialogTitle>
          </DialogHeader>

          <DayTasksEditor
            onOpenUpdate={openTaskUpdate}
            dayKey={selectedDayKey}
            dayTasks={dayTasks}
            onClose={closeDialog}
          />
        </DialogContent>
      </Dialog>
      <UpdateTaskDialog id={taskUpdateId} open={isUpdateOpen} onOpenChange={setIsUpdateOpen} />
    </div>
  );
};
