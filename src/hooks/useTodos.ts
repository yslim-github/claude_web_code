import { useCallback } from 'react';
import type { Todo, Priority } from '../types/todo';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'todos';

/**
 * Todo 목록을 관리하는 커스텀 훅
 */
export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEY, []);

  // Todo 추가
  const addTodo = useCallback((text: string, priority: Priority = 'medium', dueDate?: Date) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
      priority,
      dueDate,
    };
    setTodos((prev) => [...prev, newTodo]);
  }, [setTodos]);

  // Todo 완료 토글
  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [setTodos]);

  // Todo 삭제
  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, [setTodos]);

  // Todo 수정 (전체 업데이트)
  const updateTodo = useCallback((id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  }, [setTodos]);

  // 우선순위 변경
  const setPriority = useCallback((id: string, priority: Priority) => {
    updateTodo(id, { priority });
  }, [updateTodo]);

  // 마감일 설정
  const setDueDate = useCallback((id: string, dueDate?: Date) => {
    updateTodo(id, { dueDate });
  }, [updateTodo]);

  // 통계
  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    active: todos.filter((t) => !t.completed).length,
    high: todos.filter((t) => t.priority === 'high').length,
    overdue: todos.filter((t) => t.dueDate && new Date(t.dueDate) < new Date() && !t.completed).length,
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    setPriority,
    setDueDate,
    stats,
  };
}
