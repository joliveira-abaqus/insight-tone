import { VALIDATION_RULES } from './constants.js';

/**
 * Validates feedback input text
 * @param {string} text - The feedback text to validate
 * @returns {Object} - Validation result with isValid and message
 */
export const validateFeedbackInput = (text) => {
  if (!text || text.trim().length === 0) {
    return {
      isValid: false,
      message: 'Please enter feedback text.',
    };
  }

  if (text.length < VALIDATION_RULES.MIN_FEEDBACK_LENGTH) {
    return {
      isValid: false,
      message: `Feedback must be at least ${VALIDATION_RULES.MIN_FEEDBACK_LENGTH} characters.`,
    };
  }

  if (text.length > VALIDATION_RULES.MAX_FEEDBACK_LENGTH) {
    return {
      isValid: false,
      message: `Feedback cannot exceed ${VALIDATION_RULES.MAX_FEEDBACK_LENGTH} characters.`,
    };
  }

  return {
    isValid: true,
    message: '',
  };
};

/**
 * Formats text for display with proper truncation
 * @param {string} text - The text to format
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} - Formatted text
 */
export const formatTextDisplay = (text, maxLength = 100) => {
  if (!text) return '';
  
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

/**
 * Generates a unique ID for feedback items
 * @returns {string} - Unique identifier
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Calculates percentage for display
 * @param {number} value - The value
 * @param {number} total - The total
 * @returns {number} - Percentage rounded to 1 decimal place
 */
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100 * 10) / 10;
};

/**
 * Formats timestamp for display
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string
 */
export const formatTimestamp = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Debounces function calls
 * @param {Function} func - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};