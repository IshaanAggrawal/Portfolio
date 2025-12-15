"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import * as SiIcons from "react-icons/si";
// Using BiIcons for placeholders for new/abstract concepts like RAG
import * as BiIcons from "react-icons/bi";

// --- 1. ENHANCED SKILL DATA MAP (Based on Resume) ---
// Note: Icon names must exactly match keys in SiIcons or BiIcons
const skillData = {
    // GenAI / LLMs / ML (Key Resume Focus) [cite: 17, 57, 69]
    "RAG Architecture": { icon: "BiBrain", description: "Long-Context Grounding & LLM Evaluation", color: "#26f218" },
    "LangChain": { icon: "BiLogoCodepen", description: "Framework for developing LLM applications", color: "#3776AB" },
    "Gemini API": { icon: "SiGoogle", description: "Integrating Google's multimodal models", color: "#4285F4" },
    "pgvector": { icon: "SiPostgresql", description: "Vector DB for semantic search", color: "#4169E1" },
    "XGBoost": { icon: "SiPython", description: "Classification & Regression Modeling", color: "#0088CC" },
    "Scikit-learn": { icon: "SiScikitlearn", description: "ML modeling and analysis library", color: "#F7931E" },

    // Full Stack Development [cite: 18, 19, 70]
    "Next.js": { icon: "SiNextdotjs", description: "Production-ready Full Stack framework", color: "#FFFFFF" },
    "React.js": { icon: "SiReact", description: "Building interactive user interfaces", color: "#61DAFB" },
    "TypeScript": { icon: "SiTypescript", description: "Typed superset of JavaScript", color: "#3178C6" },
    "FastAPI": { icon: "SiFastapi", description: "High-performance Python API backend", color: "#26f218" },
    "Flask": { icon: "SiFlask", description: "Robust RESTful API development", color: "#FFFFFF" },
    "Node.js": { icon: "SiNodedotjs", description: "Server-side JavaScript runtime", color: "#339933" },
    "Express.js": { icon: "SiExpress", description: "Minimal Node.js web framework", color: "#FFFFFF" },
    "Tailwind CSS": { icon: "SiTailwindcss", description: "Utility-first CSS framework", color: "#06B6D4" },
    "Framer Motion": { icon: "SiFramer", description: "Advanced web animations and motion", color: "#0055FF" },

    // Databases & Tools [cite: 20, 71]
    "PostgreSQL": { icon: "SiPostgresql", description: "Relational database, used with Supabase", color: "#4169E1" },
    "Supabase": { icon: "SiSupabase", description: "Open-source backend (PostgreSQL)", color: "#3ECF8E" },
    "MongoDB": { icon: "SiMongodb", description: "NoSQL document database (MERN)", color: "#47A248" },
    "Git": { icon: "SiGit", description: "Version control and collaboration", color: "#F05032" },
    "DSA": { icon: "SiCplusplus", description: "Data Structures & Algorithms mastery", color: "#00599C" }, 
};

// --- 2. REFINED SKILL CATEGORIES (Grouping by Resume Strengths) ---
const skillCategories = {
    "Gen AI / LLMs": {
        skills: ["RAG Architecture", "LangChain", "Gemini API", "pgvector", "XGBoost", "Scikit-learn"],
        color: "from-green-500/80 to-green-600/80" // Highlight key area
    },
    "Full Stack Development": {
        skills: ["Next.js", "React.js", "TypeScript", "FastAPI", "Flask", "Node.js", "Express.js", "Tailwind CSS"],
        color: "from-gray-700/80 to-gray-800/80"
    },
    "Databases & DevOps": {
        skills: ["PostgreSQL", "Supabase", "MongoDB", "Git", "DSA"],
        color: "from-gray-700/80 to-gray-800/80"
    }
};

// --- 3. HELPER FUNCTION TO GET ICON COMPONENT ---
const getIconComponent = (iconName) => {
    // Combine SiIcons and BiIcons for better coverage
    // Add fallback to ensure we always return a valid component
    const iconComponent = SiIcons[iconName] || BiIcons[iconName] || SiIcons["SiCode"];
    return iconComponent || (() => null); // Return null component if still undefined
};

// --- 4. ANIMATED SKILL CARD COMPONENT (Cleaned up for single, hover-only description) ---

