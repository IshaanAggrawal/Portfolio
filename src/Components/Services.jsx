"use client";

import React from 'react'
import { motion } from "framer-motion";
import { 
 SiReact, 
 SiNextdotjs, 
 SiTailwindcss, 
 SiNodedotjs, 
 SiMongodb, 
 SiPython, 
 SiDocker,
 // ADDED ICONS FOR GENAI/MLOPS FOCUS
 SiGoogle, 
 SiGit,
 SiFastapi, // Added FastAPI icon
 SiPostgresql // Added PostgreSQL icon
} from "react-icons/si";

const services = [
 // 1. CORE EXPERTISE: Generative AI & LLMs (Top Priority) [cite: 5, 17]
 {
  icon: SiGoogle, // Using SiGoogle for Gemini/GenAI
  title: "GenAI & LLM Architecture",
  description: "Building production-grade GenAI systems, RAG pipelines, and LLM evaluation microservices with strong safety guardrails.",
  technologies: ["RAG Architecture", "LangChain", "FastAPI", "pgvector", "LLM Evaluation"] // [cite: 5, 17, 23]
 },
 // 2. CORE EXPERTISE: Full Stack Development (Next.js/React) [cite: 19]
 {
  icon: SiNextdotjs,
  title: "Frontend Engineering (Next.js)",
  description: "Building responsive and interactive user interfaces with Next.js, React, and modern CSS frameworks.",
  technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Framer Motion"] // [cite: 19]
 },
 // 3. CORE EXPERTISE: Backend & APIs (Python/Node.js) [cite: 18]
 {
  icon: SiFastapi, // Using SiFastapi for Python backend focus
  title: "Backend API Development",
  description: "Creating robust, low-latency APIs and inference endpoints using FastAPI, Flask, and Node.js/Express.",
  technologies: ["FastAPI", "Flask", "Node.js", "Express", "REST APIs"] // [cite: 18]
 },
 // 4. CORE EXPERTISE: Data Science & ML [cite: 20]
 {
  icon: SiPython,
  title: "Predictive Analytics & ML",
  description: "Developing end-to-end ML pipelines and predictive models (XGBoost) for real-time inference requests.",
  technologies: ["Python", "XGBoost", "Scikit-learn", "Pandas", "Model Deployment"] // [cite: 20, 35, 36]
 },
 // 5. CORE EXPERTISE: DevOps & Deployment [cite: 18, 38]
 {
  icon: SiDocker,
  title: "DevOps & Deployment",
  description: "Streamlining development workflows with containerization (Docker) and deploying scalable systems (Render, Vercel).",
  technologies: ["CI/CD", "Vercel", "Render", "Scalable Systems"] // [cite: 18, 38]
 },
 // 6. CORE EXPERTISE: Database Solutions [cite: 20]
 {
  icon: SiPostgresql, // Using SiPostgresql for database focus
  title: "Database & Data Modeling",
  description: "Architecting efficient solutions for PostgreSQL/Supabase (pgvector) and MongoDB requirements.",
  technologies: ["PostgreSQL", "Supabase", "MongoDB", "pgvector", "SQL"] // [cite: 20, 28]
 }
];

function Services() {
 // Animation variants
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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
 };

 return (
  <motion.section 
   id="services" 
   className="py-20 px-4 md:px-6 bg-black" // Increased padding
   initial="hidden"
   whileInView="visible"
   variants={containerVariants}
   viewport={{ once: true, margin: "-100px" }}
  >
   <div className="max-w-6xl mx-auto">
    {/* Heading */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
            Core Expertise
          </span>
        </motion.h2>
    <motion.p 
     className="text-gray-400 mb-12 max-w-2xl mx-auto text-center font-normal text-lg"
     variants={itemVariants}
    >
     Innovative Full Stack and Generative AI solutions for production-grade applications.
    </motion.p>

    {/* Services Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
     {services.map((service, index) => {
      const IconComponent = service.icon;
      return (
       <motion.div
        key={index}
        // CORRECTION: Cleaned up card styles for dark theme contrast and strong green hover
        className="bg-gray-800/20 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-amber-500 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/15"
        variants={itemVariants}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
       >
        <div className="flex items-center gap-4 mb-4">
         {/* CORRECTION: Icon block uses clean green accent */}
         <div className="p-3 bg-amber-500/15 rounded-xl">
          <IconComponent className="text-2xl text-amber-400" />
         </div>
         <h3 className="text-xl font-semibold text-white">
          {/* CORRECTION: Title text clip uses White/Gray for better contrast against the card */}
          <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
           {service.title}
          </span>
         </h3>
        </div>
        <p className="text-gray-300 mb-4 text-base font-light leading-relaxed">{service.description}</p>
        <div className="flex flex-wrap gap-2">
         {service.technologies.map((tech, techIndex) => (
          <span 
           key={techIndex} 
           // CORRECTION: Technology chips use gray background with neon green text
           className="px-3 py-1 bg-gray-700/70 text-amber-400 text-xs rounded-full font-medium"
          >
           {tech}
          </span>
         ))}
        </div>
       </motion.div>
      );
     })}
    </div>
   </div>
  </motion.section>
 )
}

export default Services