"use client";

import React, { useState, useRef } from 'react'
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useInView } from 'react-intersection-observer';
import { Tooltip } from 'react-tooltip';

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce solution with payment integration, user authentication, and admin dashboard.",
    image: "https://img.freepik.com/free-vector/online-shopping-concept-landing-page_52683-19947.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    liveDemo: "https://example.com",
    github: "https://github.com/example/ecommerce"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity application with real-time collaboration, task tracking, and team management features.",
    image: "https://img.freepik.com/free-vector/task-management-concept-illustration_114360-4291.jpg",
    technologies: ["Next.js", "Firebase", "Tailwind CSS", "Framer Motion"],
    liveDemo: "https://example.com",
    github: "https://github.com/example/taskmanager"
  },
  {
    id: 3,
    title: "AI Image Generator",
    description: "An application that generates unique images from text prompts using machine learning models.",
    image: "https://img.freepik.com/free-vector/gradient-ai-illustration_52683-96794.jpg",
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    liveDemo: "https://example.com",
    github: "https://github.com/example/aigenerator"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A modern personal portfolio with animations, dark mode, and responsive design.",
    image: "https://img.freepik.com/free-vector/app-development-illustration_52683-47931.jpg",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    liveDemo: "https://example.com",
    github: "https://github.com/example/portfolio"
  },
  {
    id: 5,
    title: "Fitness Tracker",
    description: "A health and fitness application with workout plans, progress tracking, and nutrition logging.",
    image: "https://img.freepik.com/free-vector/fitness-tracker-concept-illustration_114360-3492.jpg",
    technologies: ["React Native", "Node.js", "MongoDB"],
    liveDemo: "https://example.com",
    github: "https://github.com/example/fitnesstracker"
  },
  {
    id: 6,
    title: "Chat Application",
    description: "A real-time messaging platform with group chats, file sharing, and end-to-end encryption.",
    image: "https://img.freepik.com/free-vector/chatbot-concept-illustration_114360-4099.jpg",
    technologies: ["Socket.io", "React", "Node.js", "Express"],
    liveDemo: "https://example.com",
    github: "https://github.com/example/chatapp"
  }
];

function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const swiperRef = useRef(null);

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

  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <motion.section 
      id="projects" 
      ref={ref}
      className="py-16 px-4 md:px-6 bg-black"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
             My Projects
          </span>
        </motion.h2>
        <motion.p 
          className="text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto text-center font-normal"
          variants={itemVariants}
        >
          A few highlights of what I've built recently — blending creativity with code.
        </motion.p>

        {/* Swiper Carousel */}
        <motion.div 
          variants={itemVariants}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="px-4 md:px-0"
        >
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="py-8 md:py-10"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id} className="h-auto pb-10">
                <motion.div 
                  className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 h-full flex flex-col"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Project Image */}
                  <div className="h-40 md:h-48 overflow-hidden flex items-center justify-center">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-4 md:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-medium text-white mb-2">
                      <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                        {project.title}
                      </span>
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm font-normal flex-grow">{project.description}</p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded font-normal"
                          data-tooltip-id={`tech-tooltip-${project.id}`}
                          data-tooltip-content={tech}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Links */}
                    <div className="flex gap-2 md:gap-4 mt-auto">
                      <a 
                        href={project.liveDemo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 md:gap-2 px-3 py-2 text-xs md:px-4 md:py-2 md:text-sm bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all"
                        data-tooltip-id={`demo-tooltip-${project.id}`}
                        data-tooltip-content="View live demo"
                      >
                        <FaExternalLinkAlt size={12} className="md:w-4 md:h-4" /> 
                        <span className="hidden md:inline">Live Demo</span>
                        <span className="md:hidden">Demo</span>
                      </a>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 md:gap-2 px-3 py-2 text-xs md:px-4 md:py-2 md:text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
                        data-tooltip-id={`github-tooltip-${project.id}`}
                        data-tooltip-content="View source code"
                      >
                        <FaGithub size={12} className="md:w-4 md:h-4" /> 
                        <span className="hidden md:inline">GitHub</span>
                        <span className="md:hidden">Code</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
      
      {/* Tooltips */}
      {projects.map((project) => (
        <React.Fragment key={project.id}>
          <Tooltip id={`demo-tooltip-${project.id}`} place="top" type="dark" effect="solid" />
          <Tooltip id={`github-tooltip-${project.id}`} place="top" type="dark" effect="solid" />
          {project.technologies.map((tech, index) => (
            <Tooltip key={index} id={`tech-tooltip-${project.id}`} place="top" type="dark" effect="solid" />
          ))}
        </React.Fragment>
      ))}
    </motion.section>
  )
}

export default Projects