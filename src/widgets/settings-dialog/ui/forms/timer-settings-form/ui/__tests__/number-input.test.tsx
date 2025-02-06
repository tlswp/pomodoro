import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import NumberInput from '../number-input';

vi.mock('../lib', () => ({
  formatNumber: (val: number | string, min: number, max: number) => {
    const num = typeof val === 'string' ? Number(val) : val;
    return Math.max(min, Math.min(num, max));
  },
  maskNumber: (val: string) => val.replace(/\D/g, ''),
}));

describe('NumberInput Component', () => {
  const min = 0;
  const max = 10;
  const step = 2;
  let onChangeMock = vi.fn();

  beforeEach(() => {
    onChangeMock = vi.fn();
  });

  it('renders decrement button, input, and increment button', () => {
    render(
      <NumberInput
        min={min}
        max={max}
        step={step}
        value={5}
        onChange={onChangeMock}
      />
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange with incremented value when plus button is clicked (with normalization)', async () => {
    render(
      <NumberInput
        min={min}
        max={max}
        step={step}
        value={min}
        onChange={onChangeMock}
        normalizeFirstStep={true}
      />
    );
    const buttons = screen.getAllByRole('button');
    const incrementButton = buttons[1];
    await act(async () => {
      fireEvent.click(incrementButton);
    });
    expect(onChangeMock).toHaveBeenCalledWith(1);
  });

  it('calls onChange with decremented value when minus button is clicked', async () => {
    render(
      <NumberInput
        min={min}
        max={max}
        step={step}
        value={5}
        onChange={onChangeMock}
      />
    );
    const buttons = screen.getAllByRole('button');
    const decrementButton = buttons[0];
    await act(async () => {
      fireEvent.click(decrementButton);
    });
    expect(onChangeMock).toHaveBeenCalledWith(3);
  });

  it('updates input value on change and on blur triggers onChange with formatted number', async () => {
    render(
      <NumberInput
        min={min}
        max={max}
        step={step}
        value={5}
        onChange={onChangeMock}
      />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    // Simulate typing that results in non-digit characters which are masked
    fireEvent.change(input, { target: { value: '12a3' } });
    expect(input.value).toBe('123');
    // Trigger blur without overriding the target value so that input.value ("123") is used
    fireEvent.blur(input);
    expect(onChangeMock).toHaveBeenCalledWith(10);
    await waitFor(() => {
      expect(input.value).toBe('10');
    });
  });

  it('updates inner input value when prop value changes', () => {
    const { rerender } = render(
      <NumberInput
        min={min}
        max={max}
        step={step}
        value={5}
        onChange={onChangeMock}
      />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('5');
    rerender(
      <NumberInput
        min={min}
        max={max}
        step={step}
        value={7}
        onChange={onChangeMock}
      />
    );
    expect(input.value).toBe('7');
  });
});
