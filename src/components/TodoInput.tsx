import { useState } from 'react';
import type { FormEvent } from 'react';
import Input from './common/Input';
import Button from './common/Button';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input-form">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일을 입력하세요..."
        className="todo-input"
      />
      <Button type="submit" variant="primary" className="todo-add-button">
        추가
      </Button>
    </form>
  );
}
