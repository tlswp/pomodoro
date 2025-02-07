import type { ISound } from '@/shared/model/types/sound';

export const clickSoundList: ISound[] = [
  {
    src: `${import.meta.env.VITE_BASE_URL}sounds/click-1.mp3`,
    label: 'Click 1',
    value: 'click-1.mp3',
  },
  {
    src: `${import.meta.env.VITE_BASE_URL}sounds/click-2.mp3`,
    label: 'Click 2',
    value: 'click-2.mp3',
  },
];
