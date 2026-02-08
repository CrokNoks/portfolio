import { useTheme } from './ThemeProvider';

export const useThemeToggle = () => {
  const { theme, setTheme, isDark } = useTheme();
  
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('light');
    } else {
      // System theme - toggle to opposite of current system preference
      setTheme(isDark ? 'light' : 'dark');
    }
  };

  return { toggleTheme, theme, isDark };
};
