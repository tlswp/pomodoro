import { TimerState, useTimerStore } from '../model';
import { calculateRemainingTime } from './calculate-remaining-time';
import { computeNextInterval } from './compute-next-interval';

/**
 * Restore the timer state after reload or refocus.
 * If multiple intervals have passed, it will loop until the correct current interval is found.
 */
export const recoverTimer = () => {
  const { state, time, startDate } = useTimerStore.getState();

  if (state === TimerState.PLAYING) {
    let remainingTime = calculateRemainingTime(startDate, time);
    let currentState: TimerState = state;

    while (remainingTime <= 0 && currentState === TimerState.PLAYING) {
      const {
        nextType,
        nextTime,
        nextCompletedSessions,
        nextState,
        shouldUpdateStartDate,
      } = computeNextInterval();

      useTimerStore.setState((store) => ({
        type: nextType,
        time: nextTime,
        completedSessions: nextCompletedSessions,
        state: nextState,
        startDate: shouldUpdateStartDate ? new Date() : store.startDate,
      }));

      const store = useTimerStore.getState();
      currentState = store.state;

      if (currentState === TimerState.PLAYING) {
        remainingTime = calculateRemainingTime(store.startDate, store.time);
      }
    }

    if (
      remainingTime > 0 &&
      useTimerStore.getState().state === TimerState.PLAYING
    ) {
      useTimerStore.setState({ time: remainingTime });
    }
  } else if (state === TimerState.PAUSED) {
    useTimerStore.setState({ time });
  } else {
    useTimerStore.setState({ state });
  }
};
