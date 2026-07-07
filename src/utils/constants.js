// Application States
export const APP_STATES = {
  INITIAL: 'initial',
  LOADING: 'loading',
  RESULTS: 'results',
};

// Validation Rules
export const VALIDATION_RULES = {
  MIN_FEEDBACK_LENGTH: 10,
  MAX_FEEDBACK_LENGTH: 10000,
};

// Loading Configuration
export const LOADING_CONFIG = {
  DURATION: 2000, // 2 seconds
  MESSAGE: 'Analyzing feedback...',
};

// UI Messages
export const UI_MESSAGES = {
  EMPTY_FEEDBACK_ERROR: 'Please enter at least 10 characters of feedback.',
  FEEDBACK_PLACEHOLDER: 'Paste user feedback here to analyze sentiment and categorize issues...',
  GENERATE_INSIGHTS: 'Generate Insights',
  BACK_TO_FORM: 'Back',
  LOADING: 'Analyzing feedback...',
};

// Sentiment Categories
export const SENTIMENT_CATEGORIES = {
  POSITIVE: 'positive',
  NEGATIVE: 'negative',
  NEUTRAL: 'neutral',
};

// Issue Categories (for mock data)
export const ISSUE_CATEGORIES = {
  UI_UX: 'ui-ux',
  PERFORMANCE: 'performance',
  FEATURES: 'features',
  BUGS: 'bugs',
};

// Color Mapping for Categories
export const CATEGORY_COLORS = {
  'ui-ux': 'blue',
  'performance': 'green',
  'features': 'purple',
  'bugs': 'red',
};