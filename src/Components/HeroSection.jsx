  "use client";

  import React from "react";
  import { motion } from "framer-motion";
  import RotatingText from './ui/RotatingText';
  import LightRays from './ui/LightRays';
  import CurvedLoop from './ui/CurvedLoop';

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
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black">
     {/* Light Rays Background */}
     <div className="absolute inset-0 z-0">
      <LightRays
        raysOrigin="top-center"
        raysColor="#26f218"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={20}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays"
      />
     </div>
     
     {/* Center Content */}
     <div className="relative z-10 h-full mt-50  flex flex-col items-center justify-center text-center px-4">
      <motion.div 
       className="flex flex-col items-center justify-center max-w-4xl" // Increased width from max-w-3xl to max-w-4xl
       initial="hidden"
       animate="visible"
       variants={containerVariants}
      >
       {/* Headline with "Hi I am" in white and rotating text in green */}
       <motion.h1 
        className="text-3xl md:text-5xl font-semibold mb-4 flex flex-wrap items-center justify-center gap-2"
        variants={itemVariants}
        style={{ fontFamily: "sans-serif" }}
       >
        <span className="text-white font-extrabold">Hi,I am </span>
        <RotatingText
         texts={["Ishaan Aggrawal","Gen AI Engineer","Web Developer","Data Scientist"]}
         mainClassName="px-2 sm:px-2 md:px-3 bg-green-500 text-white font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg inline-flex"
         staggerFrom={"first"}
         initial={{ y: "100%" }}
         animate={{ y: 0 }}
         exit={{ y: "-120%" }}
         staggerDuration={0.025}
         transition={{ type: "spring", damping: 30, stiffness: 400 }}
         rotationInterval={2000}
        />
       </motion.h1>

       {/* Simplified Subheading */}
       <motion.p 
        className="text-base md:text-lg text-white mb-8 max-w-xl font-bold"
        variants={itemVariants}
        style={{ fontFamily: "'Inter', sans-serif" }}
       >
        Creating modern and performant web experiences with power of AI
       </motion.p>

       {/* Green Gradient Buttons */}
       <motion.div 
        className="flex gap-3 flex-wrap justify-center"
        variants={itemVariants}
       >
        <a
         href="./Ishaanaggrawalgenai.pdf" 
         download="Ishaan_Aggrawal_Resume.pdf"
         className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.7)] transition-all transform hover:scale-105"
         style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
         Download My Resume
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
     
     {/* Curved Loop Text Animation */}
     <div className="mb-20">
      <CurvedLoop 
        marqueeText="Welcome to Ishaan's Portfolio ✦ Welcome to Ishaan's Portfolio✦"
        speed={2}
        curveAmount={300}
        direction="left"
        interactive={true}
        className="text-green-400 text-4xl md:text-5xl"
      />
     </div>
    </div>
   );
  }

  export default HeroSection;