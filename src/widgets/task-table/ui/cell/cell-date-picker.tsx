import type { CellContext } from '@tanstack/react-table';
import { format, isValid } from 'date-fns';
import React from 'react';

import type { ITask } from '@/entities/task';
import { cn } from '@/shared/lib/utils';
import { Calendar } from '@/shared/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

interface ICellDatePickerProps {
  getValue: CellContext<ITask, unknown>['getValue'];
  row: CellContext<ITask, unknown>['row'];
  column: CellContext<ITask, unknown>['column'];
  table: CellContext<ITask, unknown>['table'];
}

export const CellDatePicker: React.FC<ICellDatePickerProps> = ({
  getValue,
  row: { index },
  column: { id },
  table,
}) => {
  const initialValue = getValue();
  const [value, setValue] = React.useState<string>(String(initialValue));

  React.useEffect(() => {
    setValue(String(initialValue));
  }, [initialValue]);

  const onValueChange = React.useCallback(
    (newValue: Date | undefined) => {
      const isoValue = newValue ? newValue.toISOString() : '';
      setValue(isoValue);
      table.options.meta?.updateData(index, id, isoValue);
    },
    [table, index, id]
  );
  const dateObject = value ? new Date(value) : undefined;
  const formatted =
    dateObject && isValid(dateObject) ? format(dateObject, 'PP') : '';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'w-full text-nowrap text-left font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          {formatted || <span>Pick a date</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dateObject}
          onSelect={onValueChange}
        />
      </PopoverContent>
    </Popover>
  );
};
