if (typeof ResizeObserver === 'undefined') {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TimerSettingsForm } from '../timer-settings-form';

vi.mock('../lib/format-to-minutes', () => ({
  formatToMinutes: (data: any) => data,
}));
vi.mock('../lib/format-to-minutes-by-key', () => ({
  formatToMinutesByKey: (_: string, data: any) => data,
}));
vi.mock('../lib/format-to-ms', () => ({
  formatToMs: (data: any) => data,
}));

const timerSettingsMock = {
  preset: 'CUSTOM',
  sessionCount: 4,
  session: 25,
  shortBreak: 5,
  longBreak: 15,
  autoPlaySession: false,
  autoPlayBreak: false,
};

const formLimits = {
  sessionCount: { min: 1, max: 10 },
  sessionLength: { min: 10, max: 60 },
  breakLength: { min: 3, max: 15 },
  longBreakLength: { min: 10, max: 30 },
};

const updateTimerSettingsMock = vi.fn();

vi.mock('@/entities/settings', () => ({
  useTimerSettingsStore: () => ({
    timerSettings: timerSettingsMock,
    updateTimerSettings: updateTimerSettingsMock,
  }),
  TimerPresetsConfig: {},
}));

vi.mock('../config', () => ({
  formLimits,
}));

vi.mock('@/shared/config/timer-presets', () => ({
  timerPresetsLabels: {
    Pomodoro: 'Pomodoro',
    Custom: 'Custom',
  },
  TimerPresets: {
    CUSTOM: 'CUSTOM',
    POMODORO: 'Pomodoro',
  },
}));

describe('TimerSettingsForm', () => {
  beforeEach(() => {
    updateTimerSettingsMock.mockClear();
  });

  it('renders all timer setting fields', () => {
    render(<TimerSettingsForm />);
    expect(screen.getByText('Preset')).toBeInTheDocument();
    expect(screen.getByText('Session Count')).toBeInTheDocument();
    expect(screen.getByText('Focus Time')).toBeInTheDocument();
    expect(screen.getByText('Short Break Time')).toBeInTheDocument();
    expect(screen.getByText('Long Break Time')).toBeInTheDocument();
    expect(screen.getByText('Auto Play Session')).toBeInTheDocument();
    expect(screen.getByText('Auto Play Break')).toBeInTheDocument();
  });

  it('calls updateTimerSettings when a NumberInput field is changed and blurred', async () => {
    render(<TimerSettingsForm />);
    const textboxes = screen.getAllByRole('textbox');
    const sessionCountInput = textboxes[0] as HTMLInputElement;
    act(() => {
      fireEvent.change(sessionCountInput, { target: { value: '6' } });
      fireEvent.blur(sessionCountInput);
    });
    await waitFor(() => {
      const calls = updateTimerSettingsMock.mock.calls;
      expect(calls.length).toBeGreaterThan(0);
      const lastCall = calls[calls.length - 1][0];
      expect(lastCall.sessionCount).toBe(6);
    });
  });

  it('calls updateTimerSettings when a switch is toggled', async () => {
    render(<TimerSettingsForm />);
    const autoPlaySessionSwitch = screen.getByRole('switch', {
      name: 'Auto Play Session',
    });
    act(() => {
      fireEvent.click(autoPlaySessionSwitch);
    });
    await waitFor(() => {
      const calls = updateTimerSettingsMock.mock.calls;
      expect(calls.length).toBeGreaterThan(0);
      const lastCall = calls[calls.length - 1][0];
      expect(lastCall.autoPlaySession).toBe(true);
    });
  });

  it('updates preset when a TabsTrigger is clicked', async () => {
    render(<TimerSettingsForm />);
    const presetTrigger = screen.getByText('Pomodoro');
    await userEvent.click(presetTrigger);
    await waitFor(() => {
      const calls = updateTimerSettingsMock.mock.calls;
      expect(calls.length).toBeGreaterThan(0);
      const lastCall = calls[calls.length - 1][0];
      expect(lastCall.preset).toBe('Pomodoro');
    });
  });
});
