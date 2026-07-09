import PropTypes from 'prop-types';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.js';

/**
 * ThemeToggle Component
 * Button that switches the application between light and dark mode.
 * Shows a Moon icon in light mode (action: switch to dark) and a Sun icon
 * in dark mode (action: switch to light). Fully keyboard operable and
 * exposes its current state to assistive technologies.
 */
const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      aria-pressed={isDark}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors ${className}`}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

ThemeToggle.propTypes = {
  className: PropTypes.string,
};

export default ThemeToggle;