const SkillCard = ({ skill, index, isHovered, setIsHovered }) => {
    const data = skillData[skill] || { icon: "SiCode", description: skill, color: "#FFFFFF" };
    const IconComponent = getIconComponent(data.icon);
    
    // Spring animation for hover effect
    const springProps = useSpring({
        scale: isHovered === `${skill}-${index}` ? 1.15 : 1,
        y: isHovered === `${skill}-${index}` ? -8 : 0, // Reduced lift
        // Use neon accent color for glow effect
        boxShadow: isHovered === `${skill}-${index}` ? `0 0 15px 3px #26f21870` : '0 0 5px 0px #00000000',
        config: { tension: 300, friction: 20 }
    });
    
    // Make black icons white for dark theme visibility
    const iconColor = data.color === "#000000" ? "#FFFFFF" : data.color;

    return (
        <animated.div
            style={springProps}
            className="px-4 py-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white font-medium shadow-lg transition-all duration-300 flex flex-col items-center gap-2 relative cursor-pointer min-w-[140px] md:min-w-[160px] h-32" // Added fixed height for uniformity
            onMouseEnter={() => setIsHovered(`${skill}-${index}`)}
            onMouseLeave={() => setIsHovered(null)}
        >
            {IconComponent && <IconComponent className="text-3xl md:text-4xl" style={{ color: iconColor }} />}
            <span className="text-base font-semibold text-center mt-2">{skill}</span>
            
            {/* Tooltip: Visible on hover to show the description clearly */}
            {isHovered === `${skill}-${index}` && data.description && (
                <motion.div 
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gray-900 text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap border border-green-500/50 shadow-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    style={{ zIndex: 50, pointerEvents: 'none' }}
                >
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-3 h-3 bg-gray-900 border-r border-b border-green-500/50 rotate-45"></div>
                    {data.description}
                </motion.div>
            )}
        </animated.div>
    );
};


// --- 5. MAIN SKILLS SECTION COMPONENT (Integrated Logic) ---

const Skills = () => {
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [activeCategory, setActiveCategory] = useState("Gen AI / LLMs"); // Default to your strongest category
    const [isClient, setIsClient] = useState(false); 
    const carouselRef = useRef(null);
    
    const [ref, inView] = useInView({
        triggerOnce: true, // Trigger animation only once when section is in view
        threshold: 0.1,
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05 // Faster stagger for the main container
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const getSkills = () => {
        // If 'All', flatten all skills from all categories
        if (activeCategory === "All") {
            return Object.values(skillCategories).flatMap(cat => cat.skills);
        }
        return skillCategories[activeCategory]?.skills || [];
    };

    const skills = getSkills();
    // Create duplicated skills only if the active category is "All" or a large list,
    // to maintain the filtering functionality without a broken scroll loop.
    const duplicatedSkills = activeCategory === "All" || skills.length > 10 ? [...skills, ...skills, ...skills] : skills;

    // Handle server-side rendering/hydration safety for carousel (removed the full CSR check for simplicity)
    if (!isClient) {
        // Render a static layout on the server
        return (
        <motion.h2 
          className="text-3xl md:text-4xl font-semibold mb-4 text-center"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            My Tech Stack
          </span>
        </motion.h2>
        );
    }

    // MAIN CLIENT-SIDE RENDER
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
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            My Tech Stack
          </span>
        </motion.h2>
                
                <motion.p 
                    className="text-gray-400 text-center mb-8 md:mb-12 max-w-2xl mx-auto font-normal text-lg"
                    variants={itemVariants}
                >
                    Full Stack Expertise meets Generative AI Architecture.
                </motion.p>
                
                {/* Category Filters (Styled with the neon green accent) */}
                <motion.div 
                    className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12"
                    variants={itemVariants}
                >
                    <button
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            activeCategory === "All"
                                ? "bg-green-500 text-black shadow-lg shadow-green-500/30"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                        onClick={() => setActiveCategory("All")}
                    >
                        All Skills
                    </button>
                    
                    {Object.keys(skillCategories).map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                activeCategory === category
                                    ? "bg-green-500 text-black shadow-lg shadow-green-500/30"
                                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>
                
                {/* SKILL DISPLAY GRID/CAROUSEL */}
                {/* Display as a responsive grid when a category is selected */}
                {activeCategory !== "All" ? (
                    <motion.div 
                        key={activeCategory} // Key change forces animation when category switches
                        className="flex flex-wrap justify-center gap-4 mt-8"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {skills.map((skill, index) => (
                            <motion.div 
                                key={skill}
                                className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
                                variants={itemVariants}
                            >
                                <SkillCard 
                                    skill={skill} 
                                    index={index} 
                                    isHovered={hoveredSkill}
                                    setIsHovered={setHoveredSkill}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    // Display as a marquee/carousel when 'All Skills' is selected
                    <div 
                        className="overflow-hidden py-10 md:py-22 border-t border-b border-gray-800/50"
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
                        {/* Note: Requires a corresponding Tailwind CSS animation definition for 'animate-marquee' */}
                        <div 
                            ref={carouselRef}
                            className="flex animate-marquee whitespace-nowrap"
                            style={{ width: 'fit-content' }}
                        >
                            {duplicatedSkills.map((skill, index) => (
                                <div key={`${skill}-${index}`} className="mx-2 md:mx-3 inline-block">
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
                )}
            </div>
        </motion.section>
    );
};

export default Skills;