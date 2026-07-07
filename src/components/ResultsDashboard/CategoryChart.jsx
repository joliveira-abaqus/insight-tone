import React from 'react';

/**
 * CategoryChart Component
 * Displays issue categories as horizontal bars using Tailwind CSS
 * No external charting libraries used as per constitutional requirement
 */
const CategoryChart = React.memo(({ categoryData }) => {
  const getCategoryColor = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-500 text-blue-700 border-blue-200';
      case 'green': return 'bg-green-500 text-green-700 border-green-200';
      case 'purple': return 'bg-purple-500 text-purple-700 border-purple-200';
      case 'red': return 'bg-red-500 text-red-700 border-red-200';
      default: return 'bg-gray-500 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (categoryId) => {
    switch (categoryId) {
      case 'ui-ux':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        );
      case 'performance':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'features':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        );
      case 'bugs':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        );
    }
  };

  const getBarColor = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-500';
      case 'green': return 'bg-green-500';
      case 'purple': return 'bg-purple-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {categoryData.map((category, index) => (
        <div key={category.id} className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getCategoryColor(category.color).split(' ')[0]} bg-opacity-10`}>
                <div className={getCategoryColor(category.color).split(' ')[1]}>
                  {getCategoryIcon(category.id)}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">{category.name}</h4>
                <p className="text-sm text-slate-600">{category.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">{category.count}</div>
              <div className="text-sm text-slate-600">{category.percentage}%</div>
            </div>
          </div>
          
          {/* Horizontal Bar Chart */}
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-8 shadow-inner">
              <div 
                className={`${getBarColor(category.color)} h-8 rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-3 shadow-sm relative overflow-hidden`}
                style={{ width: `${category.percentage}%` }}
              >
                {/* Animated shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                {category.percentage > 10 && (
                  <span className="text-white text-sm font-medium relative z-10">
                    {category.percentage}%
                  </span>
                )}
              </div>
            </div>
            
            {/* Percentage labels for small bars */}
            {category.percentage <= 10 && (
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-slate-600 font-medium">
                {category.percentage}%
              </span>
            )}
          </div>
        </div>
      ))}

      {/* Summary Statistics */}
      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h4 className="font-semibold text-slate-900 mb-3">Category Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{categoryData.length}</div>
            <div className="text-sm text-slate-600">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">
              {categoryData.reduce((sum, cat) => sum + cat.count, 0)}
            </div>
            <div className="text-sm text-slate-600">Total Issues</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">
              {Math.max(...categoryData.map(cat => cat.count))}
            </div>
            <div className="text-sm text-slate-600">Peak Count</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">
              {Math.round(categoryData.reduce((sum, cat) => sum + cat.count, 0) / categoryData.length)}
            </div>
            <div className="text-sm text-slate-600">Average</div>
          </div>
        </div>
      </div>
    </div>
  );
});

CategoryChart.displayName = 'CategoryChart';
export default CategoryChart;