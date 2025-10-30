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
  SiFigma, 
  SiDocker 
} from "react-icons/si";

const services = [
  {
    icon: SiReact,
    title: "Frontend Development",
    description: "Building responsive and interactive user interfaces with React, Next.js, and modern CSS frameworks.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"]
  },
  {
    icon: SiNodedotjs,
    title: "Backend Development",
    description: "Creating robust server-side applications with Node.js, Express, and database integration.",
    technologies: ["Node.js", "Express", "MongoDB", "REST APIs"]
  },
  {
    icon: SiPython,
    title: "AI & Machine Learning",
    description: "Developing intelligent solutions with Python, TensorFlow, and machine learning algorithms.",
    technologies: ["Python", "TensorFlow", "Scikit-learn", "OpenCV"]
  },
  {
    icon: SiFigma,
    title: "UI/UX Design",
    description: "Designing beautiful and intuitive user experiences with modern design tools and principles.",
    technologies: ["Figma", "Adobe XD", "Prototyping", "User Research"]
  },
  {
    icon: SiDocker,
    title: "DevOps & Deployment",
    description: "Streamlining development workflows with containerization, CI/CD, and cloud deployment.",
    technologies: ["Docker", "CI/CD", "AWS", "Vercel"]
  },
  {
    icon: SiMongodb,
    title: "Database Design",
    description: "Architecting efficient database solutions for both SQL and NoSQL requirements.",
    technologies: ["MongoDB", "PostgreSQL", "Redis", "Prisma"]
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
      className="py-16 px-4 md:px-6 bg-black"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2 
          className="text-3xl md:text-4xl font-semibold mb-4 text-center"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            My Services
          </span>
        </motion.h2>
        <motion.p 
          className="text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto text-center font-normal"
          variants={itemVariants}
        >
          Here are the areas I specialize in. I love solving problems and delivering impactful solutions.
        </motion.p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-4 md:p-6 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 md:gap-4 mb-4">
                  <div className="p-2 md:p-3 bg-green-500/10 rounded-lg">
                    <IconComponent className="text-xl md:text-2xl text-green-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-white">
                    <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                      {service.title}
                    </span>
                  </h3>
                </div>
                <p className="text-gray-300 mb-4 text-sm md:text-base font-normal">{service.description}</p>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {service.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-2 py-1 md:px-3 md:py-1 bg-gray-700/50 text-gray-300 text-xs md:text-sm rounded-full font-normal"
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