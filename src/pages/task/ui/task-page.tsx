import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { TaskCalendar } from '@/widgets/task-calendar';
import { TasksBentoWidget } from '@/widgets/task-info';
import { KanbanBoard } from '@/widgets/task-kanban';
import { TaskTable } from '@/widgets/task-table';

const TaskPage = () => {
  return (
    <Tabs defaultValue="table">
      <div className="container mx-auto my-16">
        <TasksBentoWidget
          right={
            <TabsList>
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="kanban">Kanban</TabsTrigger>
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
        <TabsContent value="kanban">
          <KanbanBoard />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export { TaskPage };
