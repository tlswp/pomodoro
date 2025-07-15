import { TimerState, TimerType, useTimerStore } from '../model';
import { getDurationForType } from './get-duration-for-type';

/**
 * Move to the next interval (session or break).
 */
export const goToNextInterval = () => {
  const { type, settings, completedSessions, setCompletedSessions, setType, setTime, setState } =
    useTimerStore.getState();

  const next = (nextType: TimerType, shouldPlay: boolean) => {
    const nextDuration = getDurationForType(nextType, settings);
    setType(nextType);
    setTime(nextDuration);
    setState(shouldPlay ? TimerState.PLAYING : TimerState.STOPPED);
    if (shouldPlay) {
      useTimerStore.getState().setStartDate(new Date());
    }
  };

  if (type === TimerType.SESSION) {
    const newCount = completedSessions + 1;
    setCompletedSessions(newCount);

    if (newCount >= settings.sessionCount) {
      setCompletedSessions(0);
      next(TimerType.LONG_BREAK, settings.autoPlayBreak);
    } else {
      next(TimerType.SHORT_BREAK, settings.autoPlayBreak);
    }
  } else {
    next(TimerType.SESSION, settings.autoPlaySession);
  }
};
