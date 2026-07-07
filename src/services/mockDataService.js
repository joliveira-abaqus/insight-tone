import { SENTIMENT_CATEGORIES, ISSUE_CATEGORIES, CATEGORY_COLORS } from '../utils/constants.js';
import { generateId, calculatePercentage } from '../utils/helpers.js';

/**
 * Generates mock sentiment analysis based on feedback text
 * @param {string} text - The feedback text to analyze
 * @returns {Object} - Sentiment analysis result
 */
export const generateSentimentAnalysis = (text) => {
  // Simple mock logic based on text content
  const lowerText = text.toLowerCase();
  let sentiment = SENTIMENT_CATEGORIES.NEUTRAL;
  let confidence = 0.7;
  
  // Basic sentiment detection based on keywords
  const positiveWords = ['good', 'great', 'excellent', 'love', 'amazing', 'perfect', 'helpful', 'useful', 'intuitive', 'easy'];
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'broken', 'crash', 'slow', 'difficult', 'confusing', 'bug'];
  
  const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
  const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
  
  if (positiveCount > negativeCount) {
    sentiment = SENTIMENT_CATEGORIES.POSITIVE;
    confidence = 0.8 + (positiveCount * 0.05);
  } else if (negativeCount > positiveCount) {
    sentiment = SENTIMENT_CATEGORIES.NEGATIVE;
    confidence = 0.8 + (negativeCount * 0.05);
  }
  
  // Generate breakdown
  const total = 100;
  let positive = 30;
  let negative = 30;
  let neutral = 40;
  
  if (sentiment === SENTIMENT_CATEGORIES.POSITIVE) {
    positive = 50 + Math.min(positiveCount * 10, 30);
    negative = Math.max(10, 30 - negativeCount * 5);
    neutral = total - positive - negative;
  } else if (sentiment === SENTIMENT_CATEGORIES.NEGATIVE) {
    negative = 50 + Math.min(negativeCount * 10, 30);
    positive = Math.max(10, 30 - positiveCount * 5);
    neutral = total - positive - negative;
  }
  
  // Extract key phrases (simple mock implementation)
  const keyPhrases = [];
  if (lowerText.includes('user interface')) keyPhrases.push('user interface');
  if (lowerText.includes('performance')) keyPhrases.push('performance');
  if (lowerText.includes('feature')) keyPhrases.push('feature');
  if (lowerText.includes('bug')) keyPhrases.push('bug');
  if (lowerText.includes('easy to use')) keyPhrases.push('easy to use');
  
  return {
    overall: sentiment,
    confidence: Math.min(confidence, 0.95),
    breakdown: {
      positive: Math.round(positive),
      negative: Math.round(negative),
      neutral: Math.round(neutral),
    },
    keyPhrases: keyPhrases.length > 0 ? keyPhrases : ['general feedback'],
  };
};

/**
 * Generates mock issue categories based on feedback text
 * @param {string} text - The feedback text to categorize
 * @returns {Array} - Array of issue categories
 */
