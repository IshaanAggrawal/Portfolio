"use client";

import React from "react";

const ServicesSkeleton = () => {
  return (
    <div className="animate-pulse py-20 px-4 md:px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Title skeleton */}
        <div className="h-10 bg-amber-900/30 rounded w-64 mx-auto mb-4"></div>
        
        {/* Description skeleton */}
        <div className="h-5 bg-amber-900/20 rounded w-96 mx-auto mb-12"></div>
        
        {/* Service cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-amber-900/20 rounded-xl p-8 h-64"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSkeleton;