"use client";

import React from "react";

const AboutSkeleton = () => {
  return (
    <div className="animate-pulse py-16 px-4 md:px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Title skeleton */}
        <div className="h-10 bg-amber-900/30 rounded w-64 mx-auto mb-8"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* 3D model placeholder skeleton */}
          <div className="w-full h-80 md:h-96 lg:h-[500px] bg-amber-900/20 rounded-xl"></div>
          
          {/* About content skeleton */}
          <div>
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-8 bg-amber-900/30 rounded w-48 mb-4 mt-6"></div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-amber-900/20 rounded"></div>
                  <div className="h-4 bg-amber-900/20 rounded w-5/6"></div>
                  <div className="h-4 bg-amber-900/20 rounded w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSkeleton;