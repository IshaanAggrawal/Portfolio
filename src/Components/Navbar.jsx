"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import useScrollPosition from "@/lib/hooks/useScrollPosition";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const scrollPosition = useScrollPosition();
  const navbarRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Calculate navbar width based on scroll position and hover state
  const getNavbarClasses = () => {
    const scrollThreshold = 100;
    
    // Base classes for glassy effect
    let classes = "flex items-center justify-between px-6 py-4 font-sans fixed z-50 backdrop-blur-md bg-black/20 border-b border-white/10 rounded-2xl mx-auto transition-all duration-300 ";
    
    // Width classes based on scroll position and hover state
    if (scrollPosition < scrollThreshold) {
      // Full width at top
      if (isHovered) {
        classes += "w-full md:w-[98%] lg:w-[95%] ";
      } else {
        classes += "w-full md:w-[95%] lg:w-[90%] ";
      }
    } else {
      // Collapsed width when scrolled
      if (isHovered) {
        classes += "w-[95%] md:w-[90%] lg:w-[85%] ";
      } else {
        classes += "w-[90%] md:w-[85%] lg:w-[80%] ";
      }
    }
    
    return classes;
  };

  const menuItems = ["About", "Services", "Projects", "Contact"];

  return (
    <nav 
      ref={navbarRef}
      className={getNavbarClasses()}
      style={{ 
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo with gradient */}
      <h1 className="text-2xl md:text-3xl font-bold font-mono tracking-wide bg-gradient-to-r from-green-500 to-green-400 text-transparent bg-clip-text">
        PortFolio
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8 lg:gap-12 list-none text-lg font-medium ml-auto">
        {menuItems.map((item) => (
          <li
            key={item}
            className="relative cursor-pointer group text-gray-300 hover:text-green-400 transition duration-300"
          >
            {item}
            {/* Hover underline gradient */}
            <span
              className="absolute left-0 -bottom-1 w-0 h-[3px] 
              bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 
              transition-all duration-300 group-hover:w-full rounded-full"
            ></span>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-gray-300 focus:outline-none z-50"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Menu Panel from Right - Card Style */}
      <div 
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-gray-800/90 backdrop-blur-xl z-40 transform transition-transform duration-300 ease-in-out md:hidden rounded-l-2xl shadow-2xl ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <h2 className="text-xl font-medium text-white">Menu</h2>
          </div>
          
          {/* Mobile Menu Items */}
          <div className="flex flex-col py-8 px-6 flex-grow bg-gray-900">
            <ul className="space-y-6">
              {menuItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="block py-3 text-xl font-medium text-gray-200 hover:text-green-400 transition duration-300 border-b border-gray-700/30 hover:border-green-400/50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-6 border-t border-gray-700/50 bg-gray-900">
            <p className="text-gray-400 text-sm font-normal text-green-400">© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;