import { RadioGroup } from 'radix-ui';

import type { ThemePresets } from '@/shared/config/theme';
import { cn } from '@/shared/lib/utils';

interface IThemeItemProps {
  label: string;
  value: ThemePresets;
  selected: boolean;
  colors: {
    border: string;
    from: string;
    to: string;
  };
}

export const ThemeItem: React.FC<IThemeItemProps> = ({ label, value, selected, colors }) => {
  return (
    <RadioGroup.Item value={value}>
      <div
        className={cn('size-32 rounded-xl border-2 duration-200', selected && 'border-transparent bg-linear-to-tr p-1')}
        style={{
          borderColor: selected ? colors.border : 'transparent',
        }}
      >
        <div
          className="size-full rounded-lg"
          style={{
            background: `linear-gradient(to top right, ${colors.from}, ${colors.to})`,
          }}
        />
      </div>
      <div className="mt-2 text-sm">{label}</div>
    </RadioGroup.Item>
  );
};