export const generateIssueCategories = (text) => {
  const lowerText = text.toLowerCase();
  
  // Initialize all categories
  const categories = [
    {
      id: ISSUE_CATEGORIES.UI_UX,
      name: 'UI/UX',
      count: 0,
      percentage: 0,
      color: CATEGORY_COLORS[ISSUE_CATEGORIES.UI_UX],
      description: 'User interface and experience feedback',
    },
    {
      id: ISSUE_CATEGORIES.PERFORMANCE,
      name: 'Performance',
      count: 0,
      percentage: 0,
      color: CATEGORY_COLORS[ISSUE_CATEGORIES.PERFORMANCE],
      description: 'Application performance and speed',
    },
    {
      id: ISSUE_CATEGORIES.FEATURES,
      name: 'Features',
      count: 0,
      percentage: 0,
      color: CATEGORY_COLORS[ISSUE_CATEGORIES.FEATURES],
      description: 'Feature requests and functionality',
    },
    {
      id: ISSUE_CATEGORIES.BUGS,
      name: 'Bugs',
      count: 0,
      percentage: 0,
      color: CATEGORY_COLORS[ISSUE_CATEGORIES.BUGS],
      description: 'Bug reports and issues',
    },
  ];
  
  // Categorize based on keywords
  if (lowerText.includes('interface') || lowerText.includes('ui') || lowerText.includes('design') || lowerText.includes('layout')) {
    categories[0].count = 1;
  }
  if (lowerText.includes('slow') || lowerText.includes('performance') || lowerText.includes('speed') || lowerText.includes('fast')) {
    categories[1].count = 1;
  }
  if (lowerText.includes('feature') || lowerText.includes('functionality') || lowerText.includes('add') || lowerText.includes('request')) {
    categories[2].count = 1;
  }
  if (lowerText.includes('bug') || lowerText.includes('crash') || lowerText.includes('error') || lowerText.includes('broken')) {
    categories[3].count = 1;
  }
  
  // If no specific category found, assign to UI/UX by default
  const totalIssues = categories.reduce((sum, cat) => sum + cat.count, 0);
  if (totalIssues === 0) {
    categories[0].count = 1;
  }
  
  // Calculate percentages
  const finalTotal = categories.reduce((sum, cat) => sum + cat.count, 0);
  categories.forEach(category => {
    category.percentage = calculatePercentage(category.count, finalTotal);
  });
  
  return categories.filter(cat => cat.count > 0);
};

/**
 * Generates mock structured feedback items
 * @param {string} text - The original feedback text
 * @returns {Array} - Array of structured feedback items
 */
export const generateStructuredFeedback = (text) => {
  const sentiment = generateSentimentAnalysis(text);
  const categories = generateIssueCategories(text);
  
  // Create 3 mock feedback examples as specified
  const mockFeedbacks = [
    {
      id: generateId(),
      originalText: "The application crashes every time I try to export data to PDF. This is critical for our daily reporting and the crash happens consistently on the export screen. The error message says 'Memory allocation failed' but I have plenty of RAM available.",
      sentiment: SENTIMENT_CATEGORIES.NEGATIVE,
      category: ISSUE_CATEGORIES.BUGS,
      confidence: 0.92,
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      highlights: ['crashes', 'export data to PDF', 'Memory allocation failed'],
    },
    {
      id: generateId(),
      originalText: "It would be incredibly helpful to have a PDF export feature for the analytics dashboard. Currently I have to manually copy-paste data into Excel to create reports for stakeholders. Adding a direct PDF export would save me at least 2 hours per week.",
      sentiment: SENTIMENT_CATEGORIES.POSITIVE,
      category: ISSUE_CATEGORIES.FEATURES,
      confidence: 0.88,
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      highlights: ['PDF export feature', 'analytics dashboard', 'save me at least 2 hours per week'],
    },
    {
      id: generateId(),
      originalText: "The save button is too small and located in an awkward position at the bottom left corner. I frequently miss it when trying to save my work, especially when working quickly. Moving it to a more prominent position would improve the workflow significantly.",
      sentiment: SENTIMENT_CATEGORIES.NEGATIVE,
      category: ISSUE_CATEGORIES.UI_UX,
      confidence: 0.85,
      timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      highlights: ['save button is too small', 'awkward position', 'improve the workflow'],
    },
  ];
  
  // Add the user's actual feedback as well
  mockFeedbacks.push({
    id: generateId(),
    originalText: text,
    sentiment: sentiment.overall,
    category: categories[0]?.id || ISSUE_CATEGORIES.UI_UX,
    confidence: sentiment.confidence,
    timestamp: new Date().toISOString(),
    highlights: sentiment.keyPhrases,
  });
  
  return mockFeedbacks;
};

/**
 * Generates complete analysis results
 * @param {string} text - The feedback text to analyze
 * @returns {Object} - Complete analysis results
 */
export const generateAnalysisResults = (text) => {
  const sentiment = generateSentimentAnalysis(text);
  const categories = generateIssueCategories(text);
  const feedback = generateStructuredFeedback(text);
  
  return {
    id: generateId(),
    sentiment,
    categories,
    feedback,
    summary: {
      totalItems: feedback.length,
      processedAt: new Date().toISOString(),
      processingTime: 150, // Mock processing time in ms
    },
  };
};