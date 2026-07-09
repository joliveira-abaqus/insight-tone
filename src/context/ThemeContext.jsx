import { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * ThemeContext
 * Holds the active theme ("light" | "dark") and exposes controls to change it.
 * The selected theme is applied as a `dark` class on the root <html> element
 * and persisted in localStorage so it is reapplied on the next visit.
 */

export const THEME_STORAGE_KEY = 'insight-tone-theme';
const VALID_THEMES = ['light', 'dark'];
const DEFAULT_THEME = 'light';

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext(undefined);

const isValidTheme = (value) => VALID_THEMES.includes(value);

const readStoredTheme = () => {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isValidTheme(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};

const applyThemeClass = (theme) => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(readStoredTheme);

  useEffect(() => {
    applyThemeClass(theme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore persistence failures (e.g. storage disabled); the theme still applies for this session.
    }
  }, [theme]);

  const setTheme = useCallback((value) => {
    if (isValidTheme(value)) {
      setThemeState(value);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
