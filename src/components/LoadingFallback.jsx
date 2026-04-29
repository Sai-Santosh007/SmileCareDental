import React from 'react';

const LoadingFallback = () => {
  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center">
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="w-16 h-16 border-4 border-teal/20 border-t-teal rounded-full animate-spin mx-auto mb-6"></div>
        
        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Smile Care Dental
        </h2>
        <p className="text-gray-600 mb-6">
          Loading your dental experience...
        </p>
        
        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-teal rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-teal rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-teal rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        
        {/* Fallback Message */}
        <p className="text-sm text-gray-500 mt-8 max-w-md">
          If this page doesn't load, please refresh or check your internet connection.
        </p>
      </div>
    </div>
  );
};

export default LoadingFallback;
