import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

/**
 * 다크/라이트 모드를 관리하는 커스텀 훅
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // LocalStorage에서 저장된 테마 가져오기
    const saved = localStorage.getItem('theme') as Theme;
    if (saved) return saved;

    // 시스템 설정 확인
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    // 테마 변경 시 document에 적용
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}
