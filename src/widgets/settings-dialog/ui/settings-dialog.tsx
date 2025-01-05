import { CogIcon } from '@heroicons/react/24/solid';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogTrigger } from '@/shared/ui/dialog';

import { SettingsDialogContent } from './settings-dialog-content';

const SettingsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="[&_svg]:size-6" size="icon" variant="ghost">
          <CogIcon />
        </Button>
      </DialogTrigger>
      <SettingsDialogContent />
    </Dialog>
  );
};

export { SettingsDialog };
