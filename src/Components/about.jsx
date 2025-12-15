"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";

// Suppress Spline runtime errors globally
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    // Suppress specific Spline errors
    if (args[0] && typeof args[0] === 'string' && (
      args[0].includes('Missing property') || 
      args[0].includes('@splinetool') ||
      args[0].includes('Spline')
    )) {
      return;
    }
    originalError(...args);
  };
  
  // Also suppress Spline warnings
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0] && typeof args[0] === 'string' && (
      args[0].includes('@splinetool') ||
      args[0].includes('Spline')
    )) {
      return;
    }
    originalWarn(...args);
  };
}

// Create a client-side only component for Spline with better error handling
const SplineClient = () => {
  const [Spline, setSpline] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;
    
    const loadSpline = async () => {
      try {
        const splineModule = await import('@splinetool/react-spline');
        if (isMounted) {
          setSpline(() => splineModule.default);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load Spline:', err);
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    loadSpline();

    return () => {
      isMounted = false;
    };
  }, []);

  // Enhanced error handling for Spline component
  const handleSplineError = (err) => {
    console.error('Spline component error:', err);
    setError(err);
  };

  if (error) {
    return <FallbackRobot />;
  }

  if (loading) {
    return <FallbackRobot />;
  }

  if (!Spline) {
    return <FallbackRobot />;
  }

  // Try to render Spline with error boundary
  return (
    <div className="w-full h-80 md:h-96 lg:h-[500px]">
      <Spline
        scene="https://prod.spline.design/5gLJCVVBXl4ts2Bf/scene.splinecode"
        className="w-full h-full"
        onError={handleSplineError}
      />
    </div>
  );
};

// Fallback robot component with larger size
const FallbackRobot = () => (
  <div className="w-full h-80 md:h-96 lg:h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center border border-gray-700">
    <div className="text-6xl md:text-8xl lg:text-9xl">🤖</div>
  </div>
);

const AboutMe = () => {
  // Animation variants - slowed down from 0.6 to 1.2 seconds
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Slowed down from 0.6 to 1.2 seconds
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
  };

  return (
    <motion.section 
      id="about"
      className="py-16 px-4 md:px-6 bg-black"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-8 md:mb-12 text-white"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
            About Me
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Spline 3D Robot */}
          <motion.div variants={itemVariants}>
            <Suspense fallback={<FallbackRobot />}>
              <SplineClient />
            </Suspense>
          </motion.div>
          
          {/* About Content */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl md:text-3xl font-medium text-white mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-transparent bg-clip-text">
                Who am I?
              </span>
            </h3>
            <p className="text-gray-300 mb-4 md:mb-6 text-base md:text-lg leading-relaxed font-normal">
              I'm a passionate full-stack developer with expertise in creating modern web applications. 
              With a strong foundation in both frontend and backend technologies, I bring ideas to life 
              through clean, efficient code and intuitive user interfaces and have knowledge of modern 
              GEN AI technology and have experience in building intelligent applications.
            </p>
            
            <h3 className="text-2xl md:text-3xl font-medium text-white mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-transparent bg-clip-text">
                My Approach
              </span>
            </h3>
            <p className="text-gray-300 mb-4 md:mb-6 text-base md:text-lg leading-relaxed font-normal">
              I believe in writing maintainable, scalable code that not only solves problems but also 
              provides an exceptional user experience. My development process focuses on understanding 
              user needs, implementing robust solutions, and continuously improving through feedback.
            </p>
            
            <h3 className="text-2xl md:text-3xl font-medium text-white mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-transparent bg-clip-text">
                Let's Connect
              </span>
            </h3>
            <p className="text-gray-300 mb-6 text-base md:text-lg leading-relaxed font-normal">
              I'm always excited to work on new projects and collaborate with like-minded individuals. 
              Whether you have a project in mind or just want to chat about technology, feel free to 
              reach out!
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutMe;