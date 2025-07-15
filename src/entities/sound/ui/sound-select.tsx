import { ToggleGroup } from 'radix-ui';

import type { ISound } from '@/shared/model/types/sound';

import { SoundSelectItem } from './sound-select-item';

interface ISoundSelectProps {
  value: string;
  onChange: (value: string) => void;
  soundList: ISound[];
  volume: number;
  disabled?: boolean;
}

const SoundSelect: React.FC<ISoundSelectProps> = ({ value, onChange, soundList, volume, disabled }) => {
  return (
    <ToggleGroup.ToggleGroup
      disabled={disabled}
      type="single"
      value={value}
      className="flex gap-4"
      onValueChange={(value) => value && onChange(value)}
    >
      {soundList.map((sound) => (
        <SoundSelectItem key={sound.value} label={sound.label} value={sound.value} src={sound.src} volume={volume} />
      ))}
    </ToggleGroup.ToggleGroup>
  );
};

export { SoundSelect };
