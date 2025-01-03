import type { CellContext } from '@tanstack/react-table';
import React from 'react';

import type { ITask } from '@/entities/task';
import { Input } from '@/shared/ui/input';

interface ICellInputProps {
  getValue: CellContext<ITask, unknown>['getValue'];
  row: CellContext<ITask, unknown>['row'];
  column: CellContext<ITask, unknown>['column'];
  table: CellContext<ITask, unknown>['table'];
}

export const CellInput: React.FC<ICellInputProps> = ({
  getValue,
  row: { index },
  column: { id },
  table,
}) => {
  const initialValue = getValue();
  const [value, setValue] = React.useState(initialValue);
  const [isEditing, setEditing] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSave = React.useCallback(() => {
    table.options.meta?.updateData(index, id, value);
    setEditing(false);
  }, [table, index, id, value]);

  const handleBlur = React.useCallback(() => {
    handleSave();
  }, [handleSave]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSave();
      } else if (e.key === 'Escape') {
        setValue(initialValue);
        setEditing(false);
      }
    },
    [handleSave, initialValue]
  );

  return (
    <div className="relative -my-3 h-8">
      <div
        onDoubleClick={() => setEditing(true)}
        className="line-clamp-1 flex h-full w-full cursor-text items-center
          text-left"
        role="button"
        tabIndex={0}
      >
        {value as string}
      </div>
      {isEditing && (
        <Input
          ref={inputRef}
          type="text"
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="absolute -top-2 h-12 rounded-none bg-background px-1
            outline-none"
        />
      )}
    </div>
  );
};
