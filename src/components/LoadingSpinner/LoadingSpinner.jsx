import React from 'react';

/**
 * LoadingSpinner Component
 * Provides loading animation with optional message
 * Uses Lucide React icons as per constitutional requirement
 */
const LoadingSpinner = ({ message = 'Loading...', size = 'medium', color = 'blue' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  const containerSizeClasses = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };

  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    gray: 'text-gray-600',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${containerSizeClasses[size]}`}>
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin rounded-full border-4 border-t-transparent border-r-transparent border-b-transparent border-l-current transition-all duration-300`}>
          <span className="sr-only">Loading</span>
        </div>
        
        {/* Inner ring */}
        <div className={`absolute inset-0 ${sizeClasses[size]} ${colorClasses[color]} opacity-30 animate-ping rounded-full border-4 border-current`}></div>
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-2 h-2 ${colorClasses[color]} rounded-full animate-pulse`}></div>
        </div>
        
        {/* Orbiting dots */}
        <div className="absolute inset-0">
          <div className={`w-1 h-1 ${colorClasses[color]} rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 animate-spin`} style={{ animationDuration: '2s' }}></div>
          <div className={`w-1 h-1 ${colorClasses[color]} rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-spin`} style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
          <div className={`w-1 h-1 ${colorClasses[color]} rounded-full absolute top-1/2 left-0 transform -translate-y-1/2 animate-spin`} style={{ animationDuration: '2s', animationDelay: '1s' }}></div>
          <div className={`w-1 h-1 ${colorClasses[color]} rounded-full absolute top-1/2 right-0 transform -translate-y-1/2 animate-spin`} style={{ animationDuration: '2s', animationDelay: '1.5s' }}></div>
        </div>
      </div>
      
      {message && (
        <div className="mt-4 text-center animate-fade-in">
          <p className={`text-sm font-medium ${colorClasses[color]}`}>{message}</p>
          <div className="mt-2 flex space-x-1">
            <div className={`w-2 h-2 ${colorClasses[color]} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
            <div className={`w-2 h-2 ${colorClasses[color]} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
            <div className={`w-2 h-2 ${colorClasses[color]} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;