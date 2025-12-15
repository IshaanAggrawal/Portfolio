"use client";

import React from "react";
import { motion } from "framer-motion";

const GoldenLoader = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-black to-yellow-900/20"></div>
      
      {/* Loader container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Spinning logo or icon */}
        <motion.div
          className="relative mb-8"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-24 h-24 border-4 border-amber-400/30 rounded-full"></div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-t-amber-400 border-r-yellow-500 border-b-amber-300 border-l-yellow-400 rounded-full animate-spin"></div>
          
          {/* Shimmering center */}
          <div className="absolute inset-0 m-auto w-12 h-12 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full shadow-lg shadow-amber-500/50"></div>
        </motion.div>
        
        {/* Loading text with golden gradient */}
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-transparent bg-clip-text">
            Loading Portfolio
          </span>
        </motion.h2>
        
        {/* Shimmering bar */}
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Shimmering particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-400 rounded-full"
            style={{
              top: `${Math.sin(i * 60 * Math.PI / 180) * 60}px`,
              left: `${Math.cos(i * 60 * Math.PI / 180) * 60}px`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GoldenLoader;