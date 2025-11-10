import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFilter } from './useFilter';
import type { Todo } from '../types/todo';

describe('useFilter', () => {
  const mockTodos: Todo[] = [
    {
      id: '1',
      text: 'Buy groceries',
      completed: false,
      createdAt: new Date(),
      priority: 'medium',
    },
    {
      id: '2',
      text: 'Walk the dog',
      completed: true,
      createdAt: new Date(),
      priority: 'low',
    },
    {
      id: '3',
      text: 'Finish project',
      completed: false,
      createdAt: new Date(),
      priority: 'high',
    },
  ];

  it('should initialize with "all" filter and empty search', () => {
    const { result } = renderHook(() => useFilter(mockTodos));

    expect(result.current.filter).toBe('all');
    expect(result.current.searchQuery).toBe('');
    expect(result.current.filteredTodos).toEqual(mockTodos);
  });

  it('should filter active todos', () => {
    const { result } = renderHook(() => useFilter(mockTodos));

    act(() => {
      result.current.setFilter('active');
    });

    expect(result.current.filteredTodos).toHaveLength(2);
    expect(result.current.filteredTodos.every(t => !t.completed)).toBe(true);
  });

  it('should filter completed todos', () => {
    const { result } = renderHook(() => useFilter(mockTodos));

    act(() => {
      result.current.setFilter('completed');
    });

    expect(result.current.filteredTodos).toHaveLength(1);
    expect(result.current.filteredTodos.every(t => t.completed)).toBe(true);
  });

  it('should search todos by text', () => {
    const { result } = renderHook(() => useFilter(mockTodos));

    act(() => {
      result.current.setSearchQuery('project');
    });

    expect(result.current.filteredTodos).toHaveLength(1);
    expect(result.current.filteredTodos[0].text).toBe('Finish project');
  });

  it('should search case-insensitively', () => {
    const { result } = renderHook(() => useFilter(mockTodos));

    act(() => {
      result.current.setSearchQuery('DOG');
    });

    expect(result.current.filteredTodos).toHaveLength(1);
    expect(result.current.filteredTodos[0].text).toBe('Walk the dog');
  });

  it('should combine filter and search', () => {
    const { result } = renderHook(() => useFilter(mockTodos));

    act(() => {
      result.current.setFilter('active');
      result.current.setSearchQuery('buy');
    });

    expect(result.current.filteredTodos).toHaveLength(1);
    expect(result.current.filteredTodos[0].text).toBe('Buy groceries');
    expect(result.current.filteredTodos[0].completed).toBe(false);
  });

  it('should return empty array when no todos match filter and search', () => {
    const { result } = renderHook(() => useFilter(mockTodos));

    act(() => {
      result.current.setFilter('completed');
      result.current.setSearchQuery('groceries');
    });

    expect(result.current.filteredTodos).toHaveLength(0);
  });

  it('should handle empty search query', () => {
    const { result } = renderHook(() => useFilter(mockTodos));

    act(() => {
      result.current.setSearchQuery('   ');
    });

    expect(result.current.filteredTodos).toEqual(mockTodos);
  });
});
