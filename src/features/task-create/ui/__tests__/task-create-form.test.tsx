import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TaskPriority, TaskStatus } from '@/entities/task';

import { TaskCreateForm } from '../task-create-form';

const addTaskMock = vi.fn();
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
  TaskPriorityBadge: ({ priority }: { priority: string }) => (
    <div>{priority}</div>
  ),
  useTaskStore: (
    selector: (state: { addTask: typeof addTaskMock }) => unknown
  ) => selector({ addTask: addTaskMock }),
}));

describe('TaskCreateForm Unit Tests', () => {
  beforeEach(() => {
    addTaskMock.mockReset();
  });

  it('renders all form fields', () => {
    render(<TaskCreateForm />);
    expect(
      screen.getByPlaceholderText(/enter task title/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter task description/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/pick a date/i)).toBeInTheDocument();
  });

  it('initializes form with defaultValues', () => {
    const defaultValues = {
      title: 'Test Title',
      description: 'Test Description',
      status: TaskStatus.COMPLETED,
      priority: TaskPriority.HIGH,
      deadline: new Date(2025, 5, 10).toISOString(),
    };

    render(<TaskCreateForm defaultValues={defaultValues} />);
    expect(screen.getByDisplayValue(defaultValues.title)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(defaultValues.description)
    ).toBeInTheDocument();
    expect(screen.getByText(defaultValues.status)).toBeInTheDocument();
    expect(screen.getByText(defaultValues.priority)).toBeInTheDocument();
    expect(screen.getByText('June 10th, 2025')).toBeInTheDocument();
  });

  it('disables fields when disabledValues are provided', () => {
    render(
      <TaskCreateForm
        disabledValues={{
          title: true,
          description: true,
          status: true,
          priority: true,
          deadline: true,
        }}
      />
    );

    expect(screen.getByPlaceholderText(/enter task title/i)).toBeDisabled();
    expect(
      screen.getByPlaceholderText(/enter task description/i)
    ).toBeDisabled();
    expect(screen.getByRole('combobox', { name: /status/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /deadline/i })).toBeDisabled();
  });

  it('submits form and calls addTask with correct data', async () => {
    render(<TaskCreateForm onOpenChange={vi.fn()} />);
    const titleInput = screen.getByPlaceholderText(/enter task title/i);
    const descriptionInput = screen.getByPlaceholderText(
      /enter task description/i
    );
    const submitButton = screen.getByRole('button', { name: /add task/i });

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'New Task');
    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'New task description');

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(addTaskMock).toHaveBeenCalledTimes(1);
      const submittedTask = addTaskMock.mock.calls[0][0];
      expect(submittedTask.title).toBe('New Task');
      expect(submittedTask.description).toBe('New task description');
      expect(submittedTask.id).toBeDefined();
      expect(submittedTask.createdAt).toBeDefined();
    });
  });
});
