# Data Model: Insight Tone SPA

**Date**: 2026-07-07
**Purpose**: Define data structures and state management for the Insight Tone application

## Application State

### AppState Enum
```javascript
const APP_STATES = {
  INITIAL: 'initial',    // Form input state
  LOADING: 'loading',    // Processing insights
  RESULTS: 'results'      // Dashboard display state
};
```

### Core State Structure
```javascript
const appState = {
  currentState: APP_STATES.INITIAL,
  feedbackInput: '',
  analysisResults: null,
  loadingProgress: 0,
  error: null
};
```

## Data Entities

### FeedbackInput
```javascript
{
  id: string,           // Unique identifier
  text: string,         // Raw feedback text
  timestamp: Date,      // When input was received
  length: number        // Character count
}
```

### SentimentAnalysis
```javascript
{
  overall: 'positive' | 'negative' | 'neutral',
  confidence: number,   // 0.0 to 1.0
  breakdown: {
    positive: number,   // Percentage 0-100
    negative: number,   // Percentage 0-100
    neutral: number     // Percentage 0-100
  },
  keyPhrases: string[]  // Important phrases detected
}
```

### IssueCategory
```javascript
{
  id: string,           // Category identifier
  name: string,         // Display name
  count: number,        // Number of feedback items
  percentage: number,   // Percentage of total
  color: string,        // Tailwind color class
  description: string   // Brief description
}
```

### StructuredFeedback
```javascript
{
  id: string,           // Unique identifier
  originalText: string, // Original feedback text
  sentiment: 'positive' | 'negative' | 'neutral',
  category: string,     // Assigned category
  confidence: number,   // Classification confidence
  timestamp: Date,      // Processing timestamp
  highlights: string[] // Key phrases or highlights
}
```

### AnalysisResults
```javascript
{
  id: string,           // Analysis session ID
  sentiment: SentimentAnalysis,
  categories: IssueCategory[],
  feedback: StructuredFeedback[],
  summary: {
    totalItems: number,
    processedAt: Date,
    processingTime: number // milliseconds
  }
}
```

## State Transitions

### Initial → Loading
```javascript
// Trigger: User clicks "Generate Insights"
{
  currentState: APP_STATES.LOADING,
  feedbackInput: 'user feedback text',
  analysisResults: null,
  loadingProgress: 0,
  error: null
}
```

### Loading → Results
```javascript
// Trigger: 2-second timeout completes
{
  currentState: APP_STATES.RESULTS,
  feedbackInput: 'user feedback text',
  analysisResults: AnalysisResults,
  loadingProgress: 100,
  error: null
}
```

### Results → Initial
```javascript
// Trigger: User clicks "Back" button
{
  currentState: APP_STATES.INITIAL,
  feedbackInput: '',
  analysisResults: null,
  loadingProgress: 0,
  error: null
}
```

## Validation Rules

### Feedback Input Validation
- Minimum length: 10 characters
- Maximum length: 10,000 characters
- Must contain at least one alphanumeric character
- Cannot be only whitespace

### State Validation
- Cannot transition to RESULTS without valid analysis results
- Cannot transition to LOADING without feedback input
- Must clear all data when returning to INITIAL state

## Mock Data Structure

### Sample Sentiment Analysis
```javascript
{
  overall: 'positive',
  confidence: 0.87,
  breakdown: {
    positive: 65,
    negative: 20,
    neutral: 15
  },
  keyPhrases: ['user friendly', 'great experience', 'easy to use']
}
```

### Sample Issue Categories
```javascript
[
  {
    id: 'ui-ux',
    name: 'UI/UX',
    count: 45,
    percentage: 35,
    color: 'blue',
    description: 'User interface and experience feedback'
  },
  {
    id: 'performance',
    name: 'Performance',
    count: 28,
    percentage: 22,
    color: 'green',
    description: 'Application performance and speed'
  },
  {
    id: 'features',
    name: 'Features',
    count: 32,
    percentage: 25,
    color: 'purple',
    description: 'Feature requests and functionality'
  },
  {
    id: 'bugs',
    name: 'Bugs',
    count: 23,
    percentage: 18,
    color: 'red',
    description: 'Bug reports and issues'
  }
]
```

## Data Flow

### Input Processing Flow
1. User enters feedback text
2. Validate input length and content
3. Transition to LOADING state
4. Generate mock analysis results
5. Transition to RESULTS state
6. Display analysis dashboard

### Reset Flow
1. User clicks "Back" button
2. Clear all state data
3. Transition to INITIAL state
4. Reset form fields

## Error Handling

### Error States
```javascript
{
  currentState: APP_STATES.INITIAL,
  feedbackInput: '',
  analysisResults: null,
  loadingProgress: 0,
  error: {
    code: 'INVALID_INPUT',
    message: 'Feedback text must be between 10 and 10,000 characters',
    timestamp: Date
  }
}
```

### Error Recovery
- Display error message to user
- Maintain current state (don't lose user input)
- Allow user to correct and retry
- Clear error on successful operation

## Performance Considerations

### Memory Management
- Clear analysis results when returning to INITIAL state
- Limit feedback history to prevent memory leaks
- Use React.memo for expensive components

### Rendering Optimization
- Lazy load results dashboard components
- Virtualize large feedback tables
- Debounce input validation

## Testing Data

### Test Scenarios
- Empty input validation
- Maximum length input handling
- Special character processing
- State transition verification
- Error state testing

### Mock Data Generation
- Deterministic test data for consistent testing
- Edge case data for boundary testing
- Performance data for load testing