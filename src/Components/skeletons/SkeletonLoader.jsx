"use client";

import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="h-4 bg-amber-900/30 rounded w-3/4 mb-4"></div>
      
      {/* Paragraph skeletons */}
      <div className="space-y-2 mb-6">
        <div className="h-3 bg-amber-900/20 rounded"></div>
        <div className="h-3 bg-amber-900/20 rounded w-5/6"></div>
        <div className="h-3 bg-amber-900/20 rounded w-4/6"></div>
      </div>
      
      {/* Button skeleton */}
      <div className="h-8 bg-amber-900/30 rounded w-1/3"></div>
    </div>
  );
};

export default SkeletonLoader;