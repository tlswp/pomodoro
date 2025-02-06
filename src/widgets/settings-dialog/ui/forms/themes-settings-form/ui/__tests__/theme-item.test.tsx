if (typeof ResizeObserver === 'undefined') {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ThemePresets } from '@/shared/config/theme';

import * as configModule from '../../config';
import { ThemesSettingsForm } from '../themes-settings-form';

const updateThemeSettingsMock = vi.fn();
const themeSettingsMock = {
  mode: 'light',
  theme: 'theme1' as ThemePresets,
};

const themePreviewListMock = [
  {
    label: 'Theme One',
    value: 'theme1' as ThemePresets,
    colors: { border: '#000000', from: '#ffffff', to: '#cccccc' },
  },
  {
    label: 'Theme Two',
    value: 'theme2' as ThemePresets,
    colors: { border: '#111111', from: '#eeeeee', to: '#dddddd' },
  },
];

vi.mock('@/entities/settings/model', () => ({
  useThemeSettingsStore: () => ({
    themeSettings: themeSettingsMock,
    updateThemeSettings: updateThemeSettingsMock,
  }),
}));

vi.mock('@/shared/config/theme-mode', () => ({
  ThemeMode: {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
  },
}));

vi.mock('../config', () => ({
  themePreviewList: themePreviewListMock,
}));

describe('ThemesSettingsForm', () => {
  beforeEach(() => {
    updateThemeSettingsMock.mockClear();
    vi.spyOn(configModule, 'themePreviewList', 'get').mockReturnValue(
      themePreviewListMock
    );
  });

  it('renders theme mode and theme selection fields', () => {
    render(<ThemesSettingsForm />);
    expect(screen.getByText('Select Theme Mode')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Choose between light, dark, or system mode to suit your preference.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Select Theme')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Pick a timer style that matches your vibe and keeps you motivated.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
    themePreviewListMock.forEach((theme) => {
      expect(
        screen.getByText(new RegExp(theme.label, 'i'))
      ).toBeInTheDocument();
    });
  });

  it('updates theme mode when a different mode is selected', async () => {
    render(<ThemesSettingsForm />);
    const darkTab = screen.getByText('Dark');
    await userEvent.click(darkTab);
    await waitFor(() => {
      expect(updateThemeSettingsMock).toHaveBeenCalled();
      const callArg = updateThemeSettingsMock.mock.calls[0][0];
      expect(callArg.mode).toBe('dark');
    });
  });

  it('updates theme when a different theme is selected', async () => {
    render(<ThemesSettingsForm />);
    const radios = screen.getAllByRole('radio', { hidden: true });
    const themeTwoRadio = radios.find(
      (radio) => radio.getAttribute('value') === 'theme2'
    );
    expect(themeTwoRadio).toBeDefined();
    await userEvent.click(themeTwoRadio!);
    await waitFor(() => {
      expect(updateThemeSettingsMock).toHaveBeenCalled();
      const callArg = updateThemeSettingsMock.mock.calls[0][0];
      expect(callArg.theme).toBe('theme2');
    });
  });
});
