import { useState } from 'react';
import type { Todo, Priority } from '../types/todo';
import Button from './common/Button';
import Checkbox from './common/Checkbox';
import Input from './common/Input';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [editDueDate, setEditDueDate] = useState(
    todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
  );

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, {
        text: editText.trim(),
        priority: editPriority,
        dueDate: editDueDate ? new Date(editDueDate) : undefined,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '');
    setIsEditing(false);
  };

  const getPriorityLabel = (priority: Priority) => {
    const labels = { low: '낮음', medium: '보통', high: '높음' };
    return labels[priority];
  };

  const getPriorityClass = (priority: Priority) => {
    return `priority-badge priority-${priority}`;
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  if (isEditing) {
    return (
      <li className="todo-item editing">
        <div className="todo-edit-form">
          <Input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="todo-edit-input"
          />
          <div className="todo-edit-options">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Priority)}
              className="todo-priority-select"
            >
              <option value="low">낮음</option>
              <option value="medium">보통</option>
              <option value="high">높음</option>
            </select>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="todo-date-input"
            />
          </div>
          <div className="todo-edit-actions">
            <Button onClick={handleSave} variant="primary" className="todo-save-button">
              저장
            </Button>
            <Button onClick={handleCancel} variant="secondary" className="todo-cancel-button">
              취소
            </Button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="todo-content">
        <Checkbox
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <div className="todo-details">
          <span className="todo-text">{todo.text}</span>
          <div className="todo-meta">
            <span className={getPriorityClass(todo.priority)}>
              {getPriorityLabel(todo.priority)}
            </span>
            {todo.dueDate && (
              <span className={`todo-due-date ${isOverdue ? 'overdue' : ''}`}>
                📅 {new Date(todo.dueDate).toLocaleDateString('ko-KR')}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="todo-actions">
        <Button
          onClick={() => setIsEditing(true)}
          variant="secondary"
          className="todo-edit-button"
        >
          수정
        </Button>
        <Button
          onClick={() => onDelete(todo.id)}
          variant="danger"
          className="todo-delete-button"
        >
          삭제
        </Button>
      </div>
    </li>
  );
}
