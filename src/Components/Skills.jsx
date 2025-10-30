"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
// Importing all icons from react-icons/si
import * as SiIcons from "react-icons/si";

// Categorizing skills for better organization
const skillCategories = {
  "Frontend": {
    skills: ["React", "Next.js", "Vue.js", "Angular", "JavaScript", "TypeScript", "Tailwind CSS", "SASS", "Bootstrap", "Framer Motion"],
    color: "from-white to-gray-400"
  },
  "Backend": {
    skills: ["Node.js", "Express", "NestJS", "Python", "GraphQL", "Firebase"],
    color: "from-white to-gray-400"
  },
  "Database": {
    skills: ["MongoDB", "PostgreSQL", "Redis"],
    color: "from-white to-gray-400"
  },
  "DevOps": {
    skills: ["Docker", "AWS", "Git", "Jest", "Cypress"],
    color: "from-white to-gray-400"
  }
};

// Mapping skills to their respective icons and descriptions
const skillData = {
  "React": { icon: "SiReact", description: "Building user interfaces with React components", color: "#61DAFB" },
  "Next.js": { icon: "SiNextdotjs", description: "React framework for production applications", color: "#000000" },
  "JavaScript": { icon: "SiJavascript", description: "Core programming language of the web", color: "#F7DF1E" },
  "TypeScript": { icon: "SiTypescript", description: "Typed superset of JavaScript", color: "#3178C6" },
  "Node.js": { icon: "SiNodedotjs", description: "Server-side JavaScript runtime", color: "#339933" },
  "Python": { icon: "SiPython", description: "Versatile programming language", color: "#3776AB" },
  "Tailwind CSS": { icon: "SiTailwindcss", description: "Utility-first CSS framework", color: "#06B6D4" },
  "Framer Motion": { icon: "SiFramer", description: "Production-ready motion library", color: "#0055FF" },
  "MongoDB": { icon: "SiMongodb", description: "Document-oriented NoSQL database", color: "#47A248" },
  "PostgreSQL": { icon: "SiPostgresql", description: "Advanced open-source relational database", color: "#4169E1" },
  "Docker": { icon: "SiDocker", description: "Containerization platform", color: "#2496ED" },
  "Git": { icon: "SiGit", description: "Distributed version control system", color: "#F05032" },
  "GraphQL": { icon: "SiGraphql", description: "Query language for APIs", color: "#E10098" },
  "Redux": { icon: "SiRedux", description: "State management for JavaScript apps", color: "#764ABC" },
  "SASS": { icon: "SiSass", description: "CSS extension language", color: "#CC6699" },
  "Bootstrap": { icon: "SiBootstrap", description: "Front-end component library", color: "#7952B3" },
  "Express": { icon: "SiExpress", description: "Minimal web framework for Node.js", color: "#000000" },
  "Redis": { icon: "SiRedis", description: "In-memory data structure store", color: "#DC382D" },
  "Vue.js": { icon: "SiVuedotjs", description: "Progressive JavaScript framework", color: "#4FC08D" },
  "Angular": { icon: "SiAngular", description: "Platform for building web applications", color: "#DD0031" },
  "AWS": { icon: "SiAmazonwebservices", description: "Cloud computing services platform", color: "#FF9900" },
  "NestJS": { icon: "SiNestjs", description: "Progressive Node.js framework", color: "#E0234E" },
  "Firebase": { icon: "SiFirebase", description: "Backend-as-a-Service platform", color: "#FFCA28" },
  "Jest": { icon: "SiJest", description: "Delightful JavaScript testing framework", color: "#C21325" },
  "Cypress": { icon: "SiCypress", description: "End-to-end testing framework", color: "#17202C" }
};

