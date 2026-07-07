import React from 'react';
import SentimentMetrics from './SentimentMetrics.jsx';
import CategoryChart from './CategoryChart.jsx';
import FeedbackTable from './FeedbackTable.jsx';
import styles from './ResultsDashboard.module.css';

/**
 * ResultsDashboard Component
 * Displays comprehensive analysis results with sentiment metrics, category charts, and feedback table
 * Fully integrated with mock data service for real-time analysis
 */
const ResultsDashboard = ({ sentimentData, categoryData, feedbackData, summaryStats, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analysis Results</h1>
          <p className="text-slate-600 mt-1">
            Generated {summaryStats.processedAt} • {summaryStats.totalFeedback} feedback items analyzed
          </p>
        </div>
        <button
          onClick={onBack}
          className="btn-secondary flex items-center hover:bg-slate-300 transition-colors duration-200"
          aria-label="Return to feedback form"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Form
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="metric-card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Feedback</p>
              <p className="metric-value">{summaryStats.totalFeedback}</p>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-600">Dominant Sentiment</p>
              <p className="metric-value capitalize">{summaryStats.dominantSentiment}</p>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-600">Top Category</p>
              <p className="metric-value">{summaryStats.topCategory}</p>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-600">Processing Time</p>
              <p className="metric-value">{summaryStats.processingTime}ms</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sentiment Metrics */}
      <div className={styles.section}>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Sentiment Analysis</h2>
        <SentimentMetrics sentimentData={sentimentData} />
      </div>

      {/* Category Chart */}
      <div className={styles.section}>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Issue Categories</h2>
        <CategoryChart categoryData={categoryData} />
      </div>

      {/* Feedback Table */}
      <div className={styles.section}>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Structured Feedback</h2>
        <FeedbackTable feedbackData={feedbackData} />
      </div>
    </div>
  );
};

export default ResultsDashboard;