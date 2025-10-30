"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

const InteractiveDemo = () => {
  const [isToggled, setIsToggled] = useState(false);
  
  // Spring animation for the toggle button
  const springProps = useSpring({
    scale: isToggled ? 1.2 : 1,
    rotate: isToggled ? 180 : 0,
    backgroundColor: isToggled ? '#8b5cf6' : '#3b82f6',
    config: { tension: 300, friction: 20 }
  });

  // Animation variants for the demo items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Interactive Demo
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Spring Animation Demo */}
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Spring Animation</h3>
            <p className="text-gray-400 mb-6">Click the button to see physics-based animations</p>
            
            <div className="flex flex-col items-center">
              <animated.button
                style={springProps}
                onClick={() => setIsToggled(!isToggled)}
                className="w-20 h-20 rounded-full mb-6 flex items-center justify-center text-white font-bold shadow-lg"
              >
                {isToggled ? 'ON' : 'OFF'}
              </animated.button>
              
              <p className="text-gray-300 text-center">
                {isToggled 
                  ? "Spring animations create natural, fluid movements" 
                  : "Physics-based animations feel more realistic"}
              </p>
            </div>
          </motion.div>
          
          {/* Framer Motion Demo */}
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Gesture Interactions</h3>
            <p className="text-gray-400 mb-6">Drag the box around to see gesture animations</p>
            
            <div className="flex justify-center">
              <motion.div
                className="w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold cursor-grab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ cursor: "grabbing" }}
                drag
                dragConstraints={{
                  top: -100,
                  left: -100,
                  right: 100,
                  bottom: 100,
                }}
                dragElastic={0.5}
              >
                Drag Me
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Particles Demo */}
        <motion.div 
          className="mt-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4 text-center">Particle Effects</h3>
          <p className="text-gray-400 mb-6 text-center">Interactive particle system that responds to mouse movement</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                whileHover={{
                  scale: 1.5,
                  rotate: 360,
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveDemo;