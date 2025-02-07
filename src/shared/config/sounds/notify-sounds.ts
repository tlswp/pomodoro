import type { ISound } from '@/shared/model/types/sound';

export const notifySoundList: ISound[] = [
  {
    src: `${import.meta.env.BASE_URL}sounds/notify-1.mp3`,
    label: 'Notify 1',
    value: 'notify-1.mp3',
  },
  {
    src: `${import.meta.env.BASE_URL}sounds/notify-2.mp3`,
    label: 'Notify 2',
    value: 'notify-2.mp3',
  },
];
