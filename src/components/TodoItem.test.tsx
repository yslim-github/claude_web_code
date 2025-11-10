import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from './TodoItem';
import type { Todo } from '../types/todo';

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: '1',
    text: 'Test todo',
    completed: false,
    createdAt: new Date(),
    priority: 'medium',
  };

  it('should render todo text', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const mockOnUpdate = vi.fn();

    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('should call onToggle when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const mockOnUpdate = vi.fn();

    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('should call onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const mockOnUpdate = vi.fn();

    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const deleteButton = screen.getByRole('button', { name: '삭제' });
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('should enter edit mode when edit button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const mockOnUpdate = vi.fn();

    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const editButton = screen.getByRole('button', { name: '수정' });
    await user.click(editButton);

    expect(screen.getByRole('button', { name: '저장' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument();
  });

  it('should save changes when save button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const mockOnUpdate = vi.fn();

    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const editButton = screen.getByRole('button', { name: '수정' });
    await user.click(editButton);

    const input = screen.getByDisplayValue('Test todo');
    await user.clear(input);
    await user.type(input, 'Updated todo');

    const saveButton = screen.getByRole('button', { name: '저장' });
    await user.click(saveButton);

    expect(mockOnUpdate).toHaveBeenCalledWith('1', {
      text: 'Updated todo',
      priority: 'medium',
      dueDate: undefined,
    });
  });

  it('should cancel editing when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const mockOnUpdate = vi.fn();

    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const editButton = screen.getByRole('button', { name: '수정' });
    await user.click(editButton);

    const input = screen.getByDisplayValue('Test todo');
    await user.clear(input);
    await user.type(input, 'Changed text');

    const cancelButton = screen.getByRole('button', { name: '취소' });
    await user.click(cancelButton);

    expect(mockOnUpdate).not.toHaveBeenCalled();
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('should display priority badge', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const mockOnUpdate = vi.fn();

    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByText('보통')).toBeInTheDocument();
  });

  it('should display due date when present', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const mockOnUpdate = vi.fn();

    const todoWithDueDate: Todo = {
      ...mockTodo,
      dueDate: new Date('2025-12-31'),
    };

    render(
      <TodoItem
        todo={todoWithDueDate}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });

  it('should apply completed class when todo is completed', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const mockOnUpdate = vi.fn();

    const completedTodo: Todo = {
      ...mockTodo,
      completed: true,
    };

    const { container } = render(
      <TodoItem
        todo={completedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const todoItem = container.querySelector('.todo-item');
    expect(todoItem).toHaveClass('completed');
  });

  it('should apply overdue class when todo is overdue', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const mockOnUpdate = vi.fn();

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const overdueTodo: Todo = {
      ...mockTodo,
      dueDate: yesterday,
    };

    const { container } = render(
      <TodoItem
        todo={overdueTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const todoItem = container.querySelector('.todo-item');
    expect(todoItem).toHaveClass('overdue');
  });
});
