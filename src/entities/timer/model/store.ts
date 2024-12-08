import { create } from 'zustand';

import { TimerState, TimerType } from './type';

/**
 * Interface for the Timer Store.
 */
interface ITimerStore {
  /**
   * Settings for the timer.
   */
  settings: {
    /** Duration of a work session in minutes. */
    session: number;
    /** Duration of a long break in minutes. */
    longBreak: number;
    /** Duration of a short break in minutes. */
    shortBreak: number;
    /** Number of sessions before a long break. */
    sessionCount: number;
    /** Automatically start the next work session after the current one ends. */
    autoPlaySession: boolean;
    /** Automatically start the break after a session ends. */
    autoPlayBreak: boolean;
  };
  /**
   * Updates the settings for the timer.
   * @param settings - New settings object.
   */
  setSettings: (settings: ITimerStore['settings']) => void;

  // Timer
  /**
   * Current type of the timer (e.g., session, short break, long break).
   */
  type: TimerType;
  /**
   * Current state of the timer (e.g., playing, paused, stopped).
   */
  state: TimerState;
  /**
   * Remaining time in milliseconds.
   */
  time: number;
  /**
   * The start date/time of the timer.
   */
  startDate: Date;
  /**
   * The date/time when the timer was last paused.
   */
  lastPauseDate: Date;
  /**
   * The number of completed sessions.
   */
  completedSessions: number;

  // Actions
  /**
   * Updates the remaining time on the timer.
   * @param time - Remaining time in milliseconds.
   */
  setTime: (time: number) => void;
  /**
   * Updates the type of the timer.
   * @param type - New timer type.
   */
  setType: (type: TimerType) => void;
  /**
   * Updates the state of the timer.
   * @param state - New timer state.
   */
  setState: (state: TimerState) => void;
  /**
   * Sets the start date/time of the timer.
   * @param date - New start date.
   */
  setStartDate: (date: Date) => void;
  /**
   * Sets the date/time of the last pause.
   * @param date - New pause date.
   */
  setLastPauseDate: (date: Date) => void;
  /**
   * Resets the timer to its initial state.
   */
  reset: () => void;
  /**
   * Sets the number of completed sessions.
   * @param count - Number of completed sessions.
   */
  setCompletedSessions: (count: number) => void;
}

/**
 * Store for managing timer state and actions.
 */
export const useTimerStore = create<ITimerStore>((set) => ({
  settings: {
    session: 25,
    longBreak: 5,
    shortBreak: 3,
    sessionCount: 4,
    autoPlaySession: false,
    autoPlayBreak: false,
  },
  setSettings: (settings) => set({ settings }),
  type: TimerType.SESSION,
  state: TimerState.STOPPED,
  time: 0,
  startDate: new Date(),
  lastPauseDate: new Date(),
  completedSessions: 0,
  setTime: (time) => set({ time }),
  setType: (type) => set({ type }),
  setState: (state) => set({ state }),
  setStartDate: (date) => set({ startDate: date }),
  setLastPauseDate: (date) => set({ lastPauseDate: date }),
  reset: () =>
    set({
      type: TimerType.SESSION,
      state: TimerState.STOPPED,
      time: 0,
      startDate: new Date(),
      lastPauseDate: new Date(),
      completedSessions: 0,
    }),
  setCompletedSessions: (count) => set({ completedSessions: count }),
}));
