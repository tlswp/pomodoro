if (typeof ResizeObserver === 'undefined') {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
import { fireEvent, render, screen } from '@testing-library/react';
import { act, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { browserNotifyStatusDescription } from '../../config';
import { NotifySettingsForm } from '../notify-settings-form';

const updateNotificationSettingsMock = vi.fn();
const requestPermissionMock = vi.fn(() => Promise.resolve('granted'));
const permissionMock = 'default';

vi.mock('@/entities/settings', () => ({
  useNotifySettingsStore: () => ({
    notificationSettings: { browser: false },
    updateNotificationSettings: updateNotificationSettingsMock,
  }),
}));

vi.mock('@/shared/lib/hooks/use-notify', () => ({
  useNotify: () => ({
    permission: permissionMock,
    requestPermission: requestPermissionMock,
  }),
}));

describe('NotifySettingsForm', () => {
  beforeEach(() => {
    updateNotificationSettingsMock.mockClear();
    requestPermissionMock.mockClear();
  });

  it('renders form with correct label, description and disabled switch', () => {
    render(<NotifySettingsForm />);
    expect(screen.getByText('Browser Notification')).toBeInTheDocument();
    expect(
      screen.getByText(browserNotifyStatusDescription['default'])
    ).toBeInTheDocument();
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
  });

  it('calls requestPermission on mount when permission is default', async () => {
    render(<NotifySettingsForm />);
    await waitFor(() => {
      expect(requestPermissionMock).toHaveBeenCalled();
    });
  });

  it('submits form and calls updateNotificationSettings on blur', async () => {
    const { container } = render(<NotifySettingsForm />);
    const formEl = container.querySelector('form');
    if (formEl) {
      act(() => {
        fireEvent.blur(formEl);
      });
    }
    await waitFor(() => {
      expect(updateNotificationSettingsMock).toHaveBeenCalledWith({
        browser: false,
      });
    });
  });
});
