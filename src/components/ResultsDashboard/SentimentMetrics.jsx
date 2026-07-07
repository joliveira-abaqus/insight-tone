import React from 'react';

/**
 * SentimentMetrics Component
 * Displays sentiment analysis metrics with visual indicators
 */
const SentimentMetrics = React.memo(({ sentimentData }) => {
  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return (
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'negative':
        return (
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getBarColor = (type) => {
    switch (type) {
      case 'positive': return 'bg-green-500';
      case 'negative': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Overall Sentiment Card */}
      <div className="metric-card hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Overall Sentiment</h3>
          <div className={`px-3 py-1 rounded-full border ${getSentimentColor(sentimentData.overall)} animate-pulse`}>
            <span className="text-sm font-medium capitalize">{sentimentData.overall}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center py-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-10 rounded-lg"></div>
          {getSentimentIcon(sentimentData.overall)}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-slate-600 mb-2">Confidence Score</p>
          <div className="flex items-center justify-center space-x-2">
            <p className="text-3xl font-bold text-slate-900">{sentimentData.confidence}%</p>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${sentimentData.confidence}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sentiment Breakdown */}
      <div className="metric-card">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Sentiment Breakdown</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-green-700">Positive</span>
              <span className="text-sm text-slate-600">{sentimentData.breakdown.positive}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`${getBarColor('positive')} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${sentimentData.breakdown.positive}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Neutral</span>
              <span className="text-sm text-slate-600">{sentimentData.breakdown.neutral}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`${getBarColor('neutral')} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${sentimentData.breakdown.neutral}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-red-700">Negative</span>
              <span className="text-sm text-slate-600">{sentimentData.breakdown.negative}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`${getBarColor('negative')} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${sentimentData.breakdown.negative}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-600 mb-2">Key Insights:</p>
          <ul className="text-sm text-slate-700 space-y-1">
            {sentimentData.breakdown.positive > 60 && (
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Strong positive sentiment detected
              </li>
            )}
            {sentimentData.breakdown.negative > 40 && (
              <li className="flex items-center">
                <svg className="w-4 h-4 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Significant negative feedback requires attention
              </li>
            )}
            {sentimentData.breakdown.neutral > 50 && (
              <li className="flex items-center">
                <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mixed sentiment with room for improvement
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
});

SentimentMetrics.displayName = 'SentimentMetrics';
export default SentimentMetrics;