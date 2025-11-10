import type { Todo } from '../types/todo';
import Button from './common/Button';
import Checkbox from './common/Checkbox';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <Checkbox
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <span className="todo-text">{todo.text}</span>
      </div>
      <Button
        onClick={() => onDelete(todo.id)}
        variant="danger"
        className="todo-delete-button"
      >
        삭제
      </Button>
    </li>
  );
}
