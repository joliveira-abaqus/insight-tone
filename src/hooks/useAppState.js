import { useState, useCallback } from 'react';
import { APP_STATES, LOADING_CONFIG } from '../utils/constants.js';
import { analyzeFeedback } from '../services/sentimentAnalysisService.js';

/**
 * Custom hook for managing application state
 * Handles the two-screen state requirement with loading simulation
 */
export const useAppState = () => {
  const [state, setState] = useState({
    currentState: APP_STATES.INITIAL,
    feedbackInput: '',
    analysisResults: null,
    loadingProgress: 0,
    error: null,
  });

  /**
   * Sets the feedback input text
   * @param {string} text - The feedback text
   */
  const setFeedbackInput = useCallback((text) => {
    setState(prev => ({
      ...prev,
      feedbackInput: text,
      error: null,
    }));
  }, []);

  /**
   * Generates insights from feedback
   * Implements the 2-second loading simulation
   */
  const generateInsights = useCallback(async () => {
    if (state.feedbackInput.trim().length < 10) {
      setState(prev => ({
        ...prev,
        error: 'Please enter at least 10 characters of feedback.',
      }));
      return;
    }

    // Start loading state
    setState(prev => ({
      ...prev,
      currentState: APP_STATES.LOADING,
      error: null,
      loadingProgress: 0,
    }));

    try {
      // Simulate loading progress
      const progressInterval = setInterval(() => {
        setState(prev => ({
          ...prev,
          loadingProgress: Math.min(prev.loadingProgress + 25, 90),
        }));
      }, 400);

      // Wait for 2 seconds (as specified)
      await new Promise(resolve => setTimeout(resolve, LOADING_CONFIG.DURATION));
      
      clearInterval(progressInterval);

      // Analyze feedback
      const result = await analyzeFeedback(state.feedbackInput);
      
      if (result.success) {
        setState(prev => ({
          ...prev,
          currentState: APP_STATES.RESULTS,
          analysisResults: result.data,
          loadingProgress: 100,
          error: null,
        }));
      } else {
        throw new Error(result.error?.message || 'Analysis failed');
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        currentState: APP_STATES.INITIAL,
        error: error.message || 'Failed to analyze feedback. Please try again.',
        loadingProgress: 0,
      }));
    }
  }, [state.feedbackInput]);

  /**
   * Resets the application state to initial
   * Clears all data as required by specification
   */
  const resetState = useCallback(() => {
    setState({
      currentState: APP_STATES.INITIAL,
      feedbackInput: '',
      analysisResults: null,
      loadingProgress: 0,
      error: null,
    });
  }, []);

  /**
   * Sets error state
   * @param {string} error - The error message
   */
  const setError = useCallback((error) => {
    setState(prev => ({
      ...prev,
      error: error,
    }));
  }, []);

  /**
   * Clear any existing error
   */
  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
    }));
  }, []);

  return {
    // State
    state,
    
    // Computed values
    isLoading: state.currentState === APP_STATES.LOADING,
    isInitial: state.currentState === APP_STATES.INITIAL,
    isResults: state.currentState === APP_STATES.RESULTS,
    hasResults: state.analysisResults !== null,
    hasError: state.error !== null,
    
    // Actions
    actions: {
      setFeedbackInput,
      generateInsights,
      resetState,
      setError,
      clearError,
    },
  };
};