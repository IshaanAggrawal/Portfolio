"use client";

import React from "react";

const CompetitiveProgrammingSkeleton = () => {
  return (
    <div className="animate-pulse py-16 bg-black">
      <div className="container mx-auto px-4">
        {/* Title skeleton */}
        <div className="h-10 bg-amber-900/30 rounded w-80 mx-auto mb-4"></div>
        
        {/* Description skeleton */}
        <div className="h-5 bg-amber-900/20 rounded w-96 mx-auto mb-12"></div>
        
        {/* Platform cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-amber-900/20 rounded-xl p-6 h-80"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetitiveProgrammingSkeleton;