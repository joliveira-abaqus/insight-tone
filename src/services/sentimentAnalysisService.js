import { generateAnalysisResults } from './mockDataService.js';

/**
 * Service for analyzing feedback sentiment and categorizing issues
 * This service acts as an interface to the mock data service
 * and can be easily replaced with real API calls in the future
 */

/**
 * Analyzes feedback text and returns comprehensive results
 * @param {string} feedbackText - The feedback text to analyze
 * @returns {Promise<Object>} - Analysis results
 */
export const analyzeFeedback = async (feedbackText) => {
  // Simulate API delay for realistic experience
  await new Promise(resolve => setTimeout(resolve, 100));
  
  try {
    const results = generateAnalysisResults(feedbackText);
    return {
      success: true,
      data: results,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: {
        message: 'Failed to analyze feedback',
        details: error.message,
      },
    };
  }
};

/**
 * Validates feedback text before analysis
 * @param {string} feedbackText - The feedback text to validate
 * @returns {Object} - Validation result
 */
export const validateFeedbackForAnalysis = (feedbackText) => {
  if (!feedbackText || typeof feedbackText !== 'string') {
    return {
      isValid: false,
      error: 'Feedback text is required and must be a string',
    };
  }
  
  if (feedbackText.trim().length < 10) {
    return {
      isValid: false,
      error: 'Feedback must be at least 10 characters long',
    };
  }
  
  if (feedbackText.length > 10000) {
    return {
      isValid: false,
      error: 'Feedback cannot exceed 10,000 characters',
    };
  }
  
  return {
    isValid: true,
    error: null,
  };
};

/**
 * Gets sentiment analysis summary
 * @param {Object} analysisResults - The analysis results
 * @returns {Object} - Sentiment summary
 */
export const getSentimentSummary = (analysisResults) => {
  if (!analysisResults || !analysisResults.sentiment) {
    return {
      overall: 'neutral',
      confidence: 0,
      breakdown: { positive: 0, negative: 0, neutral: 100 },
    };
  }
  
  return {
    overall: analysisResults.sentiment.overall,
    confidence: analysisResults.sentiment.confidence,
    breakdown: analysisResults.sentiment.breakdown,
  };
};

/**
 * Gets category distribution summary
 * @param {Object} analysisResults - The analysis results
 * @returns {Array} - Category distribution
 */
export const getCategoryDistribution = (analysisResults) => {
  if (!analysisResults || !analysisResults.categories) {
    return [];
  }
  
  return analysisResults.categories.map(category => ({
    id: category.id,
    name: category.name,
    count: category.count,
    percentage: category.percentage,
    color: category.color,
    description: category.description,
  }));
};

/**
 * Gets top issues from feedback
 * @param {Object} analysisResults - The analysis results
 * @param {number} limit - Maximum number of issues to return
 * @returns {Array} - Top issues
 */
export const getTopIssues = (analysisResults, limit = 10) => {
  if (!analysisResults || !analysisResults.feedback) {
    return [];
  }
  
  return analysisResults.feedback
    .slice(0, limit)
    .map(item => ({
      id: item.id,
      text: item.originalText,
      sentiment: item.sentiment,
      category: item.category,
      confidence: item.confidence,
      timestamp: item.timestamp,
      highlights: item.highlights,
    }));
};