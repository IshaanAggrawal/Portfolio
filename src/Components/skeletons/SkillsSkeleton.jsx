"use client";

import React from "react";

const SkillsSkeleton = () => {
  return (
    <div className="animate-pulse py-16 bg-black">
      <div className="container mx-auto px-4">
        {/* Title skeleton */}
        <div className="h-10 bg-amber-900/30 rounded w-64 mx-auto mb-4"></div>
        
        {/* Description skeleton */}
        <div className="h-5 bg-amber-900/20 rounded w-96 mx-auto mb-12"></div>
        
        {/* Category buttons skeleton */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <div className="h-8 w-24 bg-amber-900/30 rounded-full"></div>
          <div className="h-8 w-32 bg-amber-900/30 rounded-full"></div>
          <div className="h-8 w-40 bg-amber-900/30 rounded-full"></div>
        </div>
        
        {/* Skills grid skeleton */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="px-3 py-5 bg-amber-900/20 rounded-xl h-28"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSkeleton;