import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type { INotificationSettings } from '@/entities/settings';
import { useNotifySettingsStore } from '@/entities/settings';
import { useNotify } from '@/shared/lib/hooks/use-notify';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/form';
import { Switch } from '@/shared/ui/switch';

import { browserNotifyStatusDescription } from '../config';

const NotifySettingsForm = () => {
  const { notificationSettings, updateNotificationSettings } =
    useNotifySettingsStore();

  const { permission, requestPermission } = useNotify();

  const form = useForm<INotificationSettings>({
    defaultValues: notificationSettings,
    mode: 'onBlur',
  });

  const submitHandler = (data: INotificationSettings) => {
    updateNotificationSettings(data);
  };

  useEffect(() => {
    if (permission === 'default') requestPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form {...form}>
      <form onBlur={form.handleSubmit(submitHandler)} className="grid gap-4">
        <FormField
          control={form.control}
          name="browser"
          render={({ field }) => (
            <FormItem
              className="flex flex-row items-center justify-between gap-5
                rounded-lg"
            >
              <div className="space-y-0.5">
                <FormLabel>Browser Notification</FormLabel>
                <FormDescription>
                  {browserNotifyStatusDescription[permission]}
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  disabled={permission !== 'granted'}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export { NotifySettingsForm };
