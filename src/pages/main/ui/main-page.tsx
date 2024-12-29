import { SettingsDialog } from '@/widgets/settings-dialog';
import { Timer } from '@/widgets/timer';

const MainPage = () => {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <SettingsDialog />
      <Timer />
    </div>
  );
};

export { MainPage };
