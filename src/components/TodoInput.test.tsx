import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoInput from './TodoInput';

describe('TodoInput', () => {
  it('should render input, priority select, date input, and button', () => {
    const mockOnAdd = vi.fn();
    render(<TodoInput onAdd={mockOnAdd} />);

    expect(screen.getByPlaceholderText('할 일을 입력하세요...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '추가' })).toBeInTheDocument();
  });

  it('should call onAdd with text when form is submitted', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoInput onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText('할 일을 입력하세요...');
    const button = screen.getByRole('button', { name: '추가' });

    await user.type(input, 'New todo');
    await user.click(button);

    expect(mockOnAdd).toHaveBeenCalledWith('New todo', 'medium', undefined);
  });

  it('should clear input after submission', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoInput onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText('할 일을 입력하세요...') as HTMLInputElement;
    const button = screen.getByRole('button', { name: '추가' });

    await user.type(input, 'New todo');
    await user.click(button);

    expect(input.value).toBe('');
  });

  it('should not call onAdd when input is empty', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoInput onAdd={mockOnAdd} />);

    const button = screen.getByRole('button', { name: '추가' });
    await user.click(button);

    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('should trim whitespace from input', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoInput onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText('할 일을 입력하세요...');
    const button = screen.getByRole('button', { name: '추가' });

    await user.type(input, '  Todo with spaces  ');
    await user.click(button);

    expect(mockOnAdd).toHaveBeenCalledWith('Todo with spaces', 'medium', undefined);
  });

  it('should handle priority selection', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoInput onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText('할 일을 입력하세요...');
    const prioritySelect = screen.getByRole('combobox');
    const button = screen.getByRole('button', { name: '추가' });

    await user.type(input, 'High priority todo');
    await user.selectOptions(prioritySelect, 'high');
    await user.click(button);

    expect(mockOnAdd).toHaveBeenCalledWith('High priority todo', 'high', undefined);
  });

  it('should handle due date selection', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoInput onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText('할 일을 입력하세요...');
    const dateInput = screen.getByPlaceholderText('마감일');
    const button = screen.getByRole('button', { name: '추가' });

    await user.type(input, 'Todo with deadline');
    await user.type(dateInput, '2025-12-31');
    await user.click(button);

    expect(mockOnAdd).toHaveBeenCalled();
    const callArgs = mockOnAdd.mock.calls[0];
    expect(callArgs[0]).toBe('Todo with deadline');
    expect(callArgs[1]).toBe('medium');
    expect(callArgs[2]).toBeInstanceOf(Date);
  });

  it('should reset priority and date after submission', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoInput onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText('할 일을 입력하세요...');
    const prioritySelect = screen.getByRole('combobox') as HTMLSelectElement;
    const dateInput = screen.getByPlaceholderText('마감일') as HTMLInputElement;
    const button = screen.getByRole('button', { name: '추가' });

    await user.type(input, 'Test todo');
    await user.selectOptions(prioritySelect, 'high');
    await user.type(dateInput, '2025-12-31');
    await user.click(button);

    expect(prioritySelect.value).toBe('medium');
    expect(dateInput.value).toBe('');
  });
});
