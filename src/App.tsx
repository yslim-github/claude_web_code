import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import ThemeToggle from './components/ThemeToggle';
import { useTodos } from './hooks/useTodos';
import { useFilter } from './hooks/useFilter';
import { useTheme } from './hooks/useTheme';
import './App.css';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, stats } = useTodos();
  const { filter, setFilter, filteredTodos } = useFilter(todos);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app">
      <div className="container">
        <div className="app-header">
          <h1 className="app-title">Todo App</h1>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
        <TodoInput onAdd={addTodo} />
        <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
        <div className="todo-stats">
          <span>전체: {stats.total}</span>
          <span>완료: {stats.completed}</span>
          <span>진행중: {stats.active}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
