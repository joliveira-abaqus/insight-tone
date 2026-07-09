import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';

/**
 * useTheme
 * Consumer hook for the ThemeContext. Must be used within a ThemeProvider.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
