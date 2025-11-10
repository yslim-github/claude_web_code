import { useState, useEffect, useMemo } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import type { Todo, FilterType } from './types/todo';
import './App.css';

const STORAGE_KEY = 'todos';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((todo: Todo) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }));
      } catch {
        return [];
      }
    }
    return [];
  });

  const [filter, setFilter] = useState<FilterType>('all');

  // LocalStorage에 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Todo 추가
  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  // Todo 완료 토글
  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Todo 삭제
  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 필터링된 Todo 목록
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

  return (
    <div className="app">
      <div className="container">
        <h1 className="app-title">Todo App</h1>
        <TodoInput onAdd={handleAddTodo} />
        <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
        <div className="todo-stats">
          <span>전체: {todos.length}</span>
          <span>완료: {todos.filter((t) => t.completed).length}</span>
          <span>진행중: {todos.filter((t) => !t.completed).length}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
