import type { Theme } from '../hooks/useTheme';
import Button from './common/Button';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <Button
      onClick={onToggle}
      variant="secondary"
      className="theme-toggle"
      aria-label="테마 토글"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
}
