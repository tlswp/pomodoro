import type { Dispatch } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface KanbanOrder {
  [status: string]: string[];
}

interface KanbanStore {
  openTaskId?: string | null;
  taskOpen?: boolean;
  onTaskOpenChange: (open: boolean) => void;
  setOpenTaskId: (id: string | null) => void;
  order: KanbanOrder;

  setOrder: Dispatch<KanbanOrder | ((prevState: KanbanOrder) => KanbanOrder)>;

  setInitialOrder: (statuses: string[]) => void;

  updateOrder: (orderId: string, orderItem: string[]) => void;

  moveTaskInSameColumn: (status: string, fromIndex: number, toIndex: number) => void;

  moveTaskToAnotherColumn: (
    fromStatus: string,
    toStatus: string,
    fromIndex: number,
    toIndex: number,
    taskId: string
  ) => void;

  removeTaskId: (status: string, taskId: string) => void;
}

export const useKanbanStore = create(
  persist<KanbanStore>(
    (set, get) => ({
      openTaskId: undefined,
      taskOpen: false,
      onTaskOpenChange: (open) => set({ taskOpen: open }),
      setOpenTaskId: (id) => set({ openTaskId: id }),
      order: {},

      setOrder: (order) =>
        typeof order === 'function' ? set((state) => ({ order: order(state.order) })) : set({ order }),

      setInitialOrder: (statuses) => {
        const { order } = get();
        const newOrder = { ...order };
        statuses.forEach((s) => {
          if (!newOrder[s]) {
            newOrder[s] = [];
          }
        });
        set({ order: newOrder });
      },

      updateOrder: (orderId: string, orderItem: string[]) => {
        set({ order: { ...get().order, [orderId]: orderItem } });
      },

      moveTaskInSameColumn: (status, fromIndex, toIndex) => {
        const { order } = get();
        const columnTasks = [...(order[status] || [])];
        const [removed] = columnTasks.splice(fromIndex, 1);
        columnTasks.splice(toIndex, 0, removed);
        set({ order: { ...order, [status]: columnTasks } });
      },

      moveTaskToAnotherColumn: (fromStatus, toStatus, fromIndex, toIndex, taskId) => {
        const { order } = get();
        const fromTasks = [...(order[fromStatus] || [])];
        fromTasks.splice(fromIndex, 1);
        const toTasks = [...(order[toStatus] || [])];
        toTasks.splice(toIndex, 0, taskId);
        set({
          order: {
            ...order,
            [fromStatus]: fromTasks,
            [toStatus]: toTasks,
          },
        });
      },

      removeTaskId: (status, taskId) => {
        const { order } = get();
        const columnTasks = order[status] || [];
        set({
          order: {
            ...order,
            [status]: columnTasks.filter((id) => id !== taskId),
          },
        });
      },
    }),
    {
      name: 'kanban-order',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
