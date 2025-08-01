if (typeof ResizeObserver === 'undefined') {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TaskPriority, TaskStatus } from '@/entities/task';

import { TaskUpdateForm } from '../task-update-form';

const updateTaskMock = vi.fn();
const sampleTask = {
  id: 'task-1',
  title: 'Existing Task',
  description: 'Existing description',
  status: TaskStatus.TODO,
  priority: TaskPriority.LOW,
  deadline: new Date(2023, 6, 15).toISOString(),
  createdAt: '2023-06-01T00:00:00.000Z',
};

vi.mock('@/entities/task', () => ({
  TaskStatus: {
    TODO: 'todo',
    IN_PROGRESS: 'inProgress',
    COMPLETED: 'completed',
    CANCELED: 'canceled',
  },
  TaskPriority: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
  },
  TaskStatusBadge: ({ status }: { status: string }) => <div>{status}</div>,
  TaskPriorityBadge: ({ priority }: { priority: string }) => <div>{priority}</div>,
  useTaskStore: (selector: (state: { updateTask: typeof updateTaskMock; tasks: (typeof sampleTask)[] }) => unknown) =>
    selector({ updateTask: updateTaskMock, tasks: [sampleTask] }),
}));

describe('TaskUpdateForm Unit Tests', () => {
  beforeEach(() => {
    updateTaskMock.mockReset();
  });

  it('renders form with pre-filled values', () => {
    render(<TaskUpdateForm id="task-1" />);
    expect(screen.getByDisplayValue(sampleTask.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(sampleTask.description)).toBeInTheDocument();
    expect(screen.getByText(sampleTask.status)).toBeInTheDocument();
    expect(screen.getByText(sampleTask.priority)).toBeInTheDocument();
    expect(screen.getByText('July 15th, 2023')).toBeInTheDocument();
  });

  it('disables fields when disabledValues provided', () => {
    render(
      <TaskUpdateForm
        id="task-1"
        disabledValues={{
          title: true,
          description: true,
          status: true,
          priority: true,
          deadline: true,
        }}
      />
    );
    expect(screen.getByDisplayValue(sampleTask.title)).toBeDisabled();
    expect(screen.getByDisplayValue(sampleTask.description)).toBeDisabled();
    expect(screen.getByRole('combobox', { name: /status/i })).toBeDisabled();
    expect(screen.getByRole('combobox', { name: /priority/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /deadline/i })).toBeDisabled();
  });

  it('submits form and calls updateTask with updated data', async () => {
    render(<TaskUpdateForm id="task-1" onOpenChange={vi.fn()} />);
    const titleInput = screen.getByDisplayValue(sampleTask.title);
    const descriptionInput = screen.getByDisplayValue(sampleTask.description);
    const submitButton = screen.getByRole('button', { name: /update task/i });

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'Updated Task');
    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'Updated description');

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(updateTaskMock).toHaveBeenCalledTimes(1);
      const updatedTask = updateTaskMock.mock.calls[0][0];
      expect(updatedTask.title).toBe('Updated Task');
      expect(updatedTask.description).toBe('Updated description');
      expect(updatedTask.id).toBe('task-1');
    });
  });
});
