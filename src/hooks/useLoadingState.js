import { useState, useCallback, useEffect } from 'react';
import { LOADING_CONFIG } from '../utils/constants.js';

/**
 * Custom hook for managing loading states and progress
 * Provides loading simulation and progress tracking
 */
export const useLoadingState = () => {
  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    progress: 0,
    message: '',
    startTime: null,
    estimatedDuration: LOADING_CONFIG.DURATION,
  });

  /**
   * Starts loading with progress simulation
   * @param {string} message - Loading message
   * @param {number} duration - Estimated duration in milliseconds
   */
  const startLoading = useCallback((message = LOADING_CONFIG.MESSAGE, duration = LOADING_CONFIG.DURATION) => {
    setLoadingState({
      isLoading: true,
      progress: 0,
      message,
      startTime: Date.now(),
      estimatedDuration: duration,
    });
  }, []);

  /**
   * Updates loading progress
   * @param {number} progress - Progress percentage (0-100)
   */
  const updateProgress = useCallback((progress) => {
    setLoadingState(prev => ({
      ...prev,
      progress: Math.max(0, Math.min(100, progress)),
    }));
  }, []);

  /**
   * Updates loading message
   * @param {string} message - New loading message
   */
  const updateMessage = useCallback((message) => {
    setLoadingState(prev => ({
      ...prev,
      message,
    }));
  }, []);

  /**
   * Stops loading and resets state
   */
  const stopLoading = useCallback(() => {
    setLoadingState({
      isLoading: false,
      progress: 0,
      message: '',
      startTime: null,
      estimatedDuration: LOADING_CONFIG.DURATION,
    });
  }, []);

  /**
   * Simulates loading progress automatically
   * @param {number} duration - Duration in milliseconds
   * @param {string} message - Loading message
   * @returns {Promise} - Promise that resolves when loading is complete
   */
  const simulateLoading = useCallback(async (duration = LOADING_CONFIG.DURATION, message = LOADING_CONFIG.MESSAGE) => {
    startLoading(message, duration);
    
    return new Promise((resolve) => {
      const intervalTime = 100; // Update every 100ms
      const totalSteps = duration / intervalTime;
      let currentStep = 0;
      
      const interval = setInterval(() => {
        currentStep++;
        const progress = Math.min((currentStep / totalSteps) * 100, 95); // Cap at 95% until completion
        
        updateProgress(progress);
        
        if (currentStep >= totalSteps) {
          clearInterval(interval);
          updateProgress(100);
          setTimeout(() => {
            stopLoading();
            resolve();
          }, 100); // Brief pause at 100%
        }
      }, intervalTime);
    });
  }, [startLoading, updateProgress, stopLoading]);

  /**
   * Calculates remaining time
   * @returns {number} - Remaining time in milliseconds
   */
  const getRemainingTime = useCallback(() => {
    if (!loadingState.isLoading || !loadingState.startTime) {
      return 0;
    }
    
    const elapsed = Date.now() - loadingState.startTime;
    const remaining = Math.max(0, loadingState.estimatedDuration - elapsed);
    
    return remaining;
  }, [loadingState]);

  /**
   * Gets formatted remaining time
   * @returns {string} - Formatted time string
   */
  const getFormattedRemainingTime = useCallback(() => {
    const remaining = getRemainingTime();
    
    if (remaining === 0) return 'Complete';
    
    const seconds = Math.ceil(remaining / 1000);
    
    if (seconds < 60) {
      return `${seconds}s remaining`;
    }
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}m ${remainingSeconds}s remaining`;
  }, [getRemainingTime]);

  /**
   * Gets progress bar color based on progress
   * @returns {string} - Tailwind color class
   */
  const getProgressColor = useCallback(() => {
    if (loadingState.progress < 30) return 'bg-blue-500';
    if (loadingState.progress < 70) return 'bg-blue-600';
    if (loadingState.progress < 90) return 'bg-blue-700';
    return 'bg-green-500';
  }, [loadingState.progress]);

  /**
   * Auto-cleanup effect
   */
  useEffect(() => {
    return () => {
      // Cleanup any ongoing intervals when component unmounts
      if (loadingState.isLoading) {
        stopLoading();
      }
    };
  }, [loadingState.isLoading, stopLoading]);

  return {
    // State
    loadingState,
    
    // Computed values
    isLoading: loadingState.isLoading,
    progress: loadingState.progress,
    message: loadingState.message,
    remainingTime: getRemainingTime(),
    formattedRemainingTime: getFormattedRemainingTime(),
    progressColor: getProgressColor(),
    
    // Actions
    startLoading,
    updateProgress,
    updateMessage,
    stopLoading,
    simulateLoading,
  };
};