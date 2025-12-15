"use client";

import React from "react";

const ContactSkeleton = () => {
  return (
    <div className="animate-pulse py-16 px-4 md:px-6 bg-black">
      <div className="max-w-6xl mx-auto w-full">
        {/* Title skeleton */}
        <div className="h-10 bg-amber-900/30 rounded w-64 mx-auto mb-4"></div>
        
        {/* Description skeleton */}
        <div className="h-5 bg-amber-900/20 rounded w-96 mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact info skeleton */}
          <div className="space-y-6 md:space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-amber-900/20 rounded-xl p-6 h-24"></div>
            ))}
            
            {/* Social links skeleton */}
            <div className="h-8 bg-amber-900/30 rounded w-40 mb-4"></div>
            <div className="flex gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-12 h-12 bg-amber-900/20 rounded-lg"></div>
              ))}
            </div>
          </div>
          
          {/* Contact form skeleton */}
          <div className="bg-amber-900/20 rounded-2xl p-8 h-96"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactSkeleton;