import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoSearch from './TodoSearch';

describe('TodoSearch', () => {
  it('should render search input', () => {
    const mockOnSearchChange = vi.fn();
    render(<TodoSearch searchQuery="" onSearchChange={mockOnSearchChange} />);

    expect(screen.getByPlaceholderText('🔍 검색...')).toBeInTheDocument();
  });

  it('should display current search query', () => {
    const mockOnSearchChange = vi.fn();
    render(<TodoSearch searchQuery="test query" onSearchChange={mockOnSearchChange} />);

    const input = screen.getByPlaceholderText('🔍 검색...') as HTMLInputElement;
    expect(input.value).toBe('test query');
  });

  it('should call onSearchChange when input value changes', async () => {
    const user = userEvent.setup();
    const mockOnSearchChange = vi.fn();
    render(<TodoSearch searchQuery="" onSearchChange={mockOnSearchChange} />);

    const input = screen.getByPlaceholderText('🔍 검색...');
    await user.type(input, 'new search');

    expect(mockOnSearchChange).toHaveBeenCalled();
  });

  it('should handle empty search query', () => {
    const mockOnSearchChange = vi.fn();
    render(<TodoSearch searchQuery="" onSearchChange={mockOnSearchChange} />);

    const input = screen.getByPlaceholderText('🔍 검색...') as HTMLInputElement;
    expect(input.value).toBe('');
  });
});
