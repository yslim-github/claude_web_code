import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoFilter from './TodoFilter';

describe('TodoFilter', () => {
  it('should render all filter buttons', () => {
    const mockOnFilterChange = vi.fn();
    render(<TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />);

    expect(screen.getByRole('button', { name: '전체' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '진행중' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '완료' })).toBeInTheDocument();
  });

  it('should call onFilterChange when filter button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnFilterChange = vi.fn();
    render(<TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />);

    const activeButton = screen.getByRole('button', { name: '진행중' });
    await user.click(activeButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith('active');
  });

  it('should apply active class to current filter', () => {
    const mockOnFilterChange = vi.fn();
    const { container } = render(
      <TodoFilter currentFilter="active" onFilterChange={mockOnFilterChange} />
    );

    const buttons = container.querySelectorAll('.filter-button');
    const activeButton = Array.from(buttons).find(btn => btn.textContent === '진행중');

    expect(activeButton).toHaveClass('active');
  });

  it('should not apply active class to inactive filters', () => {
    const mockOnFilterChange = vi.fn();
    const { container } = render(
      <TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />
    );

    const buttons = container.querySelectorAll('.filter-button');
    const completedButton = Array.from(buttons).find(btn => btn.textContent === '완료');

    expect(completedButton).not.toHaveClass('active');
  });

  it('should call onFilterChange with correct filter type for each button', async () => {
    const user = userEvent.setup();
    const mockOnFilterChange = vi.fn();
    render(<TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />);

    await user.click(screen.getByRole('button', { name: '전체' }));
    expect(mockOnFilterChange).toHaveBeenCalledWith('all');

    await user.click(screen.getByRole('button', { name: '진행중' }));
    expect(mockOnFilterChange).toHaveBeenCalledWith('active');

    await user.click(screen.getByRole('button', { name: '완료' }));
    expect(mockOnFilterChange).toHaveBeenCalledWith('completed');
  });
});
