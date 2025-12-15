"use client"
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion";
import { FaGithub, FaTelegram, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import { FiMail, FiPhone, FiMapPin, FiCheck } from "react-icons/fi"
import { useInView } from "react-intersection-observer";
import { Tooltip } from "react-tooltip";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isClient, setIsClient] = useState(false); // For hydration safety

  const [ref, inView] = useInView({
    triggerOnce: true,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Thank you for contacting me! Your message has been received and I will get back to you soon.' });
        // Reset form
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({ type: 'error', message: result.error || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render form on server to prevent hydration mismatches
  if (!isClient) {
    return (
      <motion.section 
        ref={ref}
        className="min-h-screen w-full bg-black flex items-center justify-center px-4 md:px-6 py-16"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto w-full">
          {/* Heading */}
          <motion.div 
            className="text-center mb-12 md:mb-16"
            variants={itemVariants}
          >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
             Let's Connect
          </span>
        </motion.h2>
            <motion.p 
              className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg font-normal"
              variants={itemVariants}
            >
              Have a project in mind or want to discuss potential opportunities? 
              Feel free to reach out — I'm always open to new ideas and collaborations.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info & Social Links */}
            <motion.div variants={itemVariants}>
              <div className="space-y-6 md:space-y-8">
                {/* Contact Info Cards */}
                <div className="space-y-4 md:space-y-6">
                  <motion.div 
                    className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl"
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-2 md:p-3 bg-amber-500/10 rounded-lg">
                      <FiMail className="text-amber-400 text-lg md:text-xl" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-base md:text-lg">
                        <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                          Email
                        </span>
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base font-normal">ishaanaggrawal101@gmail.com</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl"
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-2 md:p-3 bg-amber-500/10 rounded-lg">
                      <FiPhone className="text-amber-400 text-lg md:text-xl" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-base md:text-lg">
                        <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                          Phone
                        </span>
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base font-normal">+91 9258895224</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl"
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-2 md:p-3 bg-amber-500/10 rounded-lg">
                      <FiMapPin className="text-amber-400 text-lg md:text-xl" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-base md:text-lg">
                        <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                          Location
                        </span>
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base font-normal">Shamli, Uttar Pradesh, India</p>
                    </div>
                  </motion.div>
                </div>

                {/* Social Links */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-medium text-white mb-4">
                    <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                      Follow Me
                    </span>
                  </h3>
                  <div className="flex gap-3 md:gap-4 flex-wrap">
                    {[
                      { icon: FaGithub, href: "https://github.com", label: "GitHub", tooltip: "Check out my code" },
                      { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn", tooltip: "Professional network" },
                      { icon: FaTwitter, href: "https://twitter.com", label: "Twitter", tooltip: "Follow me on Twitter" },
                      { icon: FaTelegram, href: "https://t.me", label: "Telegram", tooltip: "Message me on Telegram" },
                      { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", tooltip: "See my photos" }
                    ].map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 md:p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300 hover:text-green-400 hover:border-green-500/50 transition-all duration-300"
                          aria-label={social.label}
                        >
                          <Icon className="text-lg md:text-xl" />
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form Placeholder */}
            <motion.div variants={itemVariants}>
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-medium text-white mb-6">
                  <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                    Send me a message
                  </span>
                </h3>
                <div className="flex items-center justify-center py-8">
                  <div className="text-gray-400">Loading contact form...</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      ref={ref}
      className="min-h-screen w-full bg-black flex items-center justify-center px-4 md:px-6 py-16"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500 mb-4"
            variants={itemVariants}
          >
            Let's Connect
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg font-normal"
            variants={itemVariants}
          >
            Have a project in mind or want to discuss potential opportunities? 
            Feel free to reach out — I'm always open to new ideas and collaborations.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info & Social Links */}
          <motion.div variants={itemVariants}>
            <div className="space-y-6 md:space-y-8">
              {/* Contact Info Cards */}
              <div className="space-y-4 md:space-y-6">
                <motion.div 
                  className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:border-green-500/50 transition-all duration-300"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-2 md:p-3 bg-amber-500/10 rounded-lg">
                    <FiMail className="text-amber-400 text-lg md:text-xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-base md:text-lg">
                      <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                        Email
                      </span>
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base font-normal">ishaanaggrawal101@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:border-green-500/50 transition-all duration-300"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-2 md:p-3 bg-amber-500/10 rounded-lg">
                    <FiPhone className="text-amber-400 text-lg md:text-xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-base md:text-lg">
                      <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                        Phone
                      </span>
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base font-normal">+91 9258895224</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:border-green-500/50 transition-all duration-300"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-2 md:p-3 bg-amber-500/10 rounded-lg">
                    <FiMapPin className="text-amber-400 text-lg md:text-xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-base md:text-lg">
                      <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                        Location
                      </span>
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base font-normal">Shamli, Uttar Pradesh, India</p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-medium text-white mb-4">
                  <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                    Follow Me
                  </span>
                </h3>
                <div className="flex gap-3 md:gap-4 flex-wrap">
                  {[
                    { icon: FaGithub, href: "https://github.com", label: "GitHub", tooltip: "Check out my code" },
                    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn", tooltip: "Professional network" },
                    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter", tooltip: "Follow me on Twitter" },
                    { icon: FaTelegram, href: "https://t.me", label: "Telegram", tooltip: "Message me on Telegram" },
                    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", tooltip: "See my photos" }
                  ].map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 md:p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300 hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.label}
                        data-tooltip-id={`social-tooltip-${index}`}
                        data-tooltip-content={social.tooltip}
                      >
                        <Icon className="text-lg md:text-xl" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-medium text-white mb-6">
                <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                  Send me a message
                </span>
              </h3>
              
              {submitStatus && submitStatus.type === 'success' ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                    <FiCheck className="text-amber-400 text-2xl" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-2">Message Received!</h4>
                  <p className="text-gray-300 text-center">
                    {submitStatus.message}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2 text-sm md:text-base font-normal">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 md:p-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm md:text-base font-normal"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2 text-sm md:text-base font-normal">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 md:p-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm md:text-base font-normal"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2 text-sm md:text-base font-normal">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full p-3 md:p-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none text-sm md:text-base font-normal"
                      placeholder="Your message here..."
                      required
                    />
                  </div>

                  {/* Status message */}
                  {submitStatus && (
                    <div className={`p-3 rounded-lg text-sm ${
                      submitStatus.type === 'success' 
                        ? 'bg-amber-900/30 text-amber-400 border border-amber-800/50'
                        : 'bg-red-900/30 text-red-400 border border-red-800/50'
                    }`}>
                      {submitStatus.message}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 md:py-4 px-4 md:px-6 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-amber-500/20 disabled:opacity-70"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Tooltips */}
      {[0, 1, 2, 3, 4].map((index) => (
        <Tooltip key={index} id={`social-tooltip-${index}`} place="top" type="dark" effect="solid" />
      ))}
    </motion.section>
  )
}