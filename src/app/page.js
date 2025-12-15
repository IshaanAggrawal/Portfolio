"use client";

import Navbar from "@/Components/Navbar";
import HeroSection from "@/Components/HeroSection";
import GoldenLoader from "@/Components/loaders/GoldenLoader";
import SkeletonLoader from "@/Components/skeletons/SkeletonLoader";
import SkillsSkeleton from "@/Components/skeletons/SkillsSkeleton";
import ProjectsSkeleton from "@/Components/skeletons/ProjectsSkeleton";
import ServicesSkeleton from "@/Components/skeletons/ServicesSkeleton";
import ContactSkeleton from "@/Components/skeletons/ContactSkeleton";
import AboutSkeleton from "@/Components/skeletons/AboutSkeleton";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load components to prevent initial loading lag
const AboutMe = dynamic(() => import("@/Components/about"), { ssr: false });
const Contact = dynamic(() => import("@/Components/Contact"), { ssr: false });
const Projects = dynamic(() => import("@/Components/Project"), { ssr: false });
const Services = dynamic(() => import("@/Components/Services"), { ssr: false });
const Skills = dynamic(() => import("@/Components/Skills"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  if (loading) {
    return <GoldenLoader />;
  }

  return (
    <>
      <Navbar />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Suspense fallback={<AboutSkeleton />}>
          <AboutMe />
        </Suspense>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Suspense fallback={<SkillsSkeleton />}>
          <Skills />
        </Suspense>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Suspense fallback={<ServicesSkeleton />}>
          <Services />
        </Suspense>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Suspense fallback={<ProjectsSkeleton />}>
          <Projects />
        </Suspense>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Suspense fallback={<ContactSkeleton />}>
          <Contact />
        </Suspense>
      </motion.div>
    </>
  );
}
