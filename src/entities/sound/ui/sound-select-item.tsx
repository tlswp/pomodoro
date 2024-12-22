import { ToggleGroupItem } from '@radix-ui/react-toggle-group';

import { useSound } from '@/shared/lib/hooks/use-sound';

interface SoundSelectItemProps {
  label: string;
  value: string;
  src: string;
  volume: number;
}

const SoundSelectItem: React.FC<SoundSelectItemProps> = ({
  label,
  value,
  src,
  volume,
}) => {
  const { play } = useSound(src, { volume });
  return (
    <ToggleGroupItem
      onClick={play}
      value={value}
      className="size-16 rounded-lg border-2 bg-background text-sm text-primary
        duration-200 hover:bg-accent hover:text-accent-foreground
        active:scale-95 disabled:cursor-not-allowed disabled:border-transparent
        disabled:bg-muted disabled:active:scale-100
        data-[state=on]:border-muted-foreground
        disabled:data-[state=on]:border-transparent"
    >
      {label}
    </ToggleGroupItem>
  );
};

export { SoundSelectItem };
