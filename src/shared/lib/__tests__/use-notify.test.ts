import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useNotify } from '../hooks/use-notify';

class FakeNotification {
  title: string;
  options?: NotificationOptions;
  constructor(title: string, options?: NotificationOptions) {
    this.title = title;
    this.options = options;
  }
}

describe('useNotify hook', () => {
  let FakeNotificationConstructor: any;

  beforeEach(() => {
    FakeNotificationConstructor = vi.fn(
      (title: string, options?: NotificationOptions) => new FakeNotification(title, options)
    );
    FakeNotificationConstructor.permission = 'default';
    FakeNotificationConstructor.requestPermission = vi.fn(() => Promise.resolve('granted'));
    vi.stubGlobal('Notification', FakeNotificationConstructor);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('initially sets permission from Notification.permission', () => {
    const { result } = renderHook(() => useNotify());
    expect(result.current.permission).toBe('default');
  });

  it('requestPermission updates permission and returns it', async () => {
    const { result } = renderHook(() => useNotify());
    let perm: NotificationPermission = 'default';
    await act(async () => {
      perm = await result.current.requestPermission();
    });
    expect(perm).toBe('granted');
    expect(result.current.permission).toBe('granted');
  });

  it('sendNotify returns a Notification instance when permission is granted', () => {
    FakeNotificationConstructor.permission = 'granted';
    const { result } = renderHook(() => useNotify());
    const notification = result.current.sendNotify('Test Title', {
      body: 'Hello',
    });
    expect(notification).toBeInstanceOf(FakeNotification);
    if (notification instanceof FakeNotification) {
      expect(notification.title).toBe('Test Title');
      expect(notification.options).toEqual({ body: 'Hello' });
    }
  });

  it('sendNotify returns null when permission is not granted', () => {
    FakeNotificationConstructor.permission = 'denied';
    const { result } = renderHook(() => useNotify());
    const notification = result.current.sendNotify('Test Title');
    expect(notification).toBeNull();
  });
});
