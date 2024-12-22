import { useForm } from 'react-hook-form';

import type { ISoundSettings } from '@/entities/settings';
import { useSoundSettingsStore } from '@/entities/settings';
import { SoundSelect } from '@/entities/sound';
import { clickSoundList } from '@/shared/config/sounds/click-sounds';
import { notifySoundList } from '@/shared/config/sounds/notify-sounds';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/form';
import { Switch } from '@/shared/ui/switch';

const SoundSettingsForm = () => {
  const { soundSettings, updateSoundSettings } = useSoundSettingsStore();

  const form = useForm<ISoundSettings>({
    defaultValues: {
      notification: {
        enabled: soundSettings.notification.enabled,
        volume: soundSettings.notification.volume,
        selectedSound: soundSettings.notification.selectedSound,
      },
      click: {
        enabled: soundSettings.click.enabled,
        volume: soundSettings.click.volume,
        selectedSound: soundSettings.click.selectedSound,
      },
      enabled: soundSettings.enabled,
    },
    mode: 'onBlur',
  });

  const submitHandler = (data: ISoundSettings) => {
    updateSoundSettings(data);
  };

  return (
    <Form {...form}>
      <form onBlur={form.handleSubmit(submitHandler)} className="grid gap-4">
        <FormField
          control={form.control}
          name="enabled"
          render={({ field }) => (
            <FormItem
              className="flex flex-row items-center justify-between rounded-lg"
            >
              <div className="space-y-0.5">
                <FormLabel>Enable Sounds</FormLabel>
                <FormDescription>
                  Toggle all app sounds on or off with a single switch.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="click.enabled"
          render={({ field }) => (
            <FormItem
              className="flex flex-row items-center justify-between rounded-lg"
            >
              <div className="space-y-0.5">
                <FormLabel>Click</FormLabel>
                <FormDescription>
                  Choose a sound to play for button clicks or interactions.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  disabled={!form.watch('enabled')}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="click.selectedSound"
          render={({ field }) => (
            <SoundSelect
              disabled={!form.watch('click.enabled') || !form.watch('enabled')}
              value={field.value}
              onChange={field.onChange}
              soundList={clickSoundList}
              volume={soundSettings.click.volume}
            />
          )}
        />
        <FormField
          control={form.control}
          name="notification.enabled"
          render={({ field }) => (
            <FormItem
              className="flex flex-row items-center justify-between rounded-lg"
            >
              <div className="space-y-0.5">
                <FormLabel>Notification</FormLabel>
                <FormDescription>
                  Choose a sound to play for notifications, marking the start or
                  end of sessions.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  disabled={!form.watch('enabled')}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notification.selectedSound"
          render={({ field }) => (
            <SoundSelect
              disabled={
                !form.watch('notification.enabled') || !form.watch('enabled')
              }
              value={field.value}
              onChange={field.onChange}
              soundList={notifySoundList}
              volume={soundSettings.notification.volume}
            />
          )}
        />
      </form>
    </Form>
  );
};

export { SoundSettingsForm };
