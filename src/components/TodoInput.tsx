import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Priority } from '../types/todo';
import Input from './common/Input';
import Button from './common/Button';

interface TodoInputProps {
  onAdd: (text: string, priority: Priority, dueDate?: Date) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      const dueDateObj = dueDate ? new Date(dueDate) : undefined;
      onAdd(text.trim(), priority, dueDateObj);
      setText('');
      setPriority('medium');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input-form">
      <div className="todo-input-main">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요..."
          className="todo-input"
        />
      </div>
      <div className="todo-input-options">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="todo-priority-select"
        >
          <option value="low">낮음</option>
          <option value="medium">보통</option>
          <option value="high">높음</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="todo-date-input"
          placeholder="마감일"
        />
        <Button type="submit" variant="primary" className="todo-add-button">
          추가
        </Button>
      </div>
    </form>
  );
}
