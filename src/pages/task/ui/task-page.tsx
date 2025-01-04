import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { SettingsDialog } from '@/widgets/settings-dialog';
import { TaskCalendar } from '@/widgets/task-calendar';
import { TasksBentoWidget } from '@/widgets/task-info';
import { TaskTable } from '@/widgets/task-table';

const TaskPage = () => {
  return (
    <>
      <SettingsDialog />
      <Tabs defaultValue="table">
        <div className="container mx-auto my-16">
          <TasksBentoWidget
            right={
              <TabsList>
                <TabsTrigger value="table">Table</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
            }
          />
        </div>
        <div className="container mx-auto my-16">
          <TabsContent value="calendar">
            <TaskCalendar />
          </TabsContent>
          <TabsContent value="table">
            <TaskTable />
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
};

export { TaskPage };
