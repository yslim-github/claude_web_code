import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';
import type { Todo } from '../types/todo';

describe('TodoList', () => {
  const mockTodos: Todo[] = [
    {
      id: '1',
      text: 'Todo 1',
      completed: false,
      createdAt: new Date(),
      priority: 'medium',
    },
    {
      id: '2',
      text: 'Todo 2',
      completed: true,
      createdAt: new Date(),
      priority: 'high',
    },
  ];

  it('should render all todos', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const mockOnUpdate = vi.fn();

    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('should render empty message when no todos', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const mockOnUpdate = vi.fn();

    render(
      <TodoList
        todos={[]}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByText('할 일이 없습니다.')).toBeInTheDocument();
  });

  it('should render todos as a list', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const mockOnUpdate = vi.fn();

    const { container } = render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const list = container.querySelector('.todo-list');
    expect(list).toBeInTheDocument();
    expect(list?.tagName).toBe('UL');
  });

  it('should pass correct props to TodoItem components', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const mockOnUpdate = vi.fn();

    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    // Both todos should be rendered
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(2);
  });
});
