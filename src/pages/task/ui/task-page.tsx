import { SettingsDialog } from '@/widgets/settings-dialog';
import { TaskTable } from '@/widgets/task-table';

const TaskPage = () => {
  return (
    <>
      <SettingsDialog />
      <div className="container mx-auto my-24">
        <TaskTable />
      </div>
    </>
  );
};

export { TaskPage };
