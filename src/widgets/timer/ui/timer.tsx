import { TimerCounter } from './timer-counter';

export const Timer = () => {
  return (
    <div className="flex flex-col items-center">
      <TimerCounter value="25:00" />
    </div>
  );
};