const SkillCard = ({ skill, index, isHovered, setIsHovered }) => {
  // Add safety check for skill data
  const skillInfo = skillData[skill];
  
  // If skill data doesn't exist, render a fallback
  if (!skillInfo) {
    return (
      <div className="px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white font-medium shadow-lg transition-all duration-300 flex flex-col items-center gap-2 relative cursor-pointer hover:border-white/30 min-w-[140px] md:min-w-[160px]">
        <span className="text-base md:text-lg font-medium text-center">{skill}</span>
      </div>
    );
  }
  
  const { icon, description, color } = skillInfo;
  const IconComponent = SiIcons[icon];

  // Determine icon color - make dark icons white for better visibility
  // Also brighten AWS orange color for better contrast on dark background
  let iconColor = color;
  if (color === "#000000") {
    iconColor = "#FFFFFF"; // Make black icons white
  } else if (color === "#FF9900") {
    iconColor = "#FFB347"; // Brighten AWS orange color
  }

  // Spring animation for hover effect
  const springProps = useSpring({
    scale: isHovered === `${skill}-${index}` ? 1.15 : 1,
    y: isHovered === `${skill}-${index}` ? -15 : 0,
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.div
      style={springProps}
      className="px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white font-medium shadow-lg transition-all duration-300 flex flex-col items-center gap-2 relative cursor-pointer hover:border-white/30 min-w-[140px] md:min-w-[160px]"
      onMouseEnter={() => setIsHovered(`${skill}-${index}`)}
      onMouseLeave={() => setIsHovered(null)}
    >
      {IconComponent ? (
        <IconComponent className="text-2xl md:text-3xl" style={{ color: iconColor }} />
      ) : (
        // Fallback icon if the specific icon component doesn't exist
        <div className="text-2xl md:text-3xl font-bold" style={{ color: iconColor }}>
          {skill.charAt(0)}
        </div>
      )}
      <span className="text-base md:text-lg font-medium text-center">{skill}</span>
      
      {/* Permanent description display - always visible below the skill name */}
      {description && (
        <p className="text-xs text-gray-400 text-center mt-1 overflow-hidden" style={{ 
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {description}
        </p>
      )}
      
      {/* Tooltip - visible on hover for all screen sizes */}
      {isHovered === `${skill}-${index}` && description && (
        <motion.div 
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gray-800 text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap border border-gray-700 shadow-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          style={{ 
            zIndex: 50,
            marginBottom: '10px',
            pointerEvents: 'none'
          }}
        >
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-3 h-3 bg-gray-800 border-r border-b border-gray-700 rotate-45"></div>
          {description}
        </motion.div>
      )}
    </animated.div>
  );
};

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isClient, setIsClient] = useState(false); // For hydration safety
  const carouselRef = useRef(null);
  
  // Intersection observer for scroll animation
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Set isClient to true after mount to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // Get skills based on active category
  const getSkills = () => {
    if (activeCategory === "All") {
      return Object.keys(skillData);
    }
    return skillCategories[activeCategory]?.skills || [];
  };

  const skills = getSkills();

  // Create duplicated skills for infinite scrolling effect (using slice to make it deterministic)
  const duplicatedSkills = [...skills.slice(), ...skills.slice(), ...skills.slice()];

  // Don't render carousel on server to prevent hydration mismatches
  if (!isClient) {
    return (
      <motion.section 
        ref={ref}
        id="skills"
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
              Technical Skills
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 text-center mb-8 md:mb-12 max-w-2xl mx-auto font-normal"
            variants={itemVariants}
          >
            Here are the technologies and tools I work with to build amazing digital experiences
          </motion.p>
          
          {/* Category Filters */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12"
            variants={itemVariants}
          >
            <button
              className={`px-3 py-2 md:px-4 md:py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === "All"
                  ? "bg-gradient-to-r from-white to-gray-400 text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveCategory("All")}
            >
              All Skills
            </button>
            
            {Object.keys(skillCategories).map((category) => (
              <button
                key={category}
                className={`px-3 py-2 md:px-4 md:py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? `bg-gradient-to-r ${skillCategories[category].color} text-black`
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </motion.div>
          
          {/* Loading placeholder */}
          <div className="flex justify-center py-10">
            <div className="text-gray-400">Loading skills...</div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      ref={ref}
      id="skills"
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
            Technical Skills
          </span>
        </motion.h2>
        
        <motion.p 
          className="text-gray-400 text-center mb-8 md:mb-12 max-w-2xl mx-auto font-normal"
          variants={itemVariants}
        >
          Here are the technologies and tools I work with to build amazing digital experiences
        </motion.p>
        
        {/* Category Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12"
          variants={itemVariants}
        >
          <button
            className={`px-3 py-2 md:px-4 md:py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === "All"
                ? "bg-gradient-to-r from-white to-gray-400 text-black"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActiveCategory("All")}
          >
            All Skills
          </button>
          
          {Object.keys(skillCategories).map((category) => (
            <button
              key={category}
              className={`px-3 py-2 md:px-4 md:py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? `bg-gradient-to-r ${skillCategories[category].color} text-black`
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>
        
        {/* Infinite Moving Carousel */}
        <div 
          className="overflow-hidden py-10 md:py-22"
          onMouseEnter={() => {
            if (carouselRef.current) {
              carouselRef.current.style.animationPlayState = 'paused';
            }
          }}
          onMouseLeave={() => {
            if (carouselRef.current) {
              carouselRef.current.style.animationPlayState = 'running';
            }
          }}
        >
          <div 
            ref={carouselRef}
            className="flex animate-marquee whitespace-nowrap"
            style={{ width: 'fit-content' }}
          >
            {duplicatedSkills.map((skill, index) => (
              <div key={`${skill}-${index}`} className="mx-2 md:mx-3">
                <SkillCard 
                  skill={skill} 
                  index={index} 
                  isHovered={hoveredSkill}
                  setIsHovered={setHoveredSkill}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;