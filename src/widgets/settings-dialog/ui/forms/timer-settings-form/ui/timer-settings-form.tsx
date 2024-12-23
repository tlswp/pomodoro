import { useForm } from 'react-hook-form';

import type { ITimerSettings } from '@/entities/settings';
import { TimerPresetsConfig, useTimerSettingsStore } from '@/entities/settings';
import { TimerPresets } from '@/shared/config/timer-presets';
import { timerPresetsLabels } from '@/shared/config/timer-presets';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/form';
import { ScrollArea, ScrollBar } from '@/shared/ui/scroll-area';
import { Switch } from '@/shared/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import { formLimits } from '../config';
import NumberInput from './number-input';

const TimerSettingsForm = () => {
  const { timerSettings, updateTimerSettings } = useTimerSettingsStore();

  const form = useForm<ITimerSettings>({
    defaultValues: timerSettings,
    mode: 'onBlur',
  });

  const submitHandler = (data: ITimerSettings) => {
    updateTimerSettings(data);
  };

  const presetMiddleware =
    <T,>(f: (data: T) => void) =>
    (data: T) => {
      f(data);
      form.setValue('preset', TimerPresets.CUSTOM);
    };

  return (
    <Form {...form}>
      <form onBlur={form.handleSubmit(submitHandler)} className="grid gap-4">
        <FormField
          control={form.control}
          name="preset"
          render={({ field }) => (
            <FormItem className="grid rounded-lg">
              <div className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Preset</FormLabel>
                  <FormDescription>
                    Choose a predefined timer setup or customize your own
                    Pomodoro cycle.
                  </FormDescription>
                </div>
              </div>
              <FormControl>
                <Tabs
                  asChild
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    Object.entries(
                      TimerPresetsConfig[value as TimerPresets] || {}
                    ).map(([key, data]) => {
                      form.setValue(key as keyof ITimerSettings, data);
                    });
                  }}
                >
                  <ScrollArea className="w-full rounded-lg">
                    <ScrollBar orientation="horizontal" className="hidden" />
                    <TabsList>
                      {Object.entries(timerPresetsLabels).map(
                        ([preset, label]) => (
                          <TabsTrigger key={preset} value={preset}>
                            {label}
                          </TabsTrigger>
                        )
                      )}
                    </TabsList>
                  </ScrollArea>
                </Tabs>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sessionCount"
          render={({ field }) => (
            <FormItem
              className="flex flex-col justify-between rounded-lg md:flex-row
                md:items-center"
            >
              <div className="space-y-0.5">
                <FormLabel>Session Count</FormLabel>
                <FormDescription>
                  Setting the number of work sessions in one cycle (e.g., 4
                  sessions).
                </FormDescription>
              </div>
              <FormControl>
                <NumberInput
                  min={formLimits.sessionCount.min}
                  max={formLimits.sessionCount.max}
                  value={field.value}
                  onChange={presetMiddleware(field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="session"
          render={({ field }) => (
            <FormItem
              className="flex flex-col justify-between rounded-lg md:flex-row
                md:items-center"
            >
              <div className="space-y-0.5">
                <FormLabel>Focus Time</FormLabel>
                <FormDescription>
                  Adjust the duration of focused work sessions to optimize
                  productivity (e.g., 25 minutes).
                </FormDescription>
              </div>
              <FormControl>
                <NumberInput
                  step={5}
                  min={formLimits.sessionLength.min}
                  max={formLimits.sessionLength.max}
                  value={field.value}
                  onChange={presetMiddleware(field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortBreak"
          render={({ field }) => (
            <FormItem
              className="flex flex-col justify-between rounded-lg md:flex-row
                md:items-center"
            >
              <div className="space-y-0.5">
                <FormLabel>Short Break Time</FormLabel>
                <FormDescription>
                  Set the duration of short breaks between work sessions (e.g.,
                  5 minutes).
                </FormDescription>
              </div>
              <FormControl>
                <NumberInput
                  step={5}
                  min={formLimits.breakLength.min}
                  max={formLimits.breakLength.max}
                  value={field.value}
                  onChange={presetMiddleware(field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="longBreak"
          render={({ field }) => (
            <FormItem
              className="flex flex-col justify-between rounded-lg md:flex-row
                md:items-center"
            >
              <div className="space-y-0.5">
                <FormLabel>Long Break Time</FormLabel>
                <FormDescription>
                  Set the duration of long breaks after a full cycle of sessions
                  (e.g., 15 minutes).
                </FormDescription>
              </div>
              <FormControl>
                <NumberInput
                  step={5}
                  min={formLimits.longBreakLength.min}
                  max={formLimits.longBreakLength.max}
                  value={field.value}
                  onChange={presetMiddleware(field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="autoPlaySession"
          render={({ field }) => (
            <FormItem
              className="flex flex-row items-center justify-between gap-5
                rounded-lg"
            >
              <div className="space-y-0.5">
                <FormLabel>Auto Play Session</FormLabel>
                <FormDescription>
                  Automatically start the next session after the current one
                  ends.
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
          name="autoPlayBreak"
          render={({ field }) => (
            <FormItem
              className="flex flex-row items-center justify-between gap-5
                rounded-lg"
            >
              <div className="space-y-0.5">
                <FormLabel>Auto Play Break</FormLabel>
                <FormDescription>
                  Automatically start the next break after the current one ends.
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
      </form>
    </Form>
  );
};

export { TimerSettingsForm };
