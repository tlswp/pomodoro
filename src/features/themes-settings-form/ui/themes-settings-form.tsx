import { RadioGroup } from '@radix-ui/react-radio-group';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useThemeSettingsStore } from '@/entities/settings/model';
import { ThemeMode } from '@/shared/config/theme-mode';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/form';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import { themePreviewList } from '../config';
import { ThemeItem } from './theme-item';

const ThemesSettingsForm = () => {
  const { themeSettings, updateThemeSettings } = useThemeSettingsStore();

  const form = useForm({
    defaultValues: themeSettings,
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((data) => {
      updateThemeSettings(data);
    });

    return () => unsubscribe();
  }, [form, updateThemeSettings]);

  return (
    <Form {...form}>
      <form className="grid gap-4">
        <FormField
          control={form.control}
          name="mode"
          render={({ field }) => (
            <FormItem
              className="flex flex-row items-center justify-between rounded-lg"
            >
              <div className="space-y-0.5">
                <FormLabel>Select Theme Mode</FormLabel>
                <FormDescription>
                  Choose between light, dark, or system mode to suit your
                  preference.
                </FormDescription>
              </div>
              <FormControl>
                <Tabs value={field.value} onValueChange={field.onChange}>
                  <TabsList>
                    <TabsTrigger value={ThemeMode.LIGHT}>Light</TabsTrigger>
                    <TabsTrigger value={ThemeMode.DARK}>Dark</TabsTrigger>
                    <TabsTrigger value={ThemeMode.SYSTEM}>System</TabsTrigger>
                  </TabsList>
                </Tabs>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="flex flex-col rounded-lg">
              <div className="space-y-0.5">
                <FormLabel>Select Theme</FormLabel>
                <FormDescription>
                  Pick a timer style that matches your vibe and keeps you
                  motivated.
                </FormDescription>
              </div>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  className="mt-9 flex flex-wrap gap-4"
                >
                  {themePreviewList.map((theme) => (
                    <ThemeItem
                      selected={theme.value === field.value}
                      key={theme.value}
                      {...theme}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export { ThemesSettingsForm };
