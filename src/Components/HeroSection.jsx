"use client";

import React from "react";
import { motion } from "framer-motion";
import { assets } from '../assets/assets';

function HeroSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      {/* Center Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div 
          className="flex flex-col items-center justify-center max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Profile Image */}
          <motion.div 
            className="relative mb-6"
            variants={itemVariants}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
                <img 
                  src={assets.profile_img.src || assets.profile_img} 
                  alt="Ishaan Aggrawal" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Glowing Border Effect */}
              <div className="absolute inset-0 rounded-full">
                <div className="absolute inset-0 rounded-full border-4 border-green-400/20 animate-pulse"></div>
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500/10 animate-ping opacity-50"></div>
              </div>
            </div>
          </motion.div>

          {/* Headline with "Hi I am" in white and "Ishaan Aggrawal" in green */}
          <motion.h1 
            className="text-3xl md:text-5xl font-semibold mb-4"
            variants={itemVariants}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="text-white font-sans">Hi I am </span>
            <span className="text-green-400">Ishaan Aggrawal</span>
          </motion.h1>

          {/* Simplified Subheading */}
          <motion.p 
            className="text-base md:text-lg text-gray-300 mb-8 max-w-xl font-normal"
            variants={itemVariants}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Creating modern and performant web experiences
          </motion.p>

          {/* Green Gradient Buttons */}
          <motion.div 
            className="flex gap-3 flex-wrap justify-center"
            variants={itemVariants}
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.7)] transition-all transform hover:scale-105"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg border border-green-400 text-green-300 font-medium hover:bg-green-400/10 transition-all transform hover:scale-105"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Let's Connect
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSection;