if (typeof ResizeObserver === 'undefined') {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as settingsModule from '@/entities/settings';

import { SoundSettingsForm } from '../sound-settings-form';

const updateSoundSettingsMock = vi.fn();
const soundSettingsMock = {
  enabled: true,
  notification: {
    enabled: true,
    volume: 0.8,
    selectedSound: 'notify1',
  },
  click: {
    enabled: true,
    volume: 0.5,
    selectedSound: 'click1',
  },
};

vi.mock('@/entities/settings', () => ({
  useSoundSettingsStore: () => ({
    soundSettings: soundSettingsMock,
    updateSoundSettings: updateSoundSettingsMock,
  }),
}));

vi.mock('@/entities/sound', () => ({
  SoundSelect: ({ value, onChange, disabled, soundList }: any) => (
    <select data-testid="sound-select" disabled={disabled} value={value} onChange={(e) => onChange(e.target.value)}>
      {soundList.map((sound: string) => (
        <option key={sound} value={sound}>
          {sound}
        </option>
      ))}
    </select>
  ),
}));

vi.mock('@/shared/config/sounds/click-sounds', () => ({
  clickSoundList: ['click1', 'click2'],
}));

vi.mock('@/shared/config/sounds/notify-sounds', () => ({
  notifySoundList: ['notify1', 'notify2'],
}));

describe('SoundSettingsForm', () => {
  beforeEach(() => {
    updateSoundSettingsMock.mockClear();
  });

  it('renders form fields with correct labels and initial values', () => {
    render(<SoundSettingsForm />);
    expect(screen.getByText('Enable Sounds')).toBeInTheDocument();
    expect(screen.getByText('Click')).toBeInTheDocument();
    expect(screen.getByText('Notification')).toBeInTheDocument();

    const soundSelects = screen.getAllByTestId('sound-select');
    expect(soundSelects[0]).toHaveValue('click1');
    expect(soundSelects[1]).toHaveValue('notify1');
  });

  it('submits form and calls updateSoundSettings on blur with updated values', async () => {
    const { container } = render(<SoundSettingsForm />);
    const formEl = container.querySelector('form');

    const mainSwitch = screen.getByRole('switch', { name: /enable sounds/i });
    act(() => {
      fireEvent.click(mainSwitch);
    });
    expect(mainSwitch).not.toBeChecked();

    const clickSelect = screen.getAllByTestId('sound-select')[0];
    act(() => {
      fireEvent.change(clickSelect, { target: { value: 'click2' } });
    });
    expect(clickSelect).toHaveValue('click2');

    act(() => {
      fireEvent.blur(formEl!);
    });

    await waitFor(() => {
      expect(updateSoundSettingsMock).toHaveBeenCalledTimes(1);
      expect(updateSoundSettingsMock).toHaveBeenCalledWith({
        enabled: false,
        notification: {
          enabled: soundSettingsMock.notification.enabled,
          volume: soundSettingsMock.notification.volume,
          selectedSound: soundSettingsMock.notification.selectedSound,
        },
        click: {
          enabled: soundSettingsMock.click.enabled,
          volume: soundSettingsMock.click.volume,
          selectedSound: 'click2',
        },
      });
    });
  });

  it('disables child fields when main sound is disabled', () => {
    const disabledSettings = {
      enabled: false,
      notification: {
        enabled: false,
        volume: 0.8,
        selectedSound: 'notify1',
      },
      click: {
        enabled: false,
        volume: 0.5,
        selectedSound: 'click1',
      },
    };

    vi.spyOn(settingsModule, 'useSoundSettingsStore').mockReturnValue({
      soundSettings: disabledSettings,
      updateSoundSettings: updateSoundSettingsMock,
    });

    render(<SoundSettingsForm />);
    const clickSwitch = screen.getByRole('switch', { name: /click/i });
    expect(clickSwitch).toBeDisabled();

    const soundSelects = screen.getAllByTestId('sound-select');
    soundSelects.forEach((select) => {
      expect(select).toBeDisabled();
    });
  });
});
