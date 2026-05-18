import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    // Total duration is 3 seconds, then unmount the preloader
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#050505] overflow-hidden"
        >
          {/* Elegant Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating orbs */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.3, 0.15],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#A046B4]/15 rounded-full blur-[80px]"
            />
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.25, 0.1],
                x: [0, -40, 0],
                y: [0, 50, 0]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#53274E]/20 rounded-full blur-[80px]"
            />
            {/* Center glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.05, 0.15, 0.05]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#A046B4]/10 rounded-full blur-[100px]"
            />
          </div>

          {/* Logo Container - Increased gap between logos */}
          <div className="relative flex items-center justify-center w-full max-w-3xl h-48">
            {/* IET Logo - Moves Left or Top */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, x: 0, y: 0 }}
              animate={{ opacity: 1, scale: 1, x: isMobile ? 0 : -160, y: isMobile ? -80 : 0 }}
              transition={{
                opacity: { duration: 0.5, ease: "easeOut" },
                scale: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
                x: { delay: 1.2, duration: 1.1, ease: [0.25, 0.9, 0.4, 1] },
                y: { delay: 1.2, duration: 1.1, ease: [0.25, 0.9, 0.4, 1] }
              }}
              className="absolute z-10 flex flex-col items-center gap-2"
            >
              <div className="relative">
                {/* Subtle glow behind IET logo */}
                <motion.div
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-[#A046B4]/20 rounded-full blur-[30px] -z-10"
                />
                <img
                  src="/iet_new_logo_purple.png"
                  alt="IET Logo"
                  className="h-16 md:h-20 object-contain"
                />
              </div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-light"
              >
                IET
              </motion.span>
            </motion.div>

            {/* NIT Warangal Logo - Moves Right or Bottom */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, x: 0, y: 0 }}
              animate={{ opacity: 1, scale: 1, x: isMobile ? 0 : 160, y: isMobile ? 80 : 0 }}
              transition={{
                opacity: { delay: 1.3, duration: 0.4 },
                x: { delay: 1.2, duration: 1.1, ease: [0.25, 0.9, 0.4, 1] },
                y: { delay: 1.2, duration: 1.1, ease: [0.25, 0.9, 0.4, 1] },
                scale: { delay: 1.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
              }}
              className="absolute z-0 flex flex-col items-center gap-2"
            >
              <div className="relative">
                {/* Glow behind NIT logo */}
                <motion.div
                  animate={{ opacity: [0.15, 0.35, 0.15] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute inset-0 bg-[#A046B4]/25 rounded-full blur-[35px] -z-10"
                />
                <img
                  src="/nit2.jpg"
                  alt="NIT Warangal Logo"
                  className="h-16 md:h-20 object-contain rounded-lg"
                />
              </div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-light"
              >
                NIT Warangal
              </motion.span>
            </motion.div>
          </div>

          {/* Elegant Coming Soon / Tagline Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.6 }}
            className="absolute bottom-20 left-0 right-0 text-center"
          >
            <p className="text-white/40 text-sm tracking-[0.3em] uppercase font-light">
              Future Tech Conclave
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-1 h-1 bg-[#A046B4]/60 rounded-full"
              />
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                className="w-1 h-1 bg-[#A046B4]/60 rounded-full"
              />
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;