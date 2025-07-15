import { Toggle } from 'radix-ui';

import { useSound } from '@/shared/lib/hooks/use-sound';

interface SoundSelectItemProps {
  label: string;
  value: string;
  src: string;
  volume: number;
}

const SoundSelectItem: React.FC<SoundSelectItemProps> = ({ label, value, src, volume }) => {
  const { play } = useSound(src, { volume });
  return (
    <Toggle.Toggle
      onClick={play}
      value={value}
      className="bg-background text-primary hover:bg-accent hover:text-accent-foreground disabled:bg-muted
        data-[state=on]:border-primary size-16 rounded-lg border-2 text-sm duration-200 active:scale-95
        disabled:cursor-not-allowed disabled:border-transparent disabled:active:scale-100
        disabled:data-[state=on]:border-transparent"
    >
      {label}
    </Toggle.Toggle>
  );
};

export { SoundSelectItem };
