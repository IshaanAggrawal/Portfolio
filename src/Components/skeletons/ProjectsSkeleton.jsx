"use client";

import React from "react";

const ProjectsSkeleton = () => {
  return (
    <div className="animate-pulse py-16 px-4 md:px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Title skeleton */}
        <div className="h-10 bg-amber-900/30 rounded w-64 mx-auto mb-4"></div>
        
        {/* Description skeleton */}
        <div className="h-5 bg-amber-900/20 rounded w-96 mx-auto mb-12"></div>
        
        {/* Project cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-amber-900/20 rounded-xl p-6 h-80"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSkeleton;