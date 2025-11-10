import Input from './common/Input';

interface TodoSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function TodoSearch({ searchQuery, onSearchChange }: TodoSearchProps) {
  return (
    <div className="todo-search">
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="🔍 검색..."
        className="todo-search-input"
      />
    </div>
  );
}
