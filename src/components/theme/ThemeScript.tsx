export function ThemeScript() {
  const themeScript = `
    (function() {
      function getTheme() {
        try {
          const stored = localStorage.getItem('theme');
          if (stored && ['light', 'dark', 'system'].includes(stored)) {
            return stored;
          }
          
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          return prefersDark ? 'dark' : 'light';
        } catch (e) {
          return 'light';
        }
      }
      
      function applyTheme(theme) {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        
        let actualTheme;
        if (theme === 'system') {
          actualTheme = window.matchMedia('(prefers-color-scheme: dark').matches ? 'dark' : 'light';
        } else {
          actualTheme = theme;
        }
        
        root.classList.add(actualTheme);
        root.setAttribute('data-theme', actualTheme);
      }
      
      const theme = getTheme();
      applyTheme(theme);
      
      // Listen for system theme changes when using 'system' theme
      if (theme === 'system') {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
          applyTheme('system');
        });
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
}
