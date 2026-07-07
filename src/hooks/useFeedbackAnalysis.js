import { useCallback } from 'react';
import { getSentimentSummary, getCategoryDistribution, getTopIssues } from '../services/sentimentAnalysisService.js';

/**
 * Custom hook for processing and formatting analysis results
 * Provides formatted data for UI components
 */
export const useFeedbackAnalysis = () => {
  /**
   * Formats sentiment data for display
   * @param {Object} analysisResults - Raw analysis results
   * @returns {Object} - Formatted sentiment data
   */
  const formatSentimentData = useCallback((analysisResults) => {
    const summary = getSentimentSummary(analysisResults);
    
    return {
      overall: summary.overall,
      confidence: Math.round(summary.confidence * 100),
      breakdown: summary.breakdown,
      displayText: {
        positive: `${summary.breakdown.positive}% Positive`,
        negative: `${summary.breakdown.negative}% Negative`, 
        neutral: `${summary.breakdown.neutral}% Neutral`,
      },
      color: summary.overall === 'positive' ? 'green' : 
              summary.overall === 'negative' ? 'red' : 'gray',
    };
  }, []);

  /**
   * Formats category data for chart display
   * @param {Object} analysisResults - Raw analysis results
   * @returns {Array} - Formatted category data
   */
  const formatCategoryData = useCallback((analysisResults) => {
    const categories = getCategoryDistribution(analysisResults);
    
    return categories.map(category => ({
      id: category.id,
      name: category.name,
      count: category.count,
      percentage: category.percentage,
      color: category.color,
      description: category.description,
      // For horizontal bar chart
      barWidth: `${category.percentage}%`,
      displayText: `${category.name} (${category.count})`,
    }));
  }, []);

  /**
   * Formats feedback items for table display
   * @param {Object} analysisResults - Raw analysis results
   * @returns {Array} - Formatted feedback data
   */
  const formatFeedbackData = useCallback((analysisResults) => {
    const feedback = getTopIssues(analysisResults, 50);
    
    return feedback.map(item => ({
      id: item.id,
      text: item.text,
      sentiment: item.sentiment,
      category: item.category,
      confidence: Math.round(item.confidence * 100),
      timestamp: new Date(item.timestamp).toLocaleDateString(),
      highlights: item.highlights,
      // Display formatting
      sentimentColor: item.sentiment === 'positive' ? 'green' : 
                     item.sentiment === 'negative' ? 'red' : 'gray',
      sentimentIcon: item.sentiment === 'positive' ? '👍' : 
                     item.sentiment === 'negative' ? '👎' : '😐',
      truncatedText: item.text.length > 150 ? 
                     item.text.substring(0, 150) + '...' : 
                     item.text,
    }));
  }, []);

  /**
   * Gets summary statistics for dashboard
   * @param {Object} analysisResults - Raw analysis results
   * @returns {Object} - Summary statistics
   */
  const getSummaryStats = useCallback((analysisResults) => {
    if (!analysisResults || !analysisResults.summary) {
      return {
        totalFeedback: 0,
        processedAt: null,
        processingTime: 0,
        topCategory: null,
        dominantSentiment: 'neutral',
      };
    }

    const categories = getCategoryDistribution(analysisResults);
    const sentiment = getSentimentSummary(analysisResults);
    
    const topCategory = categories.reduce((prev, current) => 
      (prev.count > current.count) ? prev : current
    , categories[0]);

    return {
      totalFeedback: analysisResults.summary.totalItems,
      processedAt: new Date(analysisResults.summary.processedAt).toLocaleString(),
      processingTime: analysisResults.summary.processingTime,
      topCategory: topCategory?.name || 'None',
      dominantSentiment: sentiment.overall,
      categoryCount: categories.length,
    };
  }, []);

  /**
   * Validates analysis results
   * @param {Object} analysisResults - Analysis results to validate
   * @returns {Object} - Validation result
   */
  const validateAnalysisResults = useCallback((analysisResults) => {
    if (!analysisResults) {
      return {
        isValid: false,
        error: 'No analysis results available',
      };
    }

    const requiredFields = ['sentiment', 'categories', 'feedback', 'summary'];
    const missingFields = requiredFields.filter(field => !analysisResults[field]);

    if (missingFields.length > 0) {
      return {
        isValid: false,
        error: `Missing required fields: ${missingFields.join(', ')}`,
      };
    }

    if (!Array.isArray(analysisResults.categories) || analysisResults.categories.length === 0) {
      return {
        isValid: false,
        error: 'No categories found in analysis results',
      };
    }

    if (!Array.isArray(analysisResults.feedback) || analysisResults.feedback.length === 0) {
      return {
        isValid: false,
        error: 'No feedback items found in analysis results',
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }, []);

  return {
    // Data formatting functions
    formatSentimentData,
    formatCategoryData,
    formatFeedbackData,
    getSummaryStats,
    
    // Validation
    validateAnalysisResults,
  };
};