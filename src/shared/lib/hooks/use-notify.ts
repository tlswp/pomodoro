import { useEffect, useState } from 'react';

export const useNotify = () => {
  const [permission, setPermission] = useState<NotificationPermission>(Notification.permission);

  useEffect(() => {
    setPermission(Notification.permission);
  }, []);

  const requestPermission = async (): Promise<NotificationPermission> => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    }
    return 'denied';
  };

  const sendNotify = (title: string, options?: NotificationOptions): Notification | null => {
    if (permission === 'granted' && 'Notification' in window) {
      return new Notification(title, options);
    } else {
      return null;
    }
  };

  return {
    permission,
    requestPermission,
    sendNotify,
  };
};
