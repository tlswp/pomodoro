import type { CellContext } from '@tanstack/react-table';
import { Select as RadixSelect } from 'radix-ui';
import React from 'react';

import type { ITask } from '@/entities/task';
import { Select, SelectContent, SelectItem, SelectValue } from '@/shared/ui/select';

interface ICellSelectProps {
  getValue: CellContext<ITask, unknown>['getValue'];
  row: CellContext<ITask, unknown>['row'];
  column: CellContext<ITask, unknown>['column'];
  table: CellContext<ITask, unknown>['table'];
  options: string[];
  render: ({ value }: { value: string }) => React.ReactNode;
}

export const CellSelect: React.FC<ICellSelectProps> = ({
  getValue,
  row: { index },
  column: { id },
  table,
  options,
  render: Render,
}) => {
  const initialValue = getValue();
  const [value, setValue] = React.useState<string>(initialValue as string);

  React.useEffect(() => {
    setValue(String(initialValue));
  }, [initialValue]);

  const onValueChange = React.useCallback(
    (newValue: string) => {
      setValue(newValue);
      table.options.meta?.updateData(index, id, newValue);
    },
    [table, index, id]
  );

  return (
    <Select defaultValue={value} onValueChange={onValueChange}>
      <RadixSelect.Trigger className="h-full w-full text-start outline-none">
        <SelectValue placeholder="Select an option" />
      </RadixSelect.Trigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            <Render value={option} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
