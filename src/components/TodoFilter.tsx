import type { FilterType } from '../types/todo';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function TodoFilter({ currentFilter, onFilterChange }: TodoFilterProps) {
  const filters: { type: FilterType; label: string }[] = [
    { type: 'all', label: '전체' },
    { type: 'active', label: '진행중' },
    { type: 'completed', label: '완료' },
  ];

  return (
    <div className="todo-filter">
      {filters.map(({ type, label }) => (
        <button
          key={type}
          onClick={() => onFilterChange(type)}
          className={`filter-button ${currentFilter === type ? 'active' : ''}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
