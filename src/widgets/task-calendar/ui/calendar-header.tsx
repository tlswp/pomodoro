import { format } from 'date-fns';
import React from 'react';

import { AddTask } from '@/features/task-create';
import { Button } from '@/shared/ui/button';

interface CalendarHeaderProps {
  currentYear: number;
  currentMonth: number;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentYear,
  currentMonth,
  goToPreviousMonth,
  goToNextMonth,
  goToToday,
}) => {
  const displayedDate = new Date(currentYear, currentMonth);
  const monthLabel = format(displayedDate, 'yyyy LLLL');

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="font-semibold">{monthLabel}</div>
      <div className="flex items-center space-x-4">
        <AddTask variant="ghost" />
        <div>
          <Button variant="ghost" onClick={goToPreviousMonth}>
            &larr;
          </Button>
          <Button variant="link" onClick={goToToday}>
            Today
          </Button>
          <Button variant="ghost" onClick={goToNextMonth}>
            &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
};
