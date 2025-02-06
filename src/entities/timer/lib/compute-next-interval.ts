import { TimerState, TimerType, useTimerStore } from '../model';
import { getDurationForType } from './get-duration-for-type';

/**
 * Returns the next interval state without applying it to the store.
 * @returns {{
 *   nextType: TimerType,
 *   nextTime: number,
 *   nextCompletedSessions: number,
 *   nextState: TimerState,
 *   shouldUpdateStartDate: boolean
 * }}
 */
export const computeNextInterval = () => {
  const { type, settings, completedSessions } = useTimerStore.getState();

  let nextType: TimerType = TimerType.SESSION;
  let nextTime: number = 0;
  let nextCompletedSessions = completedSessions;
  let nextState: TimerState = TimerState.STOPPED;
  let shouldUpdateStartDate = false;

  const startPlaying = (timerType: TimerType, autoPlay: boolean) => {
    nextType = timerType;
    nextTime = getDurationForType(timerType, settings);
    if (autoPlay) {
      nextState = TimerState.PLAYING;
      shouldUpdateStartDate = true;
    } else {
      nextState = TimerState.STOPPED;
    }
  };

  if (type === TimerType.SESSION) {
    const newCount = completedSessions + 1;

    if (newCount >= settings.sessionCount) {
      nextCompletedSessions = 0;
      startPlaying(TimerType.LONG_BREAK, settings.autoPlayBreak);
    } else {
      nextCompletedSessions = newCount;
      startPlaying(TimerType.SHORT_BREAK, settings.autoPlayBreak);
    }
  } else {
    startPlaying(TimerType.SESSION, settings.autoPlaySession);
  }

  return {
    nextType,
    nextTime,
    nextCompletedSessions,
    nextState,
    shouldUpdateStartDate,
  };
};
