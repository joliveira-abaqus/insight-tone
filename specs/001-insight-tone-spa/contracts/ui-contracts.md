# UI Contracts: Insight Tone SPA

**Date**: 2026-07-07
**Purpose**: Define user interface contracts and component APIs for the Insight Tone application

## Component Contracts

### FeedbackForm Component

**Props Interface**:
```javascript
{
  onSubmit: (feedbackText: string) => void,
  disabled: boolean,
  initialValue?: string,
  placeholder?: string,
  maxLength?: number
}
```

**State Requirements**:
- Must maintain internal form state
- Must validate input on change
- Must call onSubmit when form is valid and submitted
- Must be disabled when loading

**UI Requirements**:
- Large text area (minimum 8 rows, 50 columns)
- Character counter display
- "Generate Insights" button (prominent, disabled when empty)
- Validation error display
- Responsive design for desktop/tablet

**Events**:
- `onSubmit`: Triggered when user submits valid feedback
- `onChange`: Triggered on text input (internal)
- `onError`: Triggered on validation errors (internal)

### ResultsDashboard Component

**Props Interface**:
```javascript
{
  analysisResults: AnalysisResults,
  onBack: () => void,
  loading?: boolean
}
```

**State Requirements**:
- Must display sentiment metrics visually
- Must render category chart using Tailwind CSS
- Must show structured feedback in table format
- Must handle empty results gracefully

**UI Requirements**:
- Sentiment metrics section with visual indicators
- Category chart using Tailwind utility classes
- Data table with sortable columns
- Back button to return to input form
- Responsive layout for desktop/tablet

**Events**:
- `onBack`: Triggered when user clicks back button
- `onSort`: Triggered when table column is sorted (internal)

### LoadingSpinner Component

**Props Interface**:
```javascript
{
  message?: string,
  size?: 'small' | 'medium' | 'large',
  color?: string
}
```

**State Requirements**:
- Must display loading animation
- Must show optional message
- Must be centered in viewport
- Must use Lucide icons

**UI Requirements**:
- Spinning animation using CSS
- Optional loading text
- Semi-transparent overlay
- Responsive sizing

**Events**:
- No external events (display-only component)

## State Management Contract

### AppState Hook

**Interface**:
```javascript
const useAppState = () => {
  const [state, setState] = useState({
    currentState: 'initial',
    feedbackInput: '',
    analysisResults: null,
    loadingProgress: 0,
    error: null
  });

  const actions = {
    setFeedbackInput: (text: string) => void,
    generateInsights: () => void,
    resetState: () => void,
    setError: (error: Error) => void
  };

  return [state, actions];
};
```

**State Transitions**:
- `initial` → `loading`: When `generateInsights()` is called
- `loading` → `results`: After 2-second timeout with mock data
- `results` → `initial`: When `resetState()` is called
- Any state → `initial`: When error occurs

**Validation Rules**:
- Feedback input must be 10-10,000 characters
- Cannot generate insights without valid input
- Must clear all data on reset

## Service Contracts

### MockDataService

**Interface**:
```javascript
const mockDataService = {
  generateSentimentAnalysis: (text: string) => SentimentAnalysis,
  generateIssueCategories: (text: string) => IssueCategory[],
  generateStructuredFeedback: (text: string) => StructuredFeedback[],
  generateAnalysisResults: (text: string) => AnalysisResults
};
```

**Data Requirements**:
- Must return deterministic results for same input
- Must generate realistic sentiment scores
- Must create meaningful category distributions
- Must produce structured feedback with highlights

**Performance Requirements**:
- Must complete within 50ms for typical input
- Must handle up to 10,000 characters
- Must not block UI thread

## Styling Contracts

### Tailwind CSS Configuration

**Color Palette**:
```javascript
const colors = {
  primary: 'blue',
  secondary: 'gray',
  success: 'green',
  warning: 'yellow',
  error: 'red',
  info: 'indigo'
};
```

**Typography Scale**:
```javascript
const typography = {
  heading: 'text-2xl font-bold',
  subheading: 'text-xl font-semibold',
  body: 'text-base',
  small: 'text-sm',
  caption: 'text-xs'
};
```

**Spacing Scale**:
```javascript
const spacing = {
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8'
};
```

**Responsive Breakpoints**:
```javascript
const breakpoints = {
  mobile: 'sm:',
  tablet: 'md:',
  desktop: 'lg:',
  wide: 'xl:'
};
```

## Accessibility Contracts

### ARIA Requirements

**Form Elements**:
- Text area must have proper label
- Button must have accessible name
- Error messages must be announced
- Loading state must be communicated

**Dashboard Elements**:
- Chart must have alternative text
- Table must have proper headers
- Navigation must be keyboard accessible
- Focus management must be maintained

**Keyboard Navigation**:
- Tab order must be logical
- Enter key must submit form
- Escape key must cancel operations
- Focus must be visible

### Screen Reader Support

**Form Feedback**:
- Character count must be announced
- Validation errors must be descriptive
- Button state changes must be communicated
- Loading progress must be indicated

**Results Display**:
- Sentiment metrics must be described
- Category data must be readable
- Table content must be navigable
- Back button must be discoverable

## Performance Contracts

### Rendering Performance

**Component Rendering**:
- Must render within 16ms (60fps)
- Must not cause layout thrashing
- Must use React.memo for expensive components
- Must implement proper key props for lists

**State Updates**:
- Must batch state updates when possible
- Must avoid unnecessary re-renders
- Must use useCallback for event handlers
- Must implement proper dependency arrays

### Bundle Performance

**Size Requirements**:
- Total bundle size must be < 50KB (gzipped)
- Must implement code splitting for large components
- Must optimize images and assets
- Must use tree shaking effectively

**Loading Performance**:
- Initial paint must be < 1.5 seconds
- Interactive must be < 3 seconds
- Must implement loading states
- Must optimize critical rendering path

## Testing Contracts

### Component Testing

**Unit Tests**:
- Must test component rendering
- Must test prop handling
- Must test event callbacks
- Must test error states

**Integration Tests**:
- Must test state management
- Must test user workflows
- Must test accessibility
- Must test responsive design

### E2E Testing

**User Scenarios**:
- Must test complete feedback workflow
- Must test state transitions
- Must test error handling
- Must test responsive behavior

**Performance Tests**:
- Must test loading performance
- Must test rendering performance
- Must test memory usage
- Must test bundle size