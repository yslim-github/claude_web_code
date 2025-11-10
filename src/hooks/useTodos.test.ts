import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTodos } from './useTodos';

describe('useTodos', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty todos', () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.todos).toEqual([]);
    expect(result.current.stats.total).toBe(0);
  });

  it('should add a todo', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('Test todo');
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Test todo');
    expect(result.current.todos[0].completed).toBe(false);
    expect(result.current.todos[0].priority).toBe('medium');
  });

  it('should add a todo with priority and due date', () => {
    const { result } = renderHook(() => useTodos());
    const dueDate = new Date('2025-12-31');

    act(() => {
      result.current.addTodo('High priority todo', 'high', dueDate);
    });

    expect(result.current.todos[0].priority).toBe('high');
    expect(result.current.todos[0].dueDate).toEqual(dueDate);
  });

  it('should toggle todo completion', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('Test todo');
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(todoId);
    });

    expect(result.current.todos[0].completed).toBe(true);

    act(() => {
      result.current.toggleTodo(todoId);
    });

    expect(result.current.todos[0].completed).toBe(false);
  });

  it('should delete a todo', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('Test todo');
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.deleteTodo(todoId);
    });

    expect(result.current.todos).toHaveLength(0);
  });

  it('should update a todo', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('Test todo');
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.updateTodo(todoId, { text: 'Updated todo', priority: 'high' });
    });

    expect(result.current.todos[0].text).toBe('Updated todo');
    expect(result.current.todos[0].priority).toBe('high');
  });

  it('should set priority', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('Test todo');
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.setPriority(todoId, 'high');
    });

    expect(result.current.todos[0].priority).toBe('high');
  });

  it('should set due date', () => {
    const { result } = renderHook(() => useTodos());
    const dueDate = new Date('2025-12-31');

    act(() => {
      result.current.addTodo('Test todo');
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.setDueDate(todoId, dueDate);
    });

    expect(result.current.todos[0].dueDate).toEqual(dueDate);
  });

  it('should calculate stats correctly', () => {
    const { result } = renderHook(() => useTodos());
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    act(() => {
      result.current.addTodo('Todo 1', 'high');
      result.current.addTodo('Todo 2', 'medium');
      result.current.addTodo('Todo 3', 'high', yesterday);
    });

    const firstTodoId = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(firstTodoId);
    });

    expect(result.current.stats.total).toBe(3);
    expect(result.current.stats.completed).toBe(1);
    expect(result.current.stats.active).toBe(2);
    expect(result.current.stats.high).toBe(2);
    expect(result.current.stats.overdue).toBe(1);
  });

  it('should persist todos in localStorage', () => {
    const { result, unmount } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('Persistent todo');
    });

    unmount();

    const { result: newResult } = renderHook(() => useTodos());
    expect(newResult.current.todos).toHaveLength(1);
    expect(newResult.current.todos[0].text).toBe('Persistent todo');
  });
});
