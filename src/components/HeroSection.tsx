import React from 'react';
import { Zap, Star, Users, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative flex flex-col items-center justify-center overflow-hidden bg-black pt-3 pb-9 md:pt-5 md:pb-14 lg:pt-1 lg:pb-18">
      {/* Background with subtle star-like dots */}
      <div className="absolute inset-0">
        {/* Animated stars/dots effect */}
        <div className="absolute inset-0">
          <div className="stars-small"></div>
          <div className="stars-medium"></div>
          <div className="stars-large"></div>
        </div>

        {/* Floating orbs with subtle glow */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-background rounded-full blur-sm animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-background rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-20 w-3 h-3 bg-background rounded-full blur-sm animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-24 w-2 h-2 bg-background rounded-full blur-sm animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div >

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-screen-lg mx-auto">
        <div className="animate-fade-in space-y-3">
          <div className="mb-1">
            <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-1.5 mb-3 hover:border-white/20 transition-all duration-500">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22BBE0] animate-ping"></span>
              <p className="text-xs sm:text-sm font-medium text-white tracking-wide">Registration Open</p>
            </div>

            {/* Organizers Section */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 max-w-fit mx-auto transition-colors">
              <h2 className="text-xs sm:text-sm font-bold text-white tracking-wider drop-shadow-md">
                IET Hyderabad Local Network
              </h2>
            </div>

            {/* Main Title */}
            <h1 className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[4.5rem] font-black mb-1 leading-none tracking-tight">
              <span className="text-white drop-shadow-2xl">Future Technology</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A046B4] via-[#7B5CC6] to-[#22BBE0] drop-shadow-xl inline-block mt-1">
                Conclave 2026
              </span>
            </h1>

            {/* Glowing Divider */}
            <div className="flex items-center justify-center gap-4 my-4 sm:my-6 opacity-80">
              <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#A046B4]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#A046B4] shadow-[0_0_12px_#A046B4]"></div>
              <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#A046B4]"></div>
            </div>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-[22px] font-medium text-white/90 tracking-wide mb-5 max-w-3xl mx-auto drop-shadow-md">
              Innovating for a Sustainable, Intelligent Future
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-6 py-2.5 bg-background text-foreground rounded-lg font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-all duration-500">
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
                Register Now
              </span>
              <div className="absolute inset-0 rounded-lg bg-background opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            </button>
            <button className="group px-6 py-2.5 bg-black/40 backdrop-blur-xl border border-[#B100FF]/20 text-white rounded-lg font-semibold text-sm hover:border-[#B100FF]/40 hover:shadow-[0_0_30px_rgba(110,0,255,0.2)] transition-all duration-500">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 group-hover:scale-110 transition-transform duration-500" />
                View Events
              </span>
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-3 md:mt-5 hidden md:flex">
            <ChevronDown className="w-5 h-5 text-white animate-bounce opacity-75 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.7; }
          }
          
          .stars-small, .stars-medium, .stars-large {
            position: absolute;
            inset: 0;
            background-image: radial-gradient(2px 2px at var(--star-x, 50%) var(--star-y, 50%), rgba(255, 255, 255, 0.3), transparent);
            background-size: 200px 200px;
            animation: twinkle 4s infinite;
          }
          
          .stars-medium {
            background-image: radial-gradient(3px 3px at var(--star-x, 30%) var(--star-y, 70%), rgba(255, 255, 255, 0.3), transparent);
            background-size: 300px 300px;
            animation-delay: 2s;
          }
          
          .stars-large {
            background-image: radial-gradient(4px 4px at var(--star-x, 70%) var(--star-y, 30%), rgba(255, 255, 255, 0.3), transparent);
            background-size: 400px 400px;
            animation-delay: 3s;
          }
        `}
      </style>
    </section >
  );
};

export default HeroSection;
