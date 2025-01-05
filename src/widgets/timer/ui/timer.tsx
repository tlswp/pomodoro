import { useEffect, useRef, useState } from 'react';

import { useTimerSettingsStore } from '@/entities/settings';
import { Button } from '@/shared/ui/button';

import { formatTime } from './lib/format-time';
import { TimerCounter } from './timer-counter';
import { TimerProgress } from './timer-progress';
import { TimerStatus } from './timer-status';

export const Timer = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const {
    timerSettings: { session },
  } = useTimerSettingsStore();

  const [time, setTime] = useState({
    default: session,
    formatted: formatTime(session),
  });

  useEffect(() => {
    const path = pathRef.current;

    if (path) {
      const length = path.getTotalLength();
      path.style.transition = 'stroke-dashoffset 2s ease-out';
      path.style.strokeDasharray = length.toString();
      path.style.strokeDashoffset = (
        (time.default / session) *
        length
      ).toString();
    }
  }, [time.default, session]);

  const handleTimerStart = () => {
    let countDown = session;
    const interval = setInterval(() => {
      if (countDown > 0) {
        countDown -= 1000;
      } else {
        clearInterval(interval);
      }
      setTime({ default: countDown, formatted: formatTime(countDown) });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center">
        <TimerProgress pathRef={pathRef} />
        <TimerStatus
          status="FOCUS"
          className="absolute inset-0 flex items-center justify-center"
        >
          <TimerCounter time={time.formatted} className="mb-[18px] mt-[27px]" />
        </TimerStatus>
      </div>
      <Button onClick={handleTimerStart}>Start</Button>
    </div>
  );
};
