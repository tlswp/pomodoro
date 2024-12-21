import type { ThemePresets } from '@/shared/config/theme';
import { cn } from '@/shared/lib/utils';

interface IThemeItemProps {
  label: string;
  value: ThemePresets;
  onClick: (value: ThemePresets) => void;
  selected: boolean;
  colors: {
    border: string;
    from: string;
    to: string;
  };
}

export const ThemeItem: React.FC<IThemeItemProps> = ({
  label,
  value,
  onClick,
  selected,
  colors,
}) => {
  return (
    <button onClick={() => onClick(value)}>
      <div
        className={cn(
          'size-32 rounded-2xl border-2 duration-200',
          selected && 'border-transparent bg-gradient-to-tr p-1'
        )}
        style={{
          borderColor: selected ? colors.border : 'transparent',
        }}
      >
        <div
          className="size-full rounded-xl"
          style={{
            background: `linear-gradient(to top right, ${colors.from}, ${colors.to})`,
          }}
        />
      </div>
      <div className="mt-2 text-sm">{label}</div>
    </button>
  );
};
