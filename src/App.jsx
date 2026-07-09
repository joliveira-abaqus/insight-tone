import React from 'react';
import { useAppState } from './hooks/useAppState.js';
import { useFeedbackAnalysis } from './hooks/useFeedbackAnalysis.js';
import Layout from './components/Layout/Layout.jsx';
import FeedbackForm from './components/FeedbackForm/FeedbackForm.jsx';
import ResultsDashboard from './components/ResultsDashboard/ResultsDashboard.jsx';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import './styles/globals.css';

/**
 * Main Application Component
 * Manages the two-screen state requirement and coordinates all components
 */
function App() {
  const { state, isLoading, isInitial, isResults, hasResults, hasError, actions } = useAppState();
  const { formatSentimentData, formatCategoryData, formatFeedbackData, getSummaryStats } = useFeedbackAnalysis();

  // Handle form submission
  const handleFormSubmit = (feedbackText) => {
    actions.setFeedbackInput(feedbackText);
    actions.generateInsights();
  };

  // Handle back button click
  const handleBackClick = () => {
    actions.resetState();
  };

  // Clear error when user starts typing
  const handleInputChange = (text) => {
    actions.setFeedbackInput(text);
    if (hasError) {
      actions.clearError();
    }
  };

  // Render content based on current state
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50/50 dark:bg-slate-950/50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8 max-w-md w-full mx-4">
            <LoadingSpinner 
              message="Analyzing feedback..."
              size="large"
              color="blue"
            />
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                Processing your feedback to generate insights...
              </p>
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (isResults && hasResults) {
      const formattedSentiment = formatSentimentData(state.analysisResults);
      const formattedCategories = formatCategoryData(state.analysisResults);
      const formattedFeedback = formatFeedbackData(state.analysisResults);
      const summaryStats = getSummaryStats(state.analysisResults);

      return (
        <ResultsDashboard
          sentimentData={formattedSentiment}
          categoryData={formattedCategories}
          feedbackData={formattedFeedback}
          summaryStats={summaryStats}
          onBack={handleBackClick}
        />
      );
    }

    return (
      <FeedbackForm
        onSubmit={handleFormSubmit}
        feedbackInput={state.feedbackInput}
        onInputChange={handleInputChange}
        disabled={isLoading}
        error={state.error}
      />
    );
  };

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
          <Layout>
            <div className="flex-1">
              <ErrorBoundary>
                {renderContent()}
              </ErrorBoundary>
            </div>
          </Layout>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;