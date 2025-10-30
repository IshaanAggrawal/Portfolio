"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SiLeetcode, SiHackerrank } from "react-icons/si";

const platforms = [
  {
    name: "LeetCode",
    icon: SiLeetcode,
    color: "#FFA116",
    description: "Solved 200+ coding challenges and participated in weekly contests",
    stats: [
      { label: "Problems Solved", value: "200+" },
      { label: "Contest Rating", value: "1800+" },
      { label: "Top Performance", value: "Top 10%" }
    ],
    link: "https://leetcode.com"
  },
  {
    name: "HackerRank",
    icon: SiHackerrank,
    color: "#2EC866",
    description: "Mastered algorithms and data structures with 5-star ratings",
    stats: [
      { label: "Certificates", value: "15+" },
      { label: "Problem Solving", value: "5 ★" },
      { label: "Algorithms", value: "5 ★" }
    ],
    link: "https://hackerrank.com"
  }
];

const CompetitiveProgramming = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <motion.section 
      ref={ref}
      id="competitive-programming"
      className="py-16 bg-black"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-semibold text-center mb-4 text-white"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            Competitive Programming
          </span>
        </motion.h2>
        
        <motion.p 
          className="text-gray-400 text-center mb-12 max-w-2xl mx-auto font-normal"
          variants={itemVariants}
        >
          Demonstrating problem-solving skills through competitive programming platforms
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {platforms.map((platform, index) => {
            const IconComponent = platform.icon;
            return (
              <motion.div
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${platform.color}20` }}
                  >
                    <IconComponent 
                      className="text-2xl" 
                      style={{ color: platform.color }} 
                    />
                  </div>
                  <h3 className="text-xl font-medium text-white">
                    <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                      {platform.name}
                    </span>
                  </h3>
                </div>
                
                <p className="text-gray-300 mb-6 font-normal">
                  {platform.description}
                </p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {platform.stats.map((stat, statIndex) => (
                    <div 
                      key={statIndex} 
                      className="text-center p-3 bg-gray-700/30 rounded-lg"
                    >
                      <div 
                        className="text-lg font-bold"
                        style={{ color: platform.color }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-xs mt-1 font-normal">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                
                <a
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 text-center rounded-lg font-medium transition-all"
                  style={{ 
                    backgroundColor: `${platform.color}20`,
                    color: platform.color,
                    border: `1px solid ${platform.color}`
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = platform.color;
                    e.target.style.color = '#000';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = `${platform.color}20`;
                    e.target.style.color = platform.color;
                  }}
                >
                  View Profile
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default CompetitiveProgramming;