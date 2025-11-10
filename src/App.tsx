import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import TodoSearch from './components/TodoSearch';
import ThemeToggle from './components/ThemeToggle';
import { useTodos } from './hooks/useTodos';
import { useFilter } from './hooks/useFilter';
import { useTheme } from './hooks/useTheme';
import './App.css';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo, stats } = useTodos();
  const { filter, setFilter, searchQuery, setSearchQuery, filteredTodos } = useFilter(todos);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app">
      <div className="container">
        <div className="app-header">
          <h1 className="app-title">Todo App</h1>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
        <TodoInput onAdd={addTodo} />
        <div className="todo-controls">
          <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
          <TodoSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
        <div className="todo-stats">
          <span>전체: {stats.total}</span>
          <span>완료: {stats.completed}</span>
          <span>진행중: {stats.active}</span>
          <span className="stat-priority">높음: {stats.high}</span>
          {stats.overdue > 0 && <span className="stat-overdue">⚠️ 지연: {stats.overdue}</span>}
        </div>
      </div>
    </div>
  );
}

export default App;
