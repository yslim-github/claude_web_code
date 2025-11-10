import { useState, useMemo } from 'react';
import type { Todo, FilterType } from '../types/todo';

/**
 * Todo 필터링 및 검색을 관리하는 커스텀 훅
 */
export function useFilter(todos: Todo[]) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTodos = useMemo(() => {
    let result = todos;

    // 상태별 필터링
    switch (filter) {
      case 'active':
        result = result.filter((todo) => !todo.completed);
        break;
      case 'completed':
        result = result.filter((todo) => todo.completed);
        break;
    }

    // 검색어 필터링
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((todo) =>
        todo.text.toLowerCase().includes(query)
      );
    }

    return result;
  }, [todos, filter, searchQuery]);

  return {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    filteredTodos,
  };
}
