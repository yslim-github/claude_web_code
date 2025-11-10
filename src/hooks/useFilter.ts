import { useState, useMemo } from 'react';
import type { Todo, FilterType } from '../types/todo';

/**
 * Todo 필터링을 관리하는 커스텀 훅
 */
export function useFilter(todos: Todo[]) {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return {
    filter,
    setFilter,
    filteredTodos,
  };
}
