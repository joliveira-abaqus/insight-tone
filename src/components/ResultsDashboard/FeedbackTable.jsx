import React, { useState } from 'react';

/**
 * FeedbackTable Component
 * Displays structured feedback data in a sortable table format
 * Includes the 3 hard-coded examples as specified
 */
const FeedbackTable = React.memo(({ feedbackData }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [expandedRows, setExpandedRows] = useState(new Set());

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const toggleRowExpansion = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const sortedData = React.useMemo(() => {
    const sortableData = [...feedbackData];
    sortableData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortableData;
  }, [feedbackData, sortConfig]);

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '👍';
      case 'negative':
        return '👎';
      default:
        return '😐';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50';
      case 'negative': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'ui-ux': return 'text-blue-600 bg-blue-50';
      case 'performance': return 'text-green-600 bg-green-50';
      case 'features': return 'text-purple-600 bg-purple-50';
      case 'bugs': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Feedback Items</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {feedbackData.length} items analyzed • Click rows to expand full text
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('sentiment')}
                  className="text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider hover:text-slate-900 dark:hover:text-white flex items-center"
                >
                  Sentiment
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('category')}
                  className="text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider hover:text-slate-900 dark:hover:text-white flex items-center"
                >
                  Category
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('text')}
                  className="text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider hover:text-slate-900 dark:hover:text-white flex items-center"
                >
                  Feedback Text
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('confidence')}
                  className="text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider hover:text-slate-900 dark:hover:text-white flex items-center"
                >
                  Confidence
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('timestamp')}
                  className="text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider hover:text-slate-900 dark:hover:text-white flex items-center"
                >
                  Date
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {sortedData.map((item) => (
              <React.Fragment key={item.id}>
                <tr 
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors duration-150"
                  onClick={() => toggleRowExpansion(item.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleRowExpansion(item.id);
                    }
                  }}
                  aria-expanded={expandedRows.has(item.id)}
                  aria-controls={`row-details-${item.id}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{getSentimentIcon(item.sentiment)}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSentimentColor(item.sentiment)}`}>
                        {item.sentiment}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(item.category)}`}>
                      {item.category.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900 dark:text-slate-100">
                      <p className="font-medium">{item.truncatedText}</p>
                      {item.highlights.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {item.highlights.map((highlight, index) => (
                            <span key={index} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs rounded">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 dark:bg-slate-700 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${item.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">{item.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                    {item.timestamp}
                  </td>
                </tr>
                
                {/* Expanded row for full text */}
                {expandedRows.has(item.id) && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 bg-slate-50 dark:bg-slate-900">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Full Feedback:</h4>
                          <p className="text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700">
                            {item.text}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>ID: {item.id}</span>
                          <span>Click to collapse</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing {feedbackData.length} feedback items
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Sorted by {sortConfig.key} ({sortConfig.direction})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

FeedbackTable.displayName = 'FeedbackTable';
export default FeedbackTable;