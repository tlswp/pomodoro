import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { formatNumber, maskNumber } from '../lib';

interface INumberInputProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  normalizeFirstStep?: boolean;
}

const NumberInput: React.FC<INumberInputProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  normalizeFirstStep = true,
}) => {
  const [innerValue, setInnerValue] = useState(value.toString());

  const increment = useCallback(() => {
    const decrementFirstStep =
      normalizeFirstStep && value === min && step !== 1 ? 1 : 0;
    onChange(formatNumber(value + step - decrementFirstStep, min, max));
  }, [onChange, step, value, min, max, normalizeFirstStep]);

  const decrement = useCallback(() => {
    onChange(formatNumber(value - step, min, max));
  }, [onChange, step, value, min, max]);

  useEffect(() => {
    setInnerValue(value.toString());
  }, [value]);

  return (
    <div className="flex gap-2">
      <Button type="button" onClick={decrement} variant="outline" size="icon">
        <MinusIcon />
      </Button>
      <Input
        className="w-16"
        value={innerValue}
        onBlur={(e) => {
          const parsedValue = formatNumber(e.target.value, min, max);
          onChange(parsedValue);
          setInnerValue(parsedValue.toString());
        }}
        onChange={(e) => setInnerValue(maskNumber(e.target.value))}
      />
      <Button type="button" onClick={increment} variant="outline" size="icon">
        <PlusIcon />
      </Button>
    </div>
  );
};

export default NumberInput;
